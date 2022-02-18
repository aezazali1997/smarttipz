const sequelize = require('sequelize');

export const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

export const getPagingData = (data, page, limit, videosCount) => {
  // console.log('data: ', data, page, limit);
  // const { count: totalVideos, rows: videos } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(videosCount / limit);
  return { totalVideos: videosCount, totalPages, currentPage };
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

const getVideoByRating = (rating) => {
  return Number(rating) === 0
    ? {
        [sequelize.Op.gte]: rating
      }
    : {
        [sequelize.Op.eq]: rating
      };
};

export const FilterContent = (
  search,
  category,
  videoType,
  videoCategory,
  accountType,
  ArrayOfFollowedPeopleId,
  rating
) => {
  return {
    [sequelize.Op.and]: [
      {
        '$Video.category$': {
          [sequelize.Op.iLike]: `%${category}%`
        }
      },
          {
            '$Video.UserId$': {
              [sequelize.Op.in]: ArrayOfFollowedPeopleId
            }
        
        
      },
  
          {
            '$Video->User.accountType$': {
              [sequelize.Op.iLike]: `%${getFilterdProfilesByAccountType(accountType)}%`
            }
        
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
      },
      {
        '$Video.rating$': getVideoByRating(rating)
      },
       {
            '$Video.isApproved$': {
              [sequelize.Op.eq]: true
            }
          },
          {
            isShared:{
              [sequelize.Op.eq]:false
            }
          }
    ],
    [sequelize.Op.or]: [
      {
        '$Video.title$': {
          [sequelize.Op.iLike]: `%${search}%` 
        }
      },
      //       {
      //   '$Video.title$': {
      //     [sequelize.Op.iLike]: `%${search}%` 
      //   }
      // },

      {
        '$Video->User.name$': {
          [sequelize.Op.iLike]: `%${search}%`
        }
      },
    ]
  }
}
export const FilterSearchContent = (
  search,
  category,
  videoType,
  videoCategory,
  accountType,
  ArrayOfFollowedPeopleId,
  rating
) => {
  return {
    [sequelize.Op.and]: [
      {
        '$Video.category$': {
          [sequelize.Op.iLike]: `%${category}%`
        }
      },
          {
            '$Video.UserId$': {
              [sequelize.Op.in]: ArrayOfFollowedPeopleId
            }
        
        
      },
  
          {
            '$Video->User.accountType$': {
              [sequelize.Op.iLike]: `%${getFilterdProfilesByAccountType(accountType)}%`
            }
        
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
      },
      {
        '$Video.rating$': getVideoByRating(rating)
      },
       {
            '$Video.isApproved$': {
              [sequelize.Op.eq]: true
            }
          },
          {
            isShared:{
              [sequelize.Op.eq]:false
            }
          }
    ],
    [sequelize.Op.or]: [
      {
        '$Video.title$': {
          [sequelize.Op.iLike]: `${search}` 
        }
      },
      //       {
      //   '$Video.title$': {
      //     [sequelize.Op.iLike]: `%${search}%` 
      //   }
      // },

      {
        '$Video->User.name$': {
          [sequelize.Op.iLike]: `%${search}%`
        }
      },
    ]
  }
}

export const FilterProfiles = (search, accountType, rate) => {
  rate = Number(rate);
  return {
    [sequelize.Op.and]: [
      {
        isDeleted: {
          [sequelize.Op.eq]: false
        }
      },
      {
        isBlocked: {
          [sequelize.Op.eq]: false
        }
      },
      {
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
        ]
      },
      {
        [sequelize.Op.and]: [
          {
            accountType: {
              [sequelize.Op.iLike]: `%${getFilterdProfilesByAccountType(accountType)}`
            }
          }
        ]
      },
      {
        [sequelize.Op.and]: [
          {
            avgRating: {
              [sequelize.Op.gte]: rate
              // Math.floor(rate)
            }
          },
          {
            avgRating: {
              [sequelize.Op.lte]: rate + 1
              // Math.ceil(rate)
            }
          }
        ]
      }
    ]
  };
};
