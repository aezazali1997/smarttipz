import React from 'react'
import { isEmpty } from 'lodash'
import { EmptyStar, FilledStar, HalfStar } from 'src/assets/SVGs';


const CustomStar = ({ value, edit, isHalf, onChange, size, classNames }) => {
  let avgRating = value;
  if (avgRating !== undefined) {
    if (avgRating === 0) {
      avgRating = parseFloat(avgRating).toFixed(2);
    }
    const hasDecimal = String(avgRating).split('.');
    const firstSplittedValue = parseInt(hasDecimal[0]);
    const secondSplittedValue = hasDecimal[1];
    const emptyStars =
      parseInt(secondSplittedValue) > 0 ? 5 - (firstSplittedValue + 1) : 5 - (firstSplittedValue + 0);
    if (!isEmpty(secondSplittedValue)) emptyStars - 1;
    return (
      <>
        {[...Array(firstSplittedValue)].map((val, index) => (
          <FilledStar key={index} />
        ))}
        {!isEmpty(secondSplittedValue) && parseInt(secondSplittedValue) > 0 && <HalfStar />}
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

export default CustomStar
