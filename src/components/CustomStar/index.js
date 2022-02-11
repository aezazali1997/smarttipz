import React from 'react'
import ReactStars from 'react-rating-stars-component'

const CustomStar = ({ value, edit, isHalf, onChange, size, classNames }) => {
    let avgRating=value;
    // return (
    //     <ReactStars
    //         count={5}
    //         value={value}
    //         size={size || 16}
    //         edit={edit}
    //         isHalf={isHalf}
    //         onChange={(value) => onChange(value)}
    //         emptyIcon={<i className="far fa-star"></i>}
    //         halfIcon={<i className="fa fa-star-half-alt"></i>}
    //         fullIcon={<i className="fa fa-star"></i>}
    //         activeColor="#f8b93b"
    //         classNames={classNames}

    //     />
    // )
     
    
    if (avgRating !== undefined) {
      if (avgRating === 0) {
        avgRating = parseFloat(avgRating).toFixed(2);
      }
      const hasDecimal = String(avgRating).split('.');
      const firstSplittedValue = parseInt(hasDecimal[0]);
      const secondSplittedValue = hasDecimal[1];
      const emptyStars =
        parseInt(secondSplittedValue) > 0 ? 5 - (firstSplittedValue + 1) : 5 - (firstSplittedValue + 0);
      if (!_.isEmpty(secondSplittedValue)) emptyStars - 1;
      return (
        <>
          {[...Array(firstSplittedValue)].map((val, index) => (
            <FilledStar key={index} />
          ))}
          {!_.isEmpty(secondSplittedValue) && parseInt(secondSplittedValue) > 0 && <HalfStar />}
          {[...Array(emptyStars)].map((val, index) => (
            <EmptyStar key={index} />
          ))}
        </>
      );
    }
    else {
      return <></>
    }
}
 const EmptyStar = () => (
    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
  const FilledStar = () => (
    <svg className="w-4 h-4 text" fill="#f8b93b" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
  const HalfStar = () => (
    <ReactStars
      count={1}
      value={0.5}
      size={18}
      edit={false}
      isHalf={true}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      activeColor="#f8b93b"
    />
  );
export default CustomStar
