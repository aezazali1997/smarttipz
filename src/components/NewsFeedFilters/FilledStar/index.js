import React, { useEffect } from 'react';
import EMPTY from '../../../../public/Empty.svg'
const FilledStar = ({ _HandleClick, _index, _hover, _setHover, _rating }) => {
  return <span onClick={_HandleClick}>
    <svg
      className={`w-4 h-4  cursor-pointer ${_index <= (_hover || _rating) ? 'filled' : 'empty'}`}
      onMouseEnter={() => _setHover(_index)}
      onMouseLeave={() => {
        _setHover(_rating);
      }}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
     	<path className="st0" d="M16,6.6c-0.2,0.5-0.7,0.8-1,1.1c-0.9,0.8-1.8,1.5-2.6,2.3c-0.1,0.1-0.1,0.1-0.1,0.2c0.3,1.4,0.7,2.9,1,4.3
		c0.1,0.4,0,0.7-0.3,0.9c-0.3,0.2-0.6,0.2-1,0c-1.3-0.8-2.5-1.5-3.8-2.3c-0.1-0.1-0.2-0.1-0.3,0c-1.3,0.8-2.5,1.5-3.8,2.3
		c-0.6,0.3-1.2,0-1.3-0.5c0-0.2,0-0.3,0-0.5c0.3-1.4,0.7-2.9,1-4.3c0-0.1,0-0.2-0.1-0.3C2.5,9,1.4,8,0.3,7.1C0,6.8-0.1,6.5,0,6.1
		c0.1-0.4,0.4-0.6,0.8-0.6c0.8-0.1,1.5-0.1,2.3-0.2c0.7-0.1,1.5-0.1,2.2-0.2c0.1,0,0.1-0.1,0.2-0.2C6,3.6,6.6,2.3,7.2,0.9
		C7.3,0.6,7.6,0.3,8,0.3c0.4,0,0.7,0.2,0.8,0.6c0.6,1.3,1.1,2.7,1.7,4c0.1,0.2,0.2,0.2,0.3,0.2c1.5,0.1,2.9,0.3,4.4,0.4
		c0.4,0,0.6,0.3,0.8,0.7c0,0,0,0,0,0C16,6.4,16,6.5,16,6.6z"/>
    </svg>
  </span>;
};
export default FilledStar;
