import React from 'react'
import { Button, Rating, Searchbar, Switch } from 'src/components';

const NewsFeedFilters = () => {

	let color = "light";

	return (
		<>
			<div className="flex flex-col w-full lg:w-auto">
				<div className="bg-white px-2 py-3 shadow rounded-lg">
					<div className="flex">
						<div className="mb-3 mx-auto">
							<p className="w-full  font-medium text-md">Filters</p>
						</div>
					</div>
					<div
						className={
							"relative flex flex-col min-w-0 break-words w-full rounded-lg"}
					>
						<div className="block w-full overflow-x-auto">
							{/* Projects table */}
							<table className="items-center w-full bg-transparent border-collapse">
								<thead>
									<tr>
										<th
											className={
												"px-6 align-middle  py-0 text-xs uppercase  whitespace-nowrap font-semibold text-left " +
												(color === "light"
													? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
													: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
											}
										>

										</th>
										<th
											className={
												"px-6 align-middle py-0 text-xs uppercase  whitespace-nowrap font-semibold text-left " +
												(color === "light"
													? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
													: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
											}
										>

										</th>

									</tr>
								</thead>
								<tbody>
									<tr >
										<td className="border-t-0 w-max space-x-3 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-2 text-left flex items-center">
											<label className="inline-flex items-center">
												<input type="checkbox" className="form-radio" name="accountType" value="Personal" />
												<span className="ml-2">Personal</span>
											</label>
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
											<label className="inline-flex items-center">
												<input type="checkbox" className="form-radio" name="accountType" value="Business" />
												<span className="ml-2">Business</span>
											</label>
										</td>
									</tr>
									<tr >
										<td className="border-t-0 w-max space-x-3 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-2 text-left flex items-center">

											<label className="inline-flex items-center">
												<input type="checkbox" className="form-radio" name="videoType" value="personal" />
												<span className="ml-2">Paid</span>
											</label>
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
											<label className="inline-flex items-center">
												<input type="checkbox" className="form-radio" name="videoType" value="busines" />
												<span className="ml-2">Free</span>
											</label>
										</td>
									</tr>
									<tr >
										<td className="border-t-0 w-max space-x-3 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-2 text-left flex items-center">

											<label className="inline-flex items-center">
												<input type="checkbox" className="form-radio" name="Type" value="personal" />
												<span className="ml-2">Reviews</span>
											</label>
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
											<label className="inline-flex items-center">
												<input type="checkbox" className="form-radio" name="Type" value="busines" />
												<span className="ml-2">Tips</span>
											</label>
										</td>
									</tr>
									<tr >
										<td className="border-t-0 w-max space-x-3 px-6 align-middle border-l-0 border-r-0 h-11 text-xs whitespace-wrap  p-2 text-left flex items-center">
											<label className="inline-flex items-center">
												<span className="pl-5">Rating</span>
											</label>
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap">
											<Rating
												value={0}
												edit={true}
												isHalf={false}
												size={28}
											/>
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap">
											<Button
												className="px-3 py-2 flex w-full justify-center items-center text-white  text-sm btn rounded-md "
												childrens={'Clear'} />
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NewsFeedFilters;
