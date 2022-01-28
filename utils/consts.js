const sequelize = require('sequelize');


export const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

export const getPagingData = (data, page, limit, name) => {
    const { count: totalVideos, rows: videos } = data;
    const currentPage = page ? + page : 0;
    const totalPages = Math.ceil(totalVideos / limit);

    return { totalVideos, videos, totalPages, currentPage };
};


const getFilterdProfilesByAccountType = (accountType) => {
    const { Personal, Business } = accountType;
    return Personal === false && Business === true
        ? 'Business'
        : Personal === true && Business === false
            ? 'Personal'
            : '';
};

const getFilterdProfilesByVideoCategory = (videoCategory) => {
    const { Paid, Free } = videoCategory;
    return Free === false && Paid === true ? 'Paid' : Paid === false && Free === true ? 'Free' : '';
};

const getFilterdProfilesByVideoType = (videoType) => {
    const { SmartReview, SmartTipz } = videoType;
    return SmartReview === false && SmartTipz === true
        ? 'SmartTipz'
        : SmartReview === true && SmartTipz === false
            ? 'SmartReview'
            : '';
};

export const FilterContent = (search, category, videoType, videoCategory, accountType, ArrayOfFollowedPeopleId) => {
    console.log('searched >>', search);
    return {
        [sequelize.Op.and]: [
            {
                '$Video.category$': {
                    [sequelize.Op.iLike]: `%${category}%`
                }
            },
            {
                [sequelize.Op.or]: [
                    {
                        '$Video->User.accountType$': {
                            [sequelize.Op.iLike]: `%${getFilterdProfilesByAccountType(accountType)}%`
                        }
                    },
                    {
                        '$Share->User.accountType$': {
                            [sequelize.Op.iLike]: `%${getFilterdProfilesByAccountType(accountType)}%`
                        }
                    },
                ]
            },
            {
                [sequelize.Op.or]: [
                    {
                        '$Video.UserId$': {
                            [sequelize.Op.in]: ArrayOfFollowedPeopleId
                        }
                    },
                    {
                        '$Share.UserId$': {
                            [sequelize.Op.in]: ArrayOfFollowedPeopleId
                        }
                    },
                ]
            },
            {
                '$Video.videoCost$': {
                    [sequelize.Op.iLike]: `%${getFilterdProfilesByVideoCategory(videoType)}`
                }
            },
            {
                '$Video.videoType$': {
                    [sequelize.Op.iLike]: `%${getFilterdProfilesByVideoType(videoCategory)}`
                }
            }
        ],
        [sequelize.Op.or]: [
            {
                '$Video->User.name$': {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                '$Video->User.email$': {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                '$Video.title$': {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                '$Share.caption$': {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                '$Video->User.username$': {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },

            {
                '$Video->User.phoneNumber$': {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                '$Share->User.name$': {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                '$Share->User.email$': {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                '$Share->User.username$': {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                '$Share->User.phoneNumber$': {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
        ],
    };
};

export const FilterProfiles = (search, accountType) => {
    console.log('searched >>', search, accountType);
    return {
        [sequelize.Op.and]: [
            {
                isDeleted: {
                    [sequelize.Op.eq]: false
                },
                isBlocked: {
                    [sequelize.Op.eq]: false
                }
            }
        ],
        [sequelize.Op.or]: [
            {
                name: {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                email: {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                username: {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                accountType: {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            },
            {
                phoneNumber: {
                    [sequelize.Op.iLike]: `%${search}%`
                }
            }
        ],
        [sequelize.Op.and]: [
            {
                accountType: {
                    [sequelize.Op.iLike]: `%${getFilterdProfilesByAccountType(accountType)}`
                }
            }
        ]
    };
};
