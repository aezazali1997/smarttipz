import Image from 'next/image';
import EmptyImg from '../../public/Empty.svg';
import HalfImg from '../../public/HalfStar.svg';
import FilledImg from '../../public/FullStar.svg';
import topUp from '../../public/Top-up.svg';
import virtualwallet from '../../public/Virtual-Wallet.svg';
import Withdraw from '../../public/Withdraw.svg';
import user from '../../public/user.svg';
import lock from '../../public/lock.svg';
export const Email = ({ className }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );
};

export const CloseEye = ({ className }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
        clipRule="evenodd"
      />
      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
    </svg>
  );
};
export const OpenEye = ({ className }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
      <path
        fillRule="evenodd"
        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const User = ({ className }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  );
};

export const PhoneSVG = ({ className }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
};

export const GlobeSVG = ({ className }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const KeySVG = ({ className }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
};
export const UserSVG = () => {
  return (
    <span className="flex relative h-6 w-6 text-gray-500">
    <Image className='text-gray-500'  src={user} layout="fill" objectFit="cover" alt="Virtaul Wallet" property="true" />
  </span>
  );
};
export const IBANSVG = () => {
  return (
    <span className="flex relative h-6 w-6 text-gray-500">
    <Image className='text-gray-500'  src={lock} layout="fill" objectFit="cover" alt="Virtaul Wallet" property="true" />
  </span>
  );
};

export const LinkSVG = ({ className }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const SearchSVG = ({ className }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const EmptyStar = () => (
  <span className="flex relative w-3 h-3">
    <Image src={EmptyImg} layout="fill" objectFit="cover" alt="Empty Star" priority={true} />
  </span>
);
export const FilledStar = () => (
  <span className="flex relative w-3 h-3">
    <Image src={FilledImg} layout="fill" objectFit="cover" alt="Filled Star" priority={true} />
  </span>
);
export const HalfStar = () => (
  <span className="flex relative w-3 h-3">
    <Image src={HalfImg} layout="fill" objectFit="cover" alt="Half Star" priority={true} />
  </span>
);
export const Wallet = () => (
  <span className="flex relative sm:w-16 sm:h-16 mr-3 w-12 h-12">
    <Image src={virtualwallet} layout="fill" objectFit="cover" alt="Virtaul Wallet" property="true" />
  </span>
);
export const WithDraw = () => (
  <span className="flex relative sm:w-8 sm:h-8 mr-3 h-6 w-6">
    <Image src={Withdraw} layout="fill"  objectFit="cover" alt="Virtaul Wallet" property="true" />
  </span>
);
export const TopUp = () => (
  <span className="flex relative sm:w-8 sm:h-8 mr-3 h-6 w-6">
    <Image src={topUp} layout="fill" objectFit="cover" alt="Virtaul Wallet" property="true" />
  </span>
);
