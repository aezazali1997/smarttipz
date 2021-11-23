import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/APIs/axiosInstance';
import { GenericFilters, NewsFeedFilters } from 'src/components';

const Search = () => {

    const [posts, setPosts] = useState([]);
    const [catalogueCount, setCatalogueCount] = useState(0);

    let GetPosts = async () => {
        try {
            const { data: { data: { videos } } } = await axiosInstance.getNewsFeedPosts();
            setPosts(videos);
            console.log(videos)
            var count = 0;
            for (let i = 0; i < videos.length; i++) {
                if (videos[i].catalogue === true && videos[i].UserId == parseInt(localStorage.getItem('id'))) {
                    count = count + 1;
                }
            }
            setCatalogueCount(count)
        }
        catch ({ response: { data: { message } } }) {
            console.log(message);
        }
    }

    useEffect(() => {
        GetPosts();
    }, [])


    return (
        <div className="min-h-screen flex bg-gray-100 py-5 px-3">
            <div className="w-full lg:w-4/6 h-full">

            </div>
            <div className="w-full lg:w-2/6 space-y-4">
                <div className="mx-auto">
                    <GenericFilters />
                </div>
                <div className="mx-auto">
                    <NewsFeedFilters />
                </div>
            </div>

        </div>
    )
}

export default Search;
