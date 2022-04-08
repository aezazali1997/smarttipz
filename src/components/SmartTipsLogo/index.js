import React from 'react';
import Image from 'next/image';
const SmartTipzLogo = React.forwardRef(({ href }, ref) => {
  return (
    <a href={href} ref={ref}>
      <span>
        <div className="relative w-36 h-full flex items-center">
          <Image
            src="https://smart-tipz-data-bucket.s3.ap-southeast-1.amazonaws.com/public/logo.svg"
            alt="brand"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </span>
    </a>
  );
});
export default SmartTipzLogo;
