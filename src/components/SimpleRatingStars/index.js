import Rating from 'react-simple-star-rating'

const SimpleRatingStars = ({ size, value, onChange }) => {
    return (
        <Rating
            onClick={(value) => onChange(value)}
            stars={5}
            ratingValue={value}
            size={size || 16}
            transition
            fillColor='#714de1'
            emptyColor='gray'
        />
    )
}

export default SimpleRatingStars;