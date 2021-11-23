import React from 'react'
import { Rating, Searchbar, Switch } from 'src/components';

const NewsFeedFilters = () => {

    let color = "light";

    return (
        <>
            <div className="flex flex-col w-full lg:w-auto">
                <div className="bg-white px-2 py-3 shadow rounded-lg">
                    <div className="flex">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                        </svg>
                        <div className="mb-3 mx-auto">
                            <p className="w-full  font-medium text-md font-serif">Filters</p>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-5">
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio" name="modified" value="personal" />
                            <span className="text-xs ml-2">Ascending</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio" name="modified" value="busines" />
                            <span className="text-xs ml-2">Descending</span>
                        </label>
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
                                                "px-6 align-middle  py-3 text-xs uppercase  whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        >

                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle py-3 text-xs uppercase  whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                            }
                                        >

                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle py-3 text-xs uppercase  whitespace-nowrap font-semibold text-left " +
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
                                        <td className="border-t-0 w-max space-x-3 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-4 text-left flex items-center">

                                            <label className="inline-flex items-center">
                                                <input type="radio" className="form-radio" name="accountType" value="personal" />
                                                <span className="ml-2">Personal</span>
                                            </label>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <label className="inline-flex items-center">
                                                <input type="radio" className="form-radio" name="accountType" value="busines" />
                                                <span className="ml-2">Business</span>
                                            </label>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <label className="inline-flex items-center">
                                                <input type="radio" className="form-radio" name="accountType" value="busines" />
                                                <span className="ml-2">All</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="border-t-0 w-max space-x-3 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-4 text-left flex items-center">

                                            <label className="inline-flex items-center">
                                                <input type="radio" className="form-radio" name="videoType" value="personal" />
                                                <span className="ml-2">Paid</span>
                                            </label>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <label className="inline-flex items-center">
                                                <input type="radio" className="form-radio" name="videoType" value="busines" />
                                                <span className="ml-2">Free</span>
                                            </label>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <label className="inline-flex items-center">
                                                <input type="radio" className="form-radio" name="videoType" value="busines" />
                                                <span className="ml-2">All</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="border-t-0 w-max space-x-3 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-4 text-left flex items-center">

                                            <label className="inline-flex items-center">
                                                <input type="radio" className="form-radio" name="Type" value="personal" />
                                                <span className="ml-2">Reviews</span>
                                            </label>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <label className="inline-flex items-center">
                                                <input type="radio" className="form-radio" name="Type" value="busines" />
                                                <span className="ml-2">Tips</span>
                                            </label>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <label className="inline-flex items-center">
                                                <input type="radio" className="form-radio" name="Type" value="busines" />
                                                <span className="ml-2">All</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td className="border-t-0 w-max space-x-3 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap  p-4 text-left flex items-center">

                                            <label className="inline-flex items-center">
                                                <span className="pl-5">Rating</span>
                                            </label>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <Rating
                                                value={0}
                                                edit={true}
                                                isHalf={true}
                                            />
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <label className="inline-flex items-center">
                                                <input type="radio" className="form-radio" name="Type" value="busines" />
                                                <span className="ml-2">All</span>
                                            </label>
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
