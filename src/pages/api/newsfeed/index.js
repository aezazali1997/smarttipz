import PostLikee from 'models/Like';
import User from 'models/User';
import sequelize from 'sequelize';
import { getPagination, getPagingData } from 'utils/consts';
const Share = require('models/Share');
const Video = require('models/Video');
const AllPosts = require('models/AllPost');
const jwt = require('jsonwebtoken');
const db = require('models/db');

const handler = async (req, res) => {
	if (req.method === 'GET') {
		const {
			headers: { authorization }, query: { page }
		} = req;
		try {
			const ArrayOfFollowedPeopleId = [];

			if (!authorization) {
				return res.status(401).send({ error: true, data: [], message: 'Please Login' });
			}
			const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

			const { id } = await User.findOne({
				attributes: ['id'],
				where: { username, isDeleted: false, isBlocked: false }
			});
			const { limit, offset } = getPagination(page, 5);

			ArrayOfFollowedPeopleId.push(id);

			const followers = await db.query(
				`select "followingId" as "followers" from "following" f where "followedId"=${id}`
			);

			followers && followers[0].map(({ followers }) => ArrayOfFollowedPeopleId.push(followers));

			console.log('ArrayOfFollowedPeopleId', ArrayOfFollowedPeopleId);

			const videos = await AllPosts.findAll({
				attributes: {
					include: [
						[sequelize.fn('COUNT', sequelize.col('PostLikees.AllPostId')), 'likeCount']
						// [sequelize.fn('COUNT', sequelize.col('Share.id')), 'shareCount'],
						// [sequelize.where(sequelize.col('PostLikees.reviewerId'), id), 'isLiked']
					]
				},
				include: [
					{
						model: PostLikee,
						attributes: ['id']
					},
					{
						model: Video,
						include: [
							{
								model: User,
								attributes: ['name', 'username', 'picture']
							}
						]
					},
					{
						model: Share,
						attributes: ['id', 'caption'],
						include: [
							{
								model: User,
								attributes: ['id', 'username', 'picture', 'accountType', 'name', 'showName', 'showUsername']
							}
						]
					}
				],

				where: {
					[sequelize.Op.and]: [
						{
							'$Video->User.isDeleted$': {
								[sequelize.Op.eq]: false
							}
						},
						{
							[sequelize.Op.or]: [
								{
									'$Video.UserId$': {
										[sequelize.Op.in]: ArrayOfFollowedPeopleId
									}
								},
								{
									'$Share.UserId$': {
										[sequelize.Op.in]: ArrayOfFollowedPeopleId
									}
								},
							]
						},
						{
							'$Video->User.isBlocked$': {
								[sequelize.Op.eq]: false
							}
						}
					]
				},
				group: [
					'AllPost.id',
					'PostLikees.id',
					'Video.id',
					'Video->User.id',
					'Video->User.name',
					'Video->User.username',
					'Video->User.picture',
					'Share.id',
					'Share->User.id',
					'Share->User.username',
					'Share->User.picture',
					'Share->User.accountType',
					'Share->User.name',
					'Share->User.showName',
					'Share->User.showUsername'
				],

				order: [['createdAt', 'DESC']]
			});

			// const response = getPagingData(videos, page, limit);
			// console.log("response: ", response);

			res.status(200).json({
				error: false,
				message: 'success',
				data: { videos }
			});
		} catch (err) {
			console.log('Videos Api Failed Error: ', err.message);
			res.status(500).send({ error: true, data: [], message: err.message });
		}
	} else {
		res.status(404).end('Page Not Found');
	}
};

export default handler;
