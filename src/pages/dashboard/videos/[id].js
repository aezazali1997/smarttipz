/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { faPaperPlane, faShareAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from 'src/APIs/axiosInstance';
import {
	Button, CommentCard, Rating, ReadLessReadMore, SuggestionCard, VideoPlayer
} from 'src/components';
import { PostActionDropdown } from 'src/components/Dropdown';
import { PaymentModal, ShareModal, TipModal, VideoRatingModal } from 'src/components/Modals';
import HandIcon from 'public/purple-hand.svg';
import Image from 'next/image';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';

const VideoDetailScreen = () => {
	const router = useRouter();
	const { id } = router.query;
	const [video, setVideo] = useState({});
	const [posts, setPosts] = useState([]);
	const [catalogueCount, setCatalogueCount] = useState(0);
	const [showRatingModal, setShowRatingModal] = useState(false);
	const [postRating, setSharePostRating] = useState(0);
	const [showTipModal, setShowTipModal] = useState(false);
	const [comments, setComments] = useState([]);
	const [shareData, setShareData] = useState({});
	const [isSharing, setIsSharing] = useState(false);
	const [shareCaption, setShareCaption] = useState('');
	const [showShareModal, setShowShareModal] = useState(false);
	const [commentMessage, setCommentMessage] = useState('');
	const [stopVideo, setStopVideo] = useState(false);
	const [showAmountModal, setShowAmountModal] = useState(false);
	const [videoPayment, setVideoPayment] = useState(0);

	const _GetVideoById = async () => {
		try {
			const {
				data: {
					data: { video }
				}
			} = await axiosInstance.getVideoById(id);
			setVideo(video);
		} catch (e) {
			console.log('api failed => ', e);
		}
	};

	let GetPosts = async () => {
		try {
			const {
				data: {
					data: { videos }
				}
			} = await axiosInstance.getAllSharedVideos();
			setPosts(videos);
			var count = 0;
			for (let i = 0; i < videos.length; i++) {
				if (
					videos[i].Video.catalogue === true &&
					videos[i].Video.UserId == parseInt(localStorage.getItem('id'))
				) {
					count = count + 1;
				}
			}
			setCatalogueCount(count);
		} catch ({
			response: {
				data: { message }
			}
		}) {
			console.log(message);
		}
	};

	const {
		id: postId = "",
		likeCount = 0,
		shareCount = 0,
		commentCount = 0,
		isLiked = false,
		Video: {
			id: videoId = "",
			description = '',
			title = '',
			url = '',
			UserId = '',
			thumbnail = '',
			catalogue = '',
			User = {},
			videoType = '',
			videoCost = '',
			productLink,
			watchLimit = '',
			cost = ''
		} = {}
	} = video;


	const getAllCommentsByVideoId = async () => {
		try {
			const { data: { data: { comments } } } = await axiosInstance.getAllCommentsByVideoId(id);
			setComments(comments);
		}
		catch (e) {
			console.log('Get All comments by VideoId api failed: ', e);
		}
	}

	useEffect(() => {
		_GetVideoById();
		GetPosts();
		getAllCommentsByVideoId();
	}, []);

	useEffect(() => { }, [video, posts])

	const _HandleCatalogue = async (videoId, catalogue) => {
		if (catalogueCount < 5 || catalogue === true) {
			try {
				const originalArray = [...posts];
				const updatedVideo = { ...video };

				updatedVideo.Video.catalogue = !catalogue;
				console.log('updatedVideo: ', updatedVideo)
				setVideo(updatedVideo);

				let newArray = originalArray.map((item, i) => {
					if (item.id !== videoId) return item;
					item.Video.catalogue = !catalogue;
					return item;
				});
				setPosts(newArray);

				const data = await axiosInstance.addToCatalogue({ videoId, catalogue });
				if (catalogue) {
					setCatalogueCount((catalogueCount) => catalogueCount - 1);
				} else {
					setCatalogueCount((catalogueCount) => catalogueCount + 1);
				}

			} catch ({
				response: {
					data: { message }
				}
			}) {
				console.log('error in Api: ', message);
			}
		} else {
			Swal.fire({
				text: 'You can add only 5 videos in catalogue, please delete any to proceed',
				// timer: 4000,
				icon: 'info',
				showConfirmButton: true,
				showCancelButton: false,
				buttonsStyling: false,
				customClass: {
					confirmButton:
						'w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
				}
			});
		}
	};

	const _HandleDeleteVideo = async (index, videoId) => {
		try {
			const res = await axiosInstance.deleteVideo(videoId);
			setCatalogueCount((catalogueCount) => catalogueCount - 1);
			const originalArray = [...posts];
			originalArray.splice(index, 1);
			setPosts(originalArray);
		} catch ({
			response: {
				data: { message }
			}
		}) {
			console.log('Api Failed: ', message);
		}
	};

	const _HandleGotoUserProfile = (id, username) => {
		if (id !== parseInt(localStorage.getItem('id'))) {
			router.push(`/dashboard/profile/${username}`);
		} else {
			router.push(`/dashboard/profile`);
		}
	};

	const _HandleGotoVideoDetails = (id) => {
		router.push(`/dashboard/videos/${id}`);
	};

	const ToggleRatingModal = () => {
		setShowRatingModal(!showRatingModal);
	}

	const _HandleChangeRating = (value) => {
		setSharePostRating(value);
	}

	const _SubmitRating = async () => {
		try {
			await axiosInstance.ratePost({ postId: postId, rating: postRating });
			ToggleRatingModal();
		}
		catch ({ response: { data: { message } } }) {
			console.log('in catch of api rating: ', message);
		}
	}
	const ToggleTipModal = () => {
		setShowTipModal(!showTipModal);
	};

	const _HandleChangeTip = (value) => {
		console.log('value: ', value);
	};


	const HandleLikePost = async () => {
		const deepCopyVideo = { ...video };
		deepCopyVideo.isLiked = !isLiked;
		deepCopyVideo.likeCount = isLiked ? (deepCopyVideo.likeCount - 1) : (deepCopyVideo.likeCount + 1)
		setVideo(deepCopyVideo);
		try {
			await axiosInstance.likePost({ postId: id });
		}
		catch ({ response: { data: { message } } }) {
			console.log('Like Post Api failed: ', message);
		}
	}

	const _HandleCommentCounts = async (operator) => {
		const updatedVideo = { ...video };
		operator === '+' ?
			updatedVideo.commentCount = (updatedVideo.commentCount + 1) :
			updatedVideo.commentCount = (updatedVideo.commentCount - 1);
		setVideo(updatedVideo);
	}


	const _HandleSubmitComment = async () => {
		_HandleCommentCounts('+')
		if (commentMessage !== '') {
			try {
				const res = await axiosInstance.postComment({ comment: commentMessage, videoId: id });
				setCommentMessage('');
				getAllCommentsByVideoId();
			}
			catch (e) {
				console.log('Comment on Post API failed: ', e);
			}
		}
	}

	const _HandleDeleteComments = async (index, commentId) => {
		_HandleCommentCounts('-')
		const deepCopyComments = [...comments];
		deepCopyComments.splice(index, 1);
		setComments(deepCopyComments);
		try {
			const { data: { message } } = await axiosInstance.deleteCommentById(commentId);
			console.log(message);
		} catch ({ response: { data: { message } } }) { console.log(message); }
	}


	const enableShareLoading = () => {
		setIsSharing(true);
	};

	const disableShareLoading = () => {
		setIsSharing(false);
	};

	let _OpenShareModal = () => {
		setShareData({
			videoId: videoId,
			thumbnail,
			url,
			picture: User?.picture,
			name: User?.name,
			title
		})
		setShowShareModal(true);
	}


	let _CloseShareModal = () => {
		setShowShareModal(false);
		setShareCaption('');
	}

	const _HandleSharePost = async () => {
		const { videoId = '' } = shareData;
		const updatedVideo = { ...video };
		updatedVideo.shareCount = shareCount + 1
		setVideo(updatedVideo);
		enableShareLoading();
		try {
			const { data: { message } } = await axiosInstance.sharePost({ caption: shareCaption, videoId: videoId });
			GetPosts();
			Swal.fire({
				text: message,
				icon: 'success',
				timer: 2000,
				showConfirmButton: false,
				showCancelButton: false,
			})
			disableShareLoading();
			_CloseShareModal();
		}
		catch ({ response: { data: { message } } }) {

			console.log('Share Post Api failed: ', message);
		}
	}

	const _HandlePaidVideos = async () => {
		console.log('Here');
		setTimeout(() => {
			setStopVideo(true);
			_TogglePaymentModal();
		}, watchLimit);
	}

	let _TogglePaymentModal = () => {
		setVideoPayment(cost);
		setShowAmountModal(!showAmountModal);
	}


	return (
		<div className="flex flex-col lg:flex-row min-h-screen py-5 px-3 cursor-auto bg-gray-100">
			<div className="w-full lg:w-8/12 flex flex-col">
				<div className="flex flex-col w-full py-2 justify-between space-x-2 sm:hidden space-y-2">
					<div className="flex space-x-2 w-full justify-end">
						<div className="flex px-2 h-6 rounded-lg background items-center justify-center">
							<p className="text-white font-sm">{videoType}</p>
						</div>
						{
							videoCost ? (
								<div className="flex px-2 h-6 max-w-sm background items-center justify-center rounded-lg">
									<p className="text-white font-sm">{videoCost}</p>
								</div>
							)
								:
								productLink && (
									<Link href={productLink} passHref>
										<a target='_blank'>
											<span className="text font-sm hover:underline cursor-pointer">
												Product Link
											</span>
										</a>
									</Link>)
						}
						<div className="flex space-x-2">
							{videoCost === "Paid" && localStorage.getItem('id') !== UserId &&
								<>
									<span
										onClick={ToggleTipModal}
										data-tip
										data-for={`tip${title}`}
										className="inline-flex h-8 w-14 cursor-pointer tip-hand">
										<Image src={HandIcon} alt="banner" objectFit='contain' />
									</span>
									<ReactTooltip
										className="md:max-w-sm mx-w-md break-words z-50"
										id={`tip${title}`}
										place="top"
										effect="solid"
										border={false}
										borderColor="white"
										clickable={false}>
										Give a Tip
									</ReactTooltip>
								</>
							}
						</div>
						<svg
							className="w-6 h-6 text-gray-500 hover:text-purple-600 cursor-pointer"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<div className="flex items-start justify-start">
							<PostActionDropdown
								_HandleCatalogue={() => _HandleCatalogue(postId, catalogue)}
								_HandleDeleteVideo={() => _HandleDeleteVideo(postId)}
								catalogue={catalogue}
								ownerId={UserId}
								isPost={true}
							/>
						</div>
					</div>
					<div className="flex space-x-2">
						<img
							src={User?.picture ||
								"https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"}
							className="rounded-full w-10 h-10 object-cover"
							alt="avatar"></img>
						<div className="flex flex-col w-full">
							<p
								onClick={() => _HandleGotoUserProfile(UserId, User?.username)}
								className="text-sm font-bold font-sans hover:underline cursor-pointer">
								{User?.name}
							</p>
							<p className="text-xs text-gray-500">19h</p>
						</div>
					</div>

				</div>
				<div className="sm:flex w-full py-2 justify-between space-x-2 hidden">
					<div className="flex space-x-2">
						<img
							src={User?.picture ||
								"https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"}
							className="rounded-full w-10 h-10 object-cover"
							alt="avatar"></img>
						<div className="flex flex-col w-full">
							<p
								onClick={() => _HandleGotoUserProfile(UserId, User?.username)}
								className="text-sm font-bold font-sans hover:underline cursor-pointer">
								{User?.name}
							</p>
							<p className="text-xs text-gray-500">19h</p>
						</div>
					</div>
					<div className="flex space-x-2">
						<div className="flex px-2 h-6 rounded-lg background items-center justify-center">
							<p className="text-white font-sm">{videoType}</p>
						</div>
						{
							videoCost ? (
								<div className="flex px-2 h-6 max-w-sm background items-center justify-center rounded-lg">
									<p className="text-white font-sm">{videoCost}</p>
								</div>
							)
								:
								productLink && (
									<Link href={productLink} passHref>
										<a target='_blank'>
											<span className="text font-sm hover:underline cursor-pointer">
												Product Link
											</span>
										</a>
									</Link>)
						}
						<div className="flex space-x-2">
							{videoCost === "Paid" && localStorage.getItem('id') !== UserId &&
								<>
									<span
										onClick={ToggleTipModal}
										data-tip
										data-for={`tip${title}`}
										className="inline-flex h-8 w-14 cursor-pointer tip-hand">
										<Image src={HandIcon} alt="banner" objectFit='contain' />
									</span>
									<ReactTooltip
										className="md:max-w-sm mx-w-md break-words z-50"
										id={`tip${title}`}
										place="top"
										effect="solid"
										border={false}
										borderColor="white"
										clickable={false}>
										Give a Tip
									</ReactTooltip>
								</>
							}
						</div>
						<svg
							className="w-6 h-6 text-gray-500 hover:text-purple-600 cursor-pointer"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<div className="flex items-start justify-start">
							<PostActionDropdown
								_HandleCatalogue={() => _HandleCatalogue(id, catalogue)}
								_HandleDeleteVideo={() => _HandleDeleteVideo(id)}
								catalogue={catalogue}
								ownerId={UserId}
								isPost={true}
							/>
						</div>
					</div>
				</div>
				<p
					// onClick={() => _HandleGotoVideoDetails(id)}
					className="px-3 pb-1 text-sm max-w-md whitespace-nowrap overflow-ellipsis overflow-hidden">
					{title}
				</p>
				{
					videoCost === 'Paid' ?
						!stopVideo ?
							<div className="detail-page-video-wrapper" onClick={_HandlePaidVideos}>
								<VideoPlayer poster={thumbnail} src={url} />
							</div>
							:
							<div className="detail-page-video-wrapper flex flex-col justify-center items-center">
								<p className="text-lg text-gray-500 text-center">To continue watching video</p>
								<button
									onClick={_TogglePaymentModal}
									type="button"
									className="mt-3 text-lg w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								>
									PAY NOW
								</button>
							</div>
						:
						<div className="detail-page-video-wrapper">
							<VideoPlayer poster={thumbnail} src={url} />
						</div>
				}
				<div className="w-full flex flex-col md:flex-row justify-center md:justify-between py-2">
					<div className="flex flex-row justify-between space-x-3">
						<div className="flex space-x-3">
							<Button
								onSubmit={HandleLikePost}
								type="button"
								childrens={
									<>
										<FontAwesomeIcon icon={faThumbsUp} className={`w-4 h-4 ${isLiked === false ? 'text-gray-600' : 'text-purple-600'} group-hover:text-purple-600`} />
										<p
											className={`cursor-pointer w-full text-xs text-center ${isLiked === false ? 'text-gray-600' : 'text-purple-600'} group-hover:text-purple-600`}>
											Like
										</p>

									</>
								}
								classNames={
									'text-xs hover:shadow py-1 px-5 group w-20 bg-white flex flex-col m-auto items-center rounded-md '
								}
							/>
							<Button
								onSubmit={_OpenShareModal}
								type="button"
								childrens={
									<>
										<FontAwesomeIcon icon={faShareAlt} className="w-4 h-4 text-gray-600 group-hover:text-purple-600" />
										<p className=" cursor-pointer text-xs w-full text-center text-gray-600 group-hover:text-purple-600">
											Share
										</p>
									</>
								}
								classNames={
									'py-1 px-5 hover:shadow w-20 bg-white group flex flex-col m-auto items-center rounded-md '
								}
							/>
						</div>
						<div className="flex divide-x divide-gray-500 items-center justify-center space-x-2">
							<span>
								<p className="text-sm ">{likeCount} {likeCount > 1 ? 'Likes' : 'Like'}</p>
							</span>
							<span>
								<p className="text-sm ml-2">{shareCount} Shares</p>
							</span>
						</div>
					</div>
					<div className="flex space-x-3 divide-x divide-gray-500 justify-end md:justify-center items-center">
						<div>
							<span onClick={ToggleRatingModal} className="flex items-center cursor-pointer">
								<Rating value={4} isHalf={true} edit={false} />
								&nbsp; <p className="text-xs"> Rating</p>
							</span>
						</div>
						<div>
							<span className="flex items-center ml-2">
								<svg
									className="w-4 h-4 text"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
									<path
										fillRule="evenodd"
										d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
										clipRule="evenodd"
									/>
								</svg>
								&nbsp;<p className="text-xs">{200} Views</p>
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-full space-y-1 mt-3">
					<p className="font-bold text-md">Description</p>
					<p className="text-sm break-words">
						<ReadLessReadMore
							limit={250}
							text={description || ''}
						/>
					</p>
				</div>
				<div className="flex flex-col w-full mt-3">
					<div className="flex justify-between">
						<p className="font-bold text-md">Comments</p>
						<p className="text-sm">{commentCount} Comment{commentCount > 1 ? 's' : ''}</p>
					</div>
					<div className="flex items-center border-b border-gray-500 py-2 mb-4">
						<input
							className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
							type="text"
							aria-label="Comment"
							placeholder="Write comment here"
							onChange={(e) => setCommentMessage(e.target.value)}
						/>
						<span onClick={_HandleSubmitComment} className="flex items-center px-2">
							<FontAwesomeIcon
								icon={faPaperPlane}
								className="w-5 h-5 text-gray-600 hover:text-purple-600 cursor-pointer" />
						</span>
					</div>
					<div className="share-modal-scrollbar space-y-2 p-2 max-h-96 overflow-y-auto rounded-lg">
						<CommentCard
							data={comments}
							_HandleDeleteComments={_HandleDeleteComments}
							_HandleGotoUserProfile={_HandleGotoUserProfile}
						/>

					</div>
				</div>
			</div>
			<div className="w-full lg:w-4/12 flex flex-col">
				<p className="font-bold text-md mb-3 px-5">Related Videos</p>
				<div className="space-y-2 px-5">
					{posts &&
						posts.map(({
							id: postId, Video: {
								description, title, url, UserId, thumbnail, catalogue, User, videoType,
								videoCost, mediaType, productLink, tip
							},
						}, index) => (
							<div key={index}>
								<SuggestionCard
									id={postId}
									UserId={UserId}
									index={index}
									catalogue={catalogue}
									url={url}
									User={User}
									views={200}
									rating={2.5}
									productLink={productLink}
									videoCost={videoCost}
									videoType={videoType}
									mediaType={mediaType}
									description={description}
									title={title}
									isPost={true}
									width={'max-w-lg'}
									thumbnail={thumbnail}
									_HandleCatalogue={() => _HandleCatalogue(postId, catalogue)}
									_HandleDeleteVideo={_HandleDeleteVideo}
									_HandleGotoUserProfile={_HandleGotoUserProfile}
									_HandleGotoVideoDetails={_HandleGotoVideoDetails}
								/>
							</div>
						)
						)}
				</div>
			</div>
			{showRatingModal && (
				<VideoRatingModal
					loading={false}
					videoRating={postRating}
					modalTitle={'Rate Video'}
					_SubmitRating={_SubmitRating}
					ToggleRatingModal={ToggleRatingModal}
					_HandleChangeRating={_HandleChangeRating}
				/>
			)}
			{showShareModal && (
				<ShareModal
					modalTitle={'Share Post'}
					ToggleShareModal={_CloseShareModal}
					setShareCaption={setShareCaption}
					shareCaption={shareCaption}
					_HandleSubmit={_HandleSharePost}
					loading={isSharing}
					shareData={shareData}
				/>
			)}
			{showTipModal && (
				<TipModal
					_HandleChangeTip={_HandleChangeTip}
					tip={2}
					ToggleTipModal={ToggleTipModal}
					loading={false}
					modalTitle={'Video Tip Modal'}
				/>
			)}
			{showAmountModal && (
				<PaymentModal
					ToggleAmountModal={_TogglePaymentModal}
					loading={isSharing}
					amount={videoPayment}
				/>
			)}
		</div>
	);
};

export const getServerSideProps = async (context) => {
	const { token } = parseCookies(context);
	if (!token)
		return {
			redirect: {
				permanent: false,
				destination: '/auth/login'
			},
			props: {}
		};
	else {
		return {
			props: {}
		};
	}
};

export default VideoDetailScreen;
