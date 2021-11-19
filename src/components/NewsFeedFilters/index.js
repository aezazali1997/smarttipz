import React from 'react'
import { Rating, Searchbar, Switch } from 'src/components';

const NewsFeedFilters = () => {
    return (
        <>
            <div className="flex flex-col">
                <div className="bg-white px-2 py-3 shadow rounded-lg">
                    <div className="flex">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                        </svg>
                        <div className="mb-3 mx-auto">
                            <p className="w-full  font-medium text-md font-serif">Filters</p>
                        </div>
                    </div>
                    <div className="h-full flex flex-col space-y-2 px-6">
                        <div className="flex justify-between">
                            <p>All</p>
                            <Switch />
                        </div>
                        <div className="flex justify-between">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="accountType" value="personal" />
                                <span className="ml-2">Personal</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input type="radio" className="form-radio" name="accountType" value="busines" />
                                <span className="ml-2">Business</span>
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="accountType" value="personal" />
                                <span className="ml-2">Ascending</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input type="radio" className="form-radio" name="accountType" value="busines" />
                                <span className="ml-2">Descending</span>
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="accountType" value="personal" />
                                <span className="ml-2">Paid</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input type="radio" className="form-radio" name="accountType" value="busines" />
                                <span className="ml-2">Free</span>
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="accountType" value="personal" />
                                <span className="ml-2">Tips</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input type="radio" className="form-radio" name="accountType" value="busines" />
                                <span className="ml-2">Reviews</span>
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <p>Rating</p>
                            <Rating
                                value={0}
                                edit={true}
                                isHalf={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsFeedFilters;
