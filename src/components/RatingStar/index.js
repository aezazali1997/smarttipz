import React from 'react'
import ReactStars from 'react-rating-stars-component'

const RatingComponent = ({ value, edit, isHalf, onChange, size, classNames }) => {

    return (
        <ReactStars
            count={5}
            value={value}
            size={size || 16}
            edit={edit}
            isHalf={isHalf}
            onChange={(value) => onChange(value)}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#f8b93b"
            classNames={classNames}

        />
    )
}

export default RatingComponent
