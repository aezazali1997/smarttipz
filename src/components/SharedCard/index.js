/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import axiosInstance from 'src/APIs/axiosInstance';
import { CommentSection, PostDeletedAlert } from '..';
import CaptionSection from './captionSection';
import ContentSection from './contentSection';
import FooterSection from './footerSection';
import HeaderSection from './headerSection';

const SharedCard = ({
	id,
	videoId,
	index,
	Video,
	Share,
	width,
	isLiked,
	likeCount,
	shareCount,
	commentCount,
	HandleLikePost,
	_OpenShareModal,
	_HandleCommentCounts,
	restrictPaidVideo,
	TogglePaymentModal,
	_HandleGotoVideoDetails,
	_HandleGotoUserProfile,
}) => {
	const [showCommentSection, setShowCommentSection] = useState(false);
	const [message, setMessage] = useState('');
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [stopVideo, setStopVideo] = useState(false);

	const getAllCommentsByVideoId = async () => {
		try {
			setLoading(true);
			const {
				data: {
					data: { comments }
				}
			} = await axiosInstance.getAllCommentsByVideoId(id);
			setComments(comments);
			setLoading(false);
		} catch (e) {
			console.log('Get All comments by VideoId api failed: ', e);
		}
	};

	useEffect(() => {
		if (showCommentSection) {
			getAllCommentsByVideoId();
		}
	}, [showCommentSection]);

	const _HandleCommentSection = () => {
		setShowCommentSection(!showCommentSection);
	};

	const _HandleSubmitComment = async (text) => {
		console.log('enter', text);
		if (text !== '') {
			_HandleCommentCounts(id, '+')
			try {
				const res = await axiosInstance.postComment({ comment: text, videoId: id });
				getAllCommentsByVideoId();
			} catch (e) {
				console.log('Comment on Post API failed: ', e);
			}
		}
	};

	const _HandleDeleteComments = async (index, commentId) => {
		console.log('Comment id to be deleted: ', commentId);
		_HandleCommentCounts(id, '-')
		const deepCopyComments = [...comments];
		deepCopyComments.splice(index, 1);
		setComments(deepCopyComments);
		try {
			const { data: { message } } = await axiosInstance.deleteCommentById(commentId);
			console.log(message);
		} catch ({ response: { data: { message } } }) { console.log(message); }
	}


	const _HandlePaidVideos = async () => {
		console.log('Here: ', Video?.watchLimit);
		setTimeout(() => {
			setStopVideo(true);
			TogglePaymentModal();
		}, Video?.watchLimit);
	}

	return (
		<div
			className={`mx-auto ${width} shadow flex flex-col justify-center rounded-lg overflow-hidden
                bg-white space-y-2`}>
			<div className="flex flex-col">
				<HeaderSection Share={Share} _HandleGotoUserProfile={_HandleGotoUserProfile} />
				<CaptionSection Share={Share} />
			</div>
			<div className="px-3">
				{
					Video && Video?.isApproved ?
						<ContentSection
							SharedPost={Video}
							stopVideo={stopVideo}
							restrict={restrictPaidVideo}
							shareCount={shareCount}
							TogglePaymentModal={TogglePaymentModal}
							_HandlePaidVideos={_HandlePaidVideos}
							_HandleGotoUserProfile={_HandleGotoUserProfile}
							_HandleGotoVideoDetails={_HandleGotoVideoDetails}
						/> :
						<div className='mb-2'>
							<PostDeletedAlert />
						</div>
				}
			</div>
			{
				Video && Video?.isApproved &&
				<FooterSection
					id={id}
					index={index}
					Video={Video}
					isLiked={isLiked}
					videoId={videoId}
					likeCount={likeCount}
					commentCount={commentCount}
					HandleLikePost={HandleLikePost}
					_OpenShareModal={_OpenShareModal}
					_HandleCommentSection={_HandleCommentSection}
				/>
			}
			{showCommentSection && (
				<CommentSection
					comments={comments}
					message={message}
					loading={loading}
					setMessage={setMessage}
					_HandleSubmitComment={_HandleSubmitComment}
					_HandleDeleteComments={_HandleDeleteComments}
					_HandleGotoUserProfile={_HandleGotoUserProfile}
				/>
			)}
		</div>
	);
};

export default SharedCard;
