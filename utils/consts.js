const sequelize = require('sequelize');


const getFilterdProfilesByAccountType = (accountType) => {
    const { Personal, Business } = accountType;
    return Personal === false && Business === true ? 'Business' :
        Personal === true && Business === false ? 'Personal' : ''
}

const getFilterdProfilesByVideoCategory = (videoCategory) => {
    const { Paid, Free } = videoCategory;
    return Free === false && Paid === true ? 'Paid' :
        Paid === false && Free === true ? 'Free' : ''
}

const getFilterdProfilesByVideoType = (videoType) => {
    const { SmartReview, SmartTipz } = videoType;
    return SmartReview === false && SmartTipz === true ? 'SmartTipz' :
        SmartReview === true && SmartTipz === false ? 'SmartReview' : ''
}


export const FilterContent = (search, category, videoType, videoCategory, accountType) => {
    console.log("searched >>", search);
    return {
        [sequelize.Op.and]: [
            {
                isApproved: {
                    [sequelize.Op.eq]: true
                },
            },
            {
                category: {
                    [sequelize.Op.iLike]: `%${category}%`,
                }
            },
            {
                '$User.accountType$': {
                    [sequelize.Op.iLike]: `%${getFilterdProfilesByAccountType(accountType)}`
                }
            },
            {
                videoCost: {
                    [sequelize.Op.iLike]: `%${getFilterdProfilesByVideoCategory(videoType)}`
                }
            },
            {
                videoType: {
                    [sequelize.Op.iLike]: `%${getFilterdProfilesByVideoType(videoCategory)}`
                }
            }
        ],
        [sequelize.Op.or]: [{
            '$User.name$': {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            '$User.email$': {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            '$User.username$': {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            '$User.accountType$': {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            '$User.phoneNumber$': {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        }
        ]

    }

}

export const FilterProfiles = (search, accountType) => {
    console.log("searched >>", search, accountType);
    return {
        [sequelize.Op.and]: [
            {
                isDeleted: {
                    [sequelize.Op.eq]: false
                },
                isBlocked: {
                    [sequelize.Op.eq]: false
                },
            },
        ],
        [sequelize.Op.or]: [{
            name: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            email: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            username: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            accountType: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            phoneNumber: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        }
        ],
        [sequelize.Op.and]: [{
            accountType: {
                [sequelize.Op.iLike]: `%${getFilterdProfilesByAccountType(accountType)}`
            }
        }]
    }
}

