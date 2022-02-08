import React, { useState } from 'react';

const NewsFeedFilters = ({
	account,
	videoType,
	_HandleClear,
	videoCategory,
	_HandleChangeRating,
	_HandleAccountTypeFilter,
	_HandleVideoTypeFilter,
	_HandleVideoCategoryFilter
}) => {
	let color = 'light';

	const [ratingStars, setRatingStars] = useState(0);

	const _HandleClickRatingStar = (index) => {
		setRatingStars(index);
		_HandleChangeRating(index)
	}

	const EmptyStar = ({ _HandleClick }) => (
		<span onClick={_HandleClick}>
			<svg
				className="w-4 h-4 text-gray-500 hover:text-purple-600 cursor-pointer"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
			</svg>
		</span>)

	const FilledStar = ({ _HandleClick }) => (
		<span onClick={_HandleClick}>
			<svg
				className="w-4 h-4 text cursor-pointer"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
			</svg>
		</span>)

	const displayRatingStars = () => {
		const emptyStars = 5 - ratingStars;
		return (
			<span className="flex space-x-1">
				{[...Array(ratingStars)].map((item, index) => <FilledStar key={index} _HandleClick={() => _HandleClickRatingStar(index + 1)} />)}
				{[...Array(emptyStars)].map((item, index) => (
					<EmptyStar key={index} _HandleClick={() => _HandleClickRatingStar(ratingStars + 1)} />
				))}
			</span>
		)
	}

	const _HandleClearRating = () => {
		setRatingStars(0);
		_HandleClear();
	}


	return (
		<>
			<div className="flex flex-col w-full lg:w-auto">
				<div className="bg-white px-2 py-3 shadow rounded-lg">
					<div className="flex">
						<div className="mb-3 mx-auto">
							<p className="w-full font-medium text-md">Filters</p>
						</div>
					</div>
					<div className={'relative flex flex-col min-w-0 break-words w-full rounded-lg'}>
						<div className="block w-full overflow-x-auto">
							{/* Projects table */}
							<table className="items-center w-full bg-transparent border-collapse">
								<thead>
									<tr>
										<th
											className={
												'px-3 align-middle  py-0 text-xs uppercase  whitespace-nowrap font-semibold text-left ' +
												(color === 'light'
													? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
													: 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
											}></th>
										<th
											className={
												'px-3 align-middle py-0 text-xs uppercase  whitespace-nowrap font-semibold text-left ' +
												(color === 'light'
													? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
													: 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
											}></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="border-t-0 w-max space-x-3 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-2 text-left flex items-center">
											<label className="inline-flex items-center">
												<input
													type="checkbox"
													className="form-radio"
													name="Personal"
													checked={account.Personal}
													onChange={(e) => _HandleAccountTypeFilter(e)}
												/>
												<span className="ml-2">Personal</span>
											</label>
										</td>
										<td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
											<label className="inline-flex items-center">
												<input
													type="checkbox"
													className="form-radio"
													name="Business"
													checked={account?.Business}
													onChange={(e) => _HandleAccountTypeFilter(e)}
												/>
												<span className="ml-2">Business</span>
											</label>
										</td>
									</tr>
									<tr>
										<td className="border-t-0 w-max space-x-3 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-2 text-left flex items-center">
											<label className="inline-flex items-center">
												<input
													type="checkbox"
													className="form-radio"
													name="Paid"
													checked={videoCategory?.Paid}
													onChange={(e) => _HandleVideoCategoryFilter(e)}
												/>
												<span className="ml-2">Paid</span>
											</label>
										</td>
										<td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
											<label className="inline-flex items-center">
												<input
													type="checkbox"
													className="form-radio"
													name="Free"
													checked={videoCategory?.Free}
													onChange={(e) => _HandleVideoCategoryFilter(e)}
												/>
												<span className="ml-2">Free</span>
											</label>
										</td>
									</tr>
									<tr>
										<td className="border-t-0 w-max space-x-3 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-2 text-left flex items-center">
											<label className="inline-flex items-center">
												<input
													type="checkbox"
													className="form-radio"
													name="SmartReview"
													checked={videoType?.SmartReview}
													onChange={(e) => _HandleVideoTypeFilter(e)}
												/>
												<span className="ml-2">SmartReview</span>
											</label>
										</td>
										<td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
											<label className="inline-flex items-center">
												<input type="checkbox"
													className="form-radio"
													name="SmartTipz"
													checked={videoType?.SmartTipz}
													onChange={(e) => _HandleVideoTypeFilter(e)}

												/>
												<span className="ml-2">SmartTipz</span>
											</label>
										</td>
									</tr>
									<tr>
										<td className="border-t-0 w-max space-x-3 px-3 align-middle border-l-0 border-r-0 h-11 text-xs whitespace-wrap  p-2 text-left flex items-center">
											<label className="inline-flex items-center">
												<span className="">Rating</span>
											</label>
										</td>
										<td className="border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap">
											{displayRatingStars()}
											{/* <Rating
												value={rating}
												edit={true}
												onChange={_HandleChangeRating}
												isHalf={false}
												size={18}
											/> */}
										</td>
										<td className="border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap">
											<button
												onClick={_HandleClearRating}
												type="button"
												className="mt-3 w-full inline-flex justify-center hover:underline  px-4 py-2 text-base font-medium text  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
											>
												Clear
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default NewsFeedFilters;
