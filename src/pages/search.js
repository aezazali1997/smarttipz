import { AnimatePresence } from 'framer-motion';
import { isEmpty } from 'lodash';
import React from 'react';
import {
	Button,
	GenericFilters,
	NewsfeedCard,
	NewsFeedFilters,
	ProfileOverviewCard,
	SharedCard,
	CustomLoader,
	SortFilter,
	Spinner
} from 'src/components';
import { FilterModal, PaymentModal, ShareModal, TipModal, VideoRatingModal } from 'src/components/Modals';
import { UseSearch } from 'src/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

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
		_HandleRateFilter,
		setRateFilter,
		rateFilter,
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
		_HandleSharePost,
		shareCaption,
		shareData,
		isSharing,
		showShareModal,
		_CloseShareModal,
		setShareCaption,
		OpenRatingModal,
		_SubmitRating,
		_TogglePaymentModal,
		_HandleCommentCounts,
		_HandleClearRating,
		showAmountModal,
		videoPayment
		,_FetchMoreData,
		hasMore
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

							) : isEmpty(posts) || Array.isArray(posts) || posts.length>1 ? (
								<div className="flex w-full justify-center items-center">
									<p className="text-gray-500"> No Posts Found</p>
					
							</div>
							) : (
								<>
									{[posts]
										.map(({
											id: postId,
											Video,
											isShared,
											Share,
											isLiked,
											shareCount,
											likeCount,
											commentCount,
											avgRating,
											totalRaters,
											Video: {
												id,
												description,
												title,
												url,
												UserId,
												thumbnail,
												catalogue,
												User,
												Shares,
												videoType,
												videoCost,
												productLink,
												watchLimit,
												isApproved,
												cost,
												rating,
												createdAt
											}
										}
											, index) => (
											isShared ? (
												<SharedCard
													key={index}
													id={postId}
													videoId={id}
													index={index}
													Video={Video}
													Share={Share}
													isLiked={isLiked}
													likeCount={likeCount}
													commentCount={commentCount}
													shareCount={shareCount}
													width={'max-w-lg'}
													restrictPaidVideo={true}
													ToggleTipModal={ToggleTipModal}
													_OpenShareModal={_OpenShareModal}
													_HandleCommentCounts={_HandleCommentCounts}
													HandleLikePost={() => HandleLikePost(postId, isLiked)}
													_HandleGotoUserProfile={_HandleGotoUserProfile}
													_HandleGotoVideoDetails={_HandleGotoVideoDetails}
													TogglePaymentModal={() => _TogglePaymentModal(cost)}
												/>
											) :
												isApproved && (
													<NewsfeedCard
														key={index}
														id={postId}
														videoId={id}
														UserId={UserId}
														index={index}
														catalogue={catalogue}
														isPost={true}
														url={url}
														views={200}
														User={User}
														rating={rating}
														Shares={Shares}
														description={description}
														title={title}
														isLiked={isLiked}
														likeCount={likeCount}
														commentCount={commentCount}
														shareCount={shareCount}
														videoCost={videoCost}
														videoType={videoType}
														watchLimit={watchLimit}
														productLink={productLink}
														avgRating={avgRating}
														width={'max-w-lg'}

														thumbnail={thumbnail}
														restrictPaidVideo={true}
														createdAt={createdAt}
														_OpenShareModal={_OpenShareModal}
														_HandleCommentCounts={_HandleCommentCounts}
														_HandleDeleteVideo={_HandleDeleteVideo}
														_HandleCatalogue={_HandleCatalogue}
														_HandleGotoUserProfile={_HandleGotoUserProfile}
														_HandleGotoVideoDetails={_HandleGotoVideoDetails}
														ToggleTipModal={() => ToggleTipModal(User?.tip)}
														TogglePaymentModal={() => _TogglePaymentModal(cost)}
														HandleLikePost={() => HandleLikePost(postId, isLiked)}
														ToggleRatingModal={() => OpenRatingModal({ postId, avgRating, totalRaters })}
													/>
												)

										))}
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
													accessible,
													avgRating
												},
												index
											) => (
												<ProfileOverviewCard
													key={index}
													_HandleGotoUserProfile={() => _HandleGotoUserProfile(id, username)}
													name={accountType === 'Personal' ? (showName ? name : showUsername ? username : '') : name}
													picture={picture}
													email={email}
													id={id}
													username={username}
													accessible={accessible}
													Followed={Followed}
													Follower={Follower}
													profileRating={avgRating}
												/>
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
						{
							postsLoading ? (
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
							) : 	
							<InfiniteScroll
            	dataLength={posts?.length ? posts.length : 0 } //This is important field to render the next data
            	next={_FetchMoreData}
            	hasMore={hasMore}
            	loader={
              <div className="flex justify-center items-center w-full">
                <CustomLoader />
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center', padding: '2px 0' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>
						<div className='space-y-4'>
					
						{
							!isEmpty(posts) && Array.isArray(posts) ?
								posts.map(
									(
										{
											id: postId,
											Video,
											isShared,
											Share,
											isLiked,
											shareCount,
											likeCount,
											commentCount,
											avgRating,
											totalRaters,
											Video: {
												id,
												description,
												title,
												url,
												UserId,
												thumbnail,
												catalogue,
												User,
												Shares,
												videoType,
												videoCost,
												productLink,
												watchLimit,
												isApproved,
												cost,
												createdAt
											}
										},
										index
									) =>
										isShared ? (
											<SharedCard
												key={index}
												id={postId}
												videoId={id}
												index={index}
												Video={Video}
												Share={Share}
												isLiked={isLiked}
												likeCount={likeCount}
												commentCount={commentCount}
												shareCount={shareCount}
												width={'max-w-lg'}
												restrictPaidVideo={true}
												createdAt={createdAt}
												ToggleTipModal={ToggleTipModal}
												_OpenShareModal={_OpenShareModal}
												_HandleCommentCounts={_HandleCommentCounts}
												_HandleGotoUserProfile={_HandleGotoUserProfile}
												_HandleGotoVideoDetails={_HandleGotoVideoDetails}
												TogglePaymentModal={() => _TogglePaymentModal(cost)}
												HandleLikePost={() => HandleLikePost(postId, isLiked)} />
										) :
											isApproved && (
												<NewsfeedCard
													key={index}
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
													Shares={Shares}
													likeCount={likeCount}
													commentCount={commentCount}
													shareCount={shareCount}
													description={description}
													title={title}
													isLiked={isLiked}
													avgRating={avgRating}
													videoCost={videoCost}
													videoType={videoType}
													watchLimit={watchLimit}
													productLink={productLink}
													width={'max-w-lg'}
													thumbnail={thumbnail}
													restrictPaidVideo={true}
													createdAt={createdAt}
													_OpenShareModal={_OpenShareModal}
													_HandleCatalogue={_HandleCatalogue}
													_HandleDeleteVideo={_HandleDeleteVideo}
													_HandleCommentCounts={_HandleCommentCounts}
													_HandleGotoUserProfile={_HandleGotoUserProfile}
													ToggleTipModal={() => ToggleTipModal(User?.tip)}
													_HandleGotoVideoDetails={_HandleGotoVideoDetails}
													TogglePaymentModal={() => _TogglePaymentModal(cost)}
													HandleLikePost={() => HandleLikePost(postId, isLiked)}
													ToggleRatingModal={() => OpenRatingModal({ postId, avgRating, totalRaters })}
												/>
											)
								) : null
								}
								</div>
						</InfiniteScroll>
								}
					</div>
				) : activeGenericFilter === 'Profile' ? (
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
													accessible,
													avgRating
												},
												index
											) => (
												<ProfileOverviewCard
													key={index}
													_HandleGotoUserProfile={() => _HandleGotoUserProfile(id, username)}
													name={accountType === 'Personal' ? (showName ? name : showUsername ? username : '') : name}
													picture={picture}
													email={email}
													id={id}
													username={username}
													accessible={accessible}
													Followed={Followed}
													Follower={Follower}
													profileRating={avgRating}
												/>
											)
										)}
								
								</>
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
						rating={rateFilter}
						account={account}
						videoType={videoType}
						_HandleClear={_HandleClearRating}
						videoCategory={videoCategory}
						_HandleChangeRating={_HandleRateFilter}
						_HandleVideoTypeFilter={_HandleVideoTypeFilter}
						_HandleAccountTypeFilter={_HandleAccountTypeFilter}
						_HandleVideoCategoryFilter={_HandleVideoCategoryFilter}
					/>
				</div>
			</div>
			<AnimatePresence>
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
						rating={rateFilter}
						account={account}
						category={category}
						videoType={videoType}
						videoCategory={videoCategory}
						activeGenericFilter={activeGenericFilter}
						setSort={setSort}
						_HandleClear={_HandleClearRating}
						_HandleChangeRating={_HandleRateFilter}
						ToggleFilterModal={_HandleToggleFilterModal}
						_ChangeCategoryFilter={_ChangeCategoryFilter}
						_HandleVideoTypeFilter={_HandleVideoTypeFilter}
						_HandleAccountTypeFilter={_HandleAccountTypeFilter}
						_HandleVideoCategoryFilter={_HandleVideoCategoryFilter}
						_HandleActiveGenericFilter={_HandleActiveGenericFilter}
					/>
				)}
				{showAmountModal && (
					<PaymentModal
						ToggleAmountModal={_TogglePaymentModal}
						loading={isSharing}
						amount={videoPayment}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Search;
