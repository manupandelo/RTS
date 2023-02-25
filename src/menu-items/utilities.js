// assets
import { IconBookmark, IconListDetails, IconSubtask, IconCheckupList, IconDatabase } from '@tabler/icons';

// constant
const icons = {
    IconBookmark,
    IconListDetails,
    IconSubtask,
    IconCheckupList,
    IconDatabase
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const centrocontrol = {
    id: 'centrocontrol',
    title: 'Centro de Control',
    type: 'group',
    children: [
        {
            id: 'sistema',
            title: 'Sistema',
            type: 'item',
            url: '/sistema',
            icon: icons.IconDatabase,
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
        },
        {
            id: 'registro',
            title: 'Registro',
            type: 'item',
            icon: icons.IconCheckupList,
            url: '/registro',
            breadcrumbs: false
        }
    ]
};

export default centrocontrol;
