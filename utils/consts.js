
const sequelize = require('sequelize');


export const FilterContent = (search) => {
    console.log("searched >>", search);
    return {
        [sequelize.Op.and]: [
            {
                isApproved: {
                    [sequelize.Op.eq]: true
                },
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
        }
        ]

    }
}