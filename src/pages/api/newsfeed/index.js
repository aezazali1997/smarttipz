import { isEmpty } from 'lodash';
import PostLikee from 'models/Like';
import User from 'models/User';
import sequelize from 'sequelize';
import { getPagination, getPagingData } from 'utils/consts';
const Share = require('models/Share');
const Video = require('models/Video');
const AllPosts = require('models/AllPost');
const Comments = require('models/Comments');
const Rating = require('models/Rating');
const jwt = require('jsonwebtoken');
const db = require('models/db');

const handler = async (req, res) => {
	if (req.method === 'GET') {
		const {
			headers: { authorization }, query: { page }
		} = req;

		console.log('page: ', page);

		try {
			const ArrayOfFollowedPeopleId = [];

			if (!authorization) {
				return res.status(401).send({ error: true, data: [], message: 'Please Login' });
			}
			const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

			const { id: userId } = await User.findOne({
				attributes: ['id'],
				where: { username, isDeleted: false, isBlocked: false }
			});

			const { limit, offset } = getPagination(page, 5);

			ArrayOfFollowedPeopleId.push(userId);

			const followers = await db.query(
				`select "followingId" as "followers" from "following" f where "followedId"=${userId}`
			);

			followers && followers[0].map(({ followers }) => ArrayOfFollowedPeopleId.push(followers));

			const videosCount = await AllPosts.count({
				// where: { VideoId: 1},
				include: [
					{
						model: Video,
						include: [
							{
								model: User,
							}
						]
					},
					{
						model: Share,
						include: [
							{
								model: User,
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
			})
			const catalogCount = await Video.count({
				include: [
					{
						model: User,
					},
				],
				where: {
					[sequelize.Op.and]: [
						{
							'$User.isDeleted$': {
								[sequelize.Op.eq]: false
							}
						},
						{
							'$User.id$': {
								[sequelize.Op.eq]: userId
							}
						},
						{
							'$catalogue$': {
								[sequelize.Op.eq]: true
							}
						},

						{
							'$User.isBlocked$': {
								[sequelize.Op.eq]: false
							}
						}
					]
				},
			})

			const videos = await AllPosts.findAll({
				include: [
					{
						model: Video,
						include: [
							{
								model: User,
								attributes: ['name', 'username', 'picture', 'tip']
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
				limit: limit,
				offset: offset,
				group: [
					'AllPost.id',
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
					'Share->User.showUsername',
				],

				order: [['createdAt', 'DESC']],
			});


			for (let i = 0; i < videos.length; i++) {
				const item = JSON.parse(JSON.stringify(videos[i]));
				const { id, VideoId, Video, Share: Shares, isShared } = item;
				const likeCount = await PostLikee.count({
					where: {
						AllPostId: id
					}
				});
				const isLiked = await PostLikee.find({
					where: {
						AllPostId: id,
						reviewerId: userId
					}
				});
				const commentCount = await Comments.count({
					where: {
						AllPostId: id,
					}
				});
				const shareCount = await Share.count({
					where: {
						VideoId
					}
				});

				const ratings = await db.query(`select avg(r."rating") as "avgRating", count(r."AllPostId") as "totalRaters" from "AllPosts" p
						left join "Ratings" as r on p.id=r."AllPostId"
						where (p.id=${id} and r."AllPostId"=${id})
						group by p.id`)



				const avgRating = isEmpty(ratings[0]) ? 0 : ratings[0][0].avgRating;
				const totalRaters = isEmpty(ratings[0]) ? 0 : ratings[0][0].totalRaters;

				videos[i] = {
					id, avgRating: avgRating, totalRaters, VideoId,
					isShared, Video, Share: Shares, likeCount,
					shareCount, commentCount, isLiked: isLiked ? true : false
				}
			};

			const response = getPagingData(videos, page, limit, videosCount);

			res.status(200).send({
				error: false,
				message: 'success',
				data: { videos, ...response, catalogCount }
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
