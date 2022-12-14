import {
  faCog,
  faComment,
  faNewspaper,
  faPlayCircle,
  faStar,
  faDollarSign,
  faUserCircle,
  faHeart,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Routes = [
  // {
  //     name: 'News Feed',
  //     path: '/dashboard/news-feed',
  //     badge: false,
  //     icon: (<FontAwesomeIcon icon={faNewspaper} />)
  // },
  {
    name: 'Profile',
    path: '/dashboard/profile',
    badge: false,
    icon: <FontAwesomeIcon icon={faUserCircle} />
  },
  {
    name: 'Videos',
    path: '/dashboard/videos',
    badge: false,
    icon: <FontAwesomeIcon icon={faPlayCircle} />
  },
  {
    name: 'Favourites',
    path: '/dashboard/favourites',
    badge: false,
    icon: <FontAwesomeIcon icon={faHeart} />
    // faStar
  },
  {
    name: 'Messages',
    path: '/dashboard/messages',
    badge: false,
    icon: <FontAwesomeIcon icon={faComment} />
  },
  {
    name: 'Settings',
    path: '/dashboard/setting',
    badge: false,
    icon: <FontAwesomeIcon icon={faCog} />
  },
  {
    name: 'Wallet',
    path: '/dashboard/wallet',
    badge: false,
    icon: <FontAwesomeIcon icon={faDollarSign} />
  }
];

export const NavbarRoutes = [
  {
    name: 'News Feed',
    path: '/dashboard/news-feed',
    badge: false,
    icon: <FontAwesomeIcon icon={faNewspaper} />
  },
  {
    name: 'Messages',
    path: '/dashboard/messages',
    badge: false,
    icon: <FontAwesomeIcon icon={faComment} />
  }
];

export const DropdownRoutes = [
  {
    name: 'Privacy Policy',
    path: '/privacy-policy'
  },
  {
    name: 'Terms & Conditions',
    path: '/terms-and-conditions'
  },
  {
    name: 'Copyrights Reserved',
    path: '/copyrights'
  },
  {
    name: 'Trademark License',
    path: '/trademark-license'
  }
];
