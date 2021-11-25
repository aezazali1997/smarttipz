import React from 'react'

const SortFilter = ({ value, setSort }) => {
    return (
        <div className="flex flex-col w-full lg:w-auto">
            <div className="bg-white px-2 py-3 shadow rounded-lg">
                <div className="mb-3 flex items-center justify-center w-full">
                    <p className="font-medium text-md ">Sort</p>
                </div>
                <div className="flex justify-around space-x-5">
                    <label className="inline-flex items-center">
                        <input type="radio" className="form-radio" name="ASC" value='ASC'
                            checked={value === 'ASC'}
                            color="714de1"
                            onChange={(e) => setSort(e.target.value)}
                        />
                        <span className="text-xs ml-2">Ascending</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input type="radio" className="form-radio" name="DESC" value='DESC'
                            checked={value === 'DESC'}
                            color="714de1"
                            onChange={(e) => { setSort(e.target.value) }}
                        />
                        <span className="text-xs ml-2">Descending</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default SortFilter;
