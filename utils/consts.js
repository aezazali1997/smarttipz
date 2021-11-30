
const sequelize = require('sequelize');


export const FilterContent = (search, category) => {
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
export const FilterProfiles = (search) => {
    console.log("searched >>", search);
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
        ]

    }
}