/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { VideoPlayer } from '..';

const ContentSection = ({
	stopVideo,
	SharedPost,
	_HandlePaidVideos,
	_HandleGotoUserProfile,
	_HandleGotoVideoDetails,
	restrict
}) => {
	const {
		thumbnail = '',
		url = '',
		title = '',
		User = {},
		UserId = '',
		id = '',
		videoCost = '',

	} = SharedPost;

	return (
		<div
			className={`mx-auto max-w-lg pt-2 pb-4 border flex flex-col justify-center rounded-lg overflow-hidden
                bg-white space-y-2`}>
			<div className="flex w-full px-2 space-x-2">
				<img
					src={User?.picture || 'https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png'}
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
			<p
				onClick={() => _HandleGotoVideoDetails(id)}
				className="px-5 text-sm max-w-md hover:underline whitespace-nowrap overflow-ellipsis overflow-hidden cursor-pointer">
				{title}
			</p>
			{videoCost === 'Paid' && restrict === true ? (
				!stopVideo ? (
					<div className="video-wrapper" onClick={_HandlePaidVideos}>
						<VideoPlayer poster={thumbnail} src={url} />
					</div>
				) : (
					<div className="video-wrapper flex justify-center items-center">
						<p className="text-md text-gray-500 text-center">
							To continue watching video,
							<br /> Pay Now!
						</p>
					</div>
				)
			) : (
				<div className="video-wrapper">
					<VideoPlayer poster={thumbnail} src={url} />
				</div>
			)}
		</div>
	);
};

export default ContentSection;
