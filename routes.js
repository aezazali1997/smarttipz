import { faCog, faComment, faNewspaper, faPlayCircle, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Routes = [
    {
        name: 'News Feed',
        path: '/dashboard/news-feed',
        badge: false,
        icon: (<FontAwesomeIcon icon={faNewspaper} />)
    },
    {
        name: 'Profile',
        path: '/dashboard/profile',
        badge: false,
        icon: (<FontAwesomeIcon icon={faUserCircle} />)
    },
    {
        name: 'Videos',
        path: '/dashboard/videos',
        badge: false,
        icon: (<FontAwesomeIcon icon={faPlayCircle} />)
    },
    {
        name: 'Messages',
        path: '/dashboard/messages',
        badge: false,
        icon: (<FontAwesomeIcon icon={faComment} />)
    },
    {
        name: 'Settings',
        path: '/dashboard/setting',
        badge: false,
        icon: (<FontAwesomeIcon icon={faCog} />)
    }
]

export const DropdownRoutes = [
    {
        name: 'Privacy Policy',
        path: '/privacy-policy',
    },
    {
        name: 'Terms & Conditions',
        path: '/terms-and-conditions',
    },
    {
        name: 'Copyrights Reserved',
        path: '/copyrights',
    },
    {
        name: 'Trademark License',
        path: '/trademark-license',
    }
]