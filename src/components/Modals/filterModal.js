/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Modal } from 'src/components';
import Button from '../Button';
import GenericFilters from '../GenericFilters';
import NewsFeedFilters from '../NewsFeedFilters';
import SortFilter from '../SortFilter';

const FilterModal = ({
    sort,
    rating,
    account,
    setSort,
    category,
    _HandleClear,
    videoType,
    modalTitle,
    videoCategory,
    ToggleFilterModal,
    activeGenericFilter,
    _HandleChangeRating,
    _ChangeCategoryFilter,
    _HandleVideoTypeFilter,
    _HandleAccountTypeFilter,
    _HandleVideoCategoryFilter,
    _HandleActiveGenericFilter,
}) => {
    return (
        <>
            <Modal
                _Toggle={ToggleFilterModal}
                title={modalTitle}
                body={
                    <div>
                        <div className="space-y-4 justify-center flex-col items-center h-96 overflow-y-auto">
                            <GenericFilters
                                _HandleActiveGenericFilter={_HandleActiveGenericFilter}
                                activeGenericFilter={activeGenericFilter}
                                category={category}
                                _ChangeCategoryFilter={_ChangeCategoryFilter}
                            />
                            <SortFilter value={sort} setSort={setSort} />
                            <NewsFeedFilters
                                rating={rating}
                                account={account}
                                videoType={videoType}
                                videoCategory={videoCategory}
                                _HandleClear={_HandleClear}
                                _HandleChangeRating={_HandleChangeRating}
                                _HandleVideoTypeFilter={_HandleVideoTypeFilter}
                                _HandleAccountTypeFilter={_HandleAccountTypeFilter}
                                _HandleVideoCategoryFilter={_HandleVideoCategoryFilter}
                            />
                        </div>
                    </div>
                }
                footer={
                    <>
                        <Button
                            onSubmit={ToggleFilterModal}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border-none px-4 py-2 btn text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            childrens={'Done'}
                        />
                    </>
                }
            />
        </>
    );
};

export default FilterModal;
