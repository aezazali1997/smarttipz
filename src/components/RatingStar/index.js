import React from 'react'
import ReactStars from 'react-rating-stars-component'

const Rating = ({ value, edit, isHalf, onChange, size, classNames }) => {
    return (
        <ReactStars
            count={5}
            value={value}
            size={size || 16}
            edit={edit}
            isHalf={isHalf}
            onChange={onChange}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#714de1"
            classNames={classNames}

        />
    )
}

export default Rating
