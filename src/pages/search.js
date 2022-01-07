import { isEmpty } from 'lodash';
import React from 'react';
import {
	Button,
	GenericFilters,
	NewsfeedCard,
	NewsFeedFilters,
	ProfileOverviewCard,
	SharedCard,
	SortFilter,
	Spinner
} from 'src/components';
import { FilterModal, ShareModal, TipModal, VideoRatingModal } from 'src/components/Modals';
import { UseSearch } from 'src/hooks';

const Search = () => {
	const {
		_HandleAccountTypeFilter,
		_HandleActiveGenericFilter,
		_HandleChangeTip,
		_HandleChangeRating,
		ToggleTipModal,
		ToggleRatingModal,
		_HandleGotoVideoDetails,
		_HandleGotoUserProfile,
		_HandleDeleteVideo,
		_HandleCatalogue,
		GetUserProfiles,
		GetPosts,
		filterSearch,
		posts,
		userProfiles,
		showRatingModal,
		showTipModal,
		activeGenericFilter,
		userProfileLoading,
		postsLoading,
		sort,
		setSort,
		account,
		setAccountType,
		videoCategory,
		videoType,
		rating,
		setRating,
		category,
		_ChangeCategoryFilter,
		HandleLikePost,
		tip,
		_HandleVideoTypeFilter,
		_HandleVideoCategoryFilter,
		showFilterModal,
		_HandleToggleFilterModal,
		_OpenShareModal,
		_HandleChangeCaption,
		_HandleSharePost,
		shareCaption,
		shareData,
		isSharing,
		showShareModal,
		_CloseShareModal,
		setShareCaption,
		OpenRatingModal, _SubmitRating
	} = UseSearch();

	return (
		<div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 py-4 px-3 relative">
			<div className="w-full lg:w-4/6 h-full space-y-3 lg:space-y-0">
				<div className="w-full">
					<Button
						type="button"
						childrens={
							<>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
										clipRule="evenodd"
									/>
								</svg>
								<p>Filters</p>
							</>
						}
						classNames={
							'px-3 py-2 space-x-1 flex lg:hidden h-auto mx-auto sm:h-12 w-full justify-center items-center text-white text-sm btn rounded-md '
						}
						onSubmit={_HandleToggleFilterModal}
					/>
				</div>
				{activeGenericFilter === 'All' ? (
					<div className="space-y-4">
						<div className="space-y-4">
							{postsLoading ? (
								<div className="flex w-full justify-center">
									<span className="flex flex-col items-center">
										<Spinner />
										<p className="text-sm text-gray-400"> Loading Posts</p>
									</span>
								</div>
							) : isEmpty(posts) ? (
								<div className="flex w-full justify-center items-center">
									<p className="text-gray-500"> No Posts Found</p>
								</div>
							) : (
								<>
									{posts
										.slice(0, 1)
										.map(
											(
												{
													id: postId,
													likeCount,
													isLiked,
													Video,
													Share,
													isShared,
													Video: {
														id,
														description,
														title,
														url,
														UserId,
														thumbnail,
														PostLikees,
														catalogue,
														User,
														videoType,
														videoCost,
														isApproved
													}
												},
												index
											) =>
												isShared ? (
													<SharedCard
														id={postId}
														videoId={id}
														index={index}
														Video={Video}
														Share={Share}
														isLiked={isLiked}
														width={'max-w-lg'}
														likeCount={likeCount}
														HandleLikePost={HandleLikePost}
														_OpenShareModal={_OpenShareModal}
														_HandleGotoUserProfile={_HandleGotoUserProfile}
														_HandleGotoVideoDetails={_HandleGotoVideoDetails}
													/>
												) :
													(
														<div key={index}>
															<NewsfeedCard
																id={postId}
																videoId={id}
																UserId={UserId}
																index={index}
																catalogue={catalogue}
																isPost={true}
																url={url}
																views={200}
																User={User}
																rating={2.5}
																postLikes={PostLikees}
																description={description}
																title={title}
																isLiked={isLiked}
																likeCount={likeCount}
																videoCost={videoCost}
																videoType={videoType}
																width={'max-w-lg'}
																thumbnail={thumbnail}
																HandleLikePost={HandleLikePost}
																ToggleTipModal={ToggleTipModal}
																ToggleRatingModal={() => OpenRatingModal(postId)}
																_HandleDeleteVideo={_HandleDeleteVideo}
																_HandleCatalogue={_HandleCatalogue}
																_HandleGotoUserProfile={_HandleGotoUserProfile}
																_HandleGotoVideoDetails={_HandleGotoVideoDetails}
															/>
														</div>
													)
										)}
									<Button
										type="button"
										childrens={'See All'}
										onSubmit={() => _HandleActiveGenericFilter('Posts')}
										classNames={
											' mx-auto px-3 py-2 flex justify-center items-center text-white w-28 text-sm btn rounded-md '
										}
									/>
								</>
							)}
						</div>
						<div className="space-y-4 mt-4">
							{userProfileLoading ? (
								<div className="flex w-full justify-center">
									<span className="flex flex-col items-center">
										<Spinner />
										<p className="text-sm text-gray-400"> Loading Profiles</p>
									</span>
								</div>
							) : isEmpty(userProfiles) ? (
								<div className="flex w-full justify-center items-center">
									<p className="text-gray-500"> No User Profiles Found</p>
								</div>
							) : (
								<>
									{userProfiles
										.slice(0, 1)
										.map(
											(
												{
													id,
													name,
													email,
													picture,
													showName,
													showUsername,
													username,
													accountType,
													Followed,
													Follower,
													accessible
												},
												index
											) => (
												<div key={index}>
													<ProfileOverviewCard
														_HandleGotoUserProfile={() => _HandleGotoUserProfile(id, username)}
														name={accountType === 'Personal' ? (showName ? name : showUsername ? username : '') : name}
														picture={picture}
														email={email}
														id={id}
														username={username}
														accessible={accessible}
														Followed={Followed}
														Follower={Follower}
													/>
												</div>
											)
										)}
									<Button
										type="button"
										childrens={'See All'}
										onSubmit={() => _HandleActiveGenericFilter('Profile')}
										classNames={
											' mx-auto px-3 py-2 flex justify-center items-center text-white w-28 text-sm btn rounded-md '
										}
									/>
								</>
							)}
						</div>
					</div>
				) : activeGenericFilter === 'Posts' ? (
					<div className="space-y-4">
						{posts.map(
							(
								{
									id: postId,
									likeCount,
									isLiked,
									isShared,
									Video,
									Share,
									Video: {
										id,
										description,
										title,
										url,
										UserId,
										thumbnail,
										PostLikees,
										catalogue,
										User,
										videoType,
										videoCost,
										isApproved
									}
								},
								index
							) =>
								isShared ? (
									<SharedCard
										id={postId}
										videoId={id}
										index={index}
										Video={Video}
										Share={Share}
										isLiked={isLiked}
										width={'max-w-lg'}
										likeCount={likeCount}
										HandleLikePost={HandleLikePost}
										_OpenShareModal={_OpenShareModal}
										_HandleGotoUserProfile={_HandleGotoUserProfile}
										_HandleGotoVideoDetails={_HandleGotoVideoDetails}
									/>
								) :
									isApproved && (
										<div key={index}>
											<NewsfeedCard
												id={postId}
												videoId={id}
												UserId={UserId}
												index={index}
												catalogue={catalogue}
												isPost={true}
												url={url}
												views={200}
												User={User}
												rating={2.5}
												isLiked={isLiked}
												likeCount={likeCount}
												postLikes={PostLikees}
												description={description}
												title={title}
												videoCost={videoCost}
												videoType={videoType}
												width={'max-w-lg'}
												thumbnail={thumbnail}
												HandleLikePost={HandleLikePost}
												ToggleTipModal={ToggleTipModal}
												ToggleRatingModal={() => OpenRatingModal(postId)}
												_HandleDeleteVideo={_HandleDeleteVideo}
												_HandleCatalogue={_HandleCatalogue}
												_HandleGotoUserProfile={_HandleGotoUserProfile}
												_HandleGotoVideoDetails={_HandleGotoVideoDetails}
											/>
										</div>
									)
						)}
					</div>
				) : activeGenericFilter === 'Profile' ? (
					<div className="space-y-4">
						{userProfiles.map(
							(
								{
									id,
									name,
									email,
									picture,
									showName,
									showUsername,
									username,
									accountType,
									Follower,
									Followed,
									accessible
								},
								index
							) => (
								<div key={index}>
									<ProfileOverviewCard
										_HandleGotoUserProfile={() => _HandleGotoUserProfile(id, username)}
										name={accountType === 'Personal' ? (showName ? name : showUsername ? username : '') : name}
										picture={picture}
										email={email}
										id={id}
										username={username}
										accessible={accessible}
										Followed={Followed}
										Follower={Follower}
									/>
								</div>
							)
						)}
					</div>
				) : (
					''
				)}
			</div>
			<div className="hidden lg:block w-full lg:w-2/6 relative h-full">
				<div className="sticky top-0 space-y-4 justify-center flex-col items-center ">
					<GenericFilters
						category={category}
						activeGenericFilter={activeGenericFilter}
						_ChangeCategoryFilter={_ChangeCategoryFilter}
						_HandleActiveGenericFilter={_HandleActiveGenericFilter}
					/>
					<SortFilter value={sort} setSort={setSort} />
					<NewsFeedFilters
						rating={rating}
						account={account}
						videoType={videoType}
						videoCategory={videoCategory}
						setRating={setRating}
						_HandleChangeRating={_HandleChangeRating}
						_HandleVideoTypeFilter={_HandleVideoTypeFilter}
						_HandleAccountTypeFilter={_HandleAccountTypeFilter}
						_HandleVideoCategoryFilter={_HandleVideoCategoryFilter}
					/>
				</div>
			</div>
			{showRatingModal && (
				<VideoRatingModal
					modalTitle={'Rate Video'}
					loading={false}
					videoRating={rating}
					_SubmitRating={_SubmitRating}
					ToggleRatingModal={ToggleRatingModal}
					_HandleChangeRating={_HandleChangeRating}
				/>
			)}
			{showTipModal && (
				<TipModal
					tip={tip}
					loading={false}
					modalTitle={'Tip Video'}
					ToggleTipModal={ToggleTipModal}
					_HandleChangeTip={_HandleChangeTip}
				/>
			)}
			{showShareModal && (
				<ShareModal
					modalTitle={'Share Post'}
					loading={isSharing}
					shareData={shareData}
					shareCaption={shareCaption}
					_HandleSubmit={_HandleSharePost}
					setShareCaption={setShareCaption}
					ToggleShareModal={_CloseShareModal}
				/>
			)}
			{showFilterModal && (
				<FilterModal
					modalTitle={'Search Filters'}
					sort={sort}
					rating={rating}
					account={account}
					category={category}
					videoType={videoType}
					videoCategory={videoCategory}
					activeGenericFilter={activeGenericFilter}
					setSort={setSort}
					setRating={setRating}
					_HandleChangeRating={_HandleChangeRating}
					ToggleFilterModal={_HandleToggleFilterModal}
					_ChangeCategoryFilter={_ChangeCategoryFilter}
					_HandleVideoTypeFilter={_HandleVideoTypeFilter}
					_HandleAccountTypeFilter={_HandleAccountTypeFilter}
					_HandleVideoCategoryFilter={_HandleVideoCategoryFilter}
					_HandleActiveGenericFilter={_HandleActiveGenericFilter}
				/>
			)}
		</div>
	);
};

export default Search;
