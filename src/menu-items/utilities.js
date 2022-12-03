// assets
import { IconBookmark, IconListDetails, IconSubtask  } from '@tabler/icons';

// constant
const icons = {
    IconBookmark,
    IconListDetails,
    IconSubtask
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'sistema',
            title: 'Sistema',
            type: 'item',
            url: '/sistema',
            icon: icons.System,
            breadcrumbs: false
        },
        {
            id: 'subsistema',
            title: 'Subsistema',
            type: 'item',
            url: '/subsistema',
            icon: icons.IconSubtask,
            breadcrumbs: false
        },
        {
            id: 'tag',
            title: 'Tag',
            type: 'item',
            url: '/tag',
            icon: icons.IconBookmark,
            breadcrumbs: false
        },
        {
            id: 'tarea',
            title: 'Tarea',
            type: 'item',
            icon: icons.IconListDetails,
            url: '/tarea',
            breadcrumbs: false
        }
    ]
};

export default utilities;
