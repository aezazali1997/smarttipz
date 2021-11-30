import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Button, GenericFilters, NewsfeedCard, NewsFeedFilters, ProfileOverviewCard, SortFilter, Spinner } from 'src/components';
import { TipModal, VideoRatingModal } from 'src/components/Modals';
import { UseSearch } from 'src/hooks';



const Search = () => {

	const { _HandleAccountTypeFilter, _HandleActiveGenericFilter, _HandleChangeTip, _HandleChangeRating,
		ToggleTipModal, ToggleRatingModal, _HandleGotoVideoDetails, _HandleGotoUserProfile, _HandleDeleteVideo,
		_HandleCatalogue, GetUserProfiles, GetPosts, filterSearch, posts, userProfiles, showRatingModal,
		showTipModal, activeGenericFilter, userProfileLoading, postsLoading, sort, setSort, account,
		setAccountType, videoCategory, videoType, rating, setRating, category, _ChangeCategoryFilter
	} = UseSearch();

	return (
		<div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 py-4 px-3 relative">

			<div className="w-full lg:w-4/6 h-full">
				{
					activeGenericFilter === 'All' ?
						<>
							<div className="space-y-4">
								{
									postsLoading ? (
										<div className="flex w-full justify-center">
											<span className="flex flex-col items-center">
												<Spinner />
												<p className="text-sm text-gray-400"> Loading Posts</p>
											</span>
										</div>
									)
										:
										isEmpty(posts) ? (
											<div className="flex w-full justify-center items-center">
												<p className="text-gray-500"> No Posts Found</p>
											</div>
										)
											:
											<>
												{
													posts.slice(0, 1).map(({ id, description, title, url, UserId, thumbnail, PostLikees, catalogue, User, videoType, videoCost }, index) => (
														<div key={index}>
															<NewsfeedCard
																id={id}
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
																videoCost={videoCost}
																videoType={videoType}
																width={'max-w-lg'}
																thumbnail={thumbnail}
																ToggleTipModal={ToggleTipModal}
																ToggleRatingModal={ToggleRatingModal}
																_HandleDeleteVideo={_HandleDeleteVideo}
																_HandleCatalogue={_HandleCatalogue}
																_HandleGotoUserProfile={_HandleGotoUserProfile}
																_HandleGotoVideoDetails={_HandleGotoVideoDetails}
															/>
														</div>
													))
												}
												<Button
													type="button"
													childrens={'See All'}
													onSubmit={() => _HandleActiveGenericFilter('Posts')}
													classNames={" mx-auto px-3 py-2 flex justify-center items-center text-white w-28 text-sm btn rounded-md "}
												/>
											</>
								}
							</div>
							<div className="space-y-4 mt-4">
								{
									userProfileLoading ? (
										<div className="flex w-full justify-center">
											<span className="flex flex-col items-center">
												<Spinner />
												<p className="text-sm text-gray-400"> Loading Profiles</p>
											</span>
										</div>
									)
										:
										isEmpty(userProfiles) ? (
											<div className="flex w-full justify-center items-center">
												<p className="text-gray-500"> No User Profiles Found</p>
											</div>
										)
											:
											<>
												{
													userProfiles.slice(0, 1).map(({ id, name, email, picture, showName, showUsername, username,
														accountType, Followed, Follower, accessible }, index) => (
														<div key={index}>
															<ProfileOverviewCard
																_HandleGotoUserProfile={() => _HandleGotoUserProfile(id, username)}
																name={accountType === 'Personal' ? showName ? name : showUsername ? username : '' : name}
																picture={picture}
																email={email}
																id={id}
																username={username}
																accessible={accessible}
																Followed={Followed}
																Follower={Follower}
															/>
														</div>
													))
												}
												<Button
													type="button"
													childrens={'See All'}
													onSubmit={() => _HandleActiveGenericFilter('Profile')}
													classNames={" mx-auto px-3 py-2 flex justify-center items-center text-white w-28 text-sm btn rounded-md "}
												/>
											</>
								}
							</div>
						</>
						:
						activeGenericFilter === 'Posts' ?
							<div className="space-y-4">
								{
									posts.map(({ id, description, title, url, UserId, thumbnail, PostLikees, catalogue, User, videoType, videoCost }, index) => (
										<div key={index}>
											<NewsfeedCard
												id={id}
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
												videoCost={videoCost}
												videoType={videoType}
												width={'max-w-lg'}
												thumbnail={thumbnail}
												ToggleTipModal={ToggleTipModal}
												ToggleRatingModal={ToggleRatingModal}
												_HandleDeleteVideo={_HandleDeleteVideo}
												_HandleCatalogue={_HandleCatalogue}
												_HandleGotoUserProfile={_HandleGotoUserProfile}
												_HandleGotoVideoDetails={_HandleGotoVideoDetails}
											/>
										</div>
									))
								}
							</div>
							:
							activeGenericFilter === 'Profile' ?
								<div className="space-y-4">
									{
										userProfiles.map(({ id, name, email, picture, showName, showUsername,
											username, accountType, Follower, Followed, accessible }, index) => (
											<div key={index}>
												<ProfileOverviewCard
													_HandleGotoUserProfile={() => _HandleGotoUserProfile(id, username)}
													name={accountType === 'Personal' ? showName ? name : showUsername ? username : '' : name}
													picture={picture}
													email={email}
													id={id}
													username={username}
													accessible={accessible}
													Followed={Followed}
													Follower={Follower}
												/>
											</div>
										))
									}
								</div>
								:
								''
				}
			</div>
			<div className="w-full lg:w-2/6 relative">
				<div className="sticky top-0 space-y-4 justify-center flex-col items-center ">
					<GenericFilters
						_HandleActiveGenericFilter={_HandleActiveGenericFilter}
						activeGenericFilter={activeGenericFilter}
						category={category}
						_ChangeCategoryFilter={_ChangeCategoryFilter}
					/>
					<SortFilter
						value={sort}
						setSort={setSort}
					/>
					<NewsFeedFilters
						rating={rating}
						setRating={setRating}
					/>
				</div>
			</div>
			{
				showRatingModal && (
					<VideoRatingModal
						modalTitle={'Rate Video'}
						ToggleRatingModal={ToggleRatingModal}
						_HandleChangeRating={_HandleChangeRating}
						loading={false}
						videoRating={2}
					/>
				)
			}
			{
				showTipModal && (
					<TipModal
						_HandleChangeTip={_HandleChangeTip}
						tip={2}
						ToggleTipModal={ToggleTipModal}
						loading={false}
						modalTitle={"Tip Video"}
					/>
				)
			}
		</div>
	)
}


export default Search;
