import React from 'react'
import { useEffect } from 'react';
import ReactStars from 'react-rating-stars-component'

const RatingComponent = ({ value, edit, isHalf, onChange, size, classNames }) => {
    console.log('star value: ', value);

    useEffect(() => { }, [value])


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
            activeColor="#714de1"
            classNames={classNames}

        />
    )
}

export default RatingComponent
