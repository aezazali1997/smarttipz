/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import videos from '../../utils/VdeoSchema.json';
import { Card } from '../../components';
const Videos = () => {

    const [filterdVideos, setFilterVideos] = useState([]);
    const [Videos, setVideos] = useState([]);
    const [filter, setFilter] = useState('all');


    useEffect(() => {
        setVideos(videos);
        setFilterVideos(videos);
    }, [])

    let _ChangeFilter = (e) => {
        const { value } = e.target;
        // console.log('value: ', value);
        let FilteredVideos =
            value === 'all' ? Videos : Videos.filter(video => video.category === value && (video));
        // console.log('filtered: ', FilteredVideos);
        setFilter(value);
        setFilterVideos(FilteredVideos)
    }

    return (
        <div className="flex flex-col h-screen w-full p-5 space-y-1">
            {/*SEO Support*/}
            <Helmet>
                <title>Videos | Smart Tipz</title>
            </Helmet>
            {/*SEO Support End */}
            <div className="flex items-center space-x-2">
                <div className="flex h-10 justify-center text-md text-black font-sans"> Categories:</div>
                <div className={`floating-input mb-5 relative z-0`}>
                    <select
                        type='select'
                        id='videos'
                        name='videos'
                        value={filter}
                        className='border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-52 px-2 py-3 h-12 cursor-pointer'
                        onChange={_ChangeFilter}
                        placeholder="name@example.com"
                    >
                        <option value="all">All</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-500 pointer-events-none" width="19.524" height="19.524" viewBox="0 0 19.524 19.524">
                            <path id="Icon_ionic-ios-arrow-dropdown-circle" data-name="Icon ionic-ios-arrow-dropdown-circle" d="M3.375,13.137a9.762,9.762,0,0,0,19.524,0c0-3.656-5.248-8.658-5.248-8.658a16.252,16.252,0,0,0-4.514-1.1A9.76,9.76,0,0,0,3.375,13.137ZM16.943,11.1s.929-.352,1.281,0a.9.9,0,0,1,.263.638.91.91,0,0,1-.268.643l-4.426,4.412a.9.9,0,0,1-1.248-.028L8.054,12.287a.906.906,0,0,1,1.281-1.281l3.806,3.844Z" transform="translate(-3.375 -3.375)" fill="#6d6d6d" />
                        </svg>

                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {
                    filterdVideos.map(({ title, image, like, comment, share }) => (
                        <Card
                            image={image}
                            title={title}
                            comment={comment}
                            like={like}
                            share={share}
                            views={250}
                            rating={5}
                            disclaimer={true}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Videos;
