// assets
import { IconBookmark, IconListDetails, IconSubtask, IconCheckupList, IconDatabase, IconFolder, IconBrandStackoverflow, IconCircleLetterA } from '@tabler/icons';

// constant
const icons = {
    IconFolder,
    IconBookmark,
    IconListDetails,
    IconSubtask,
    IconCheckupList,
    IconDatabase,
    IconBrandStackoverflow,
    IconCircleLetterA
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const centrocontrol = {
    id: 'centrocontrol',
    title: 'Centro de Control',
    type: 'group',
    children: [
        {
            id: 'proyecto',
            title: 'Proyecto',
            type: 'item',
            url: '/proyecto',
            icon: icons.IconFolder,
            breadcrumbs: false
        },
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
            id: 'especialidad',
            title: 'Especialidad',
            icon: icons.IconBrandStackoverflow,
            type: 'item',
            url: '/especialidad',
            breadcrumbs: false
        },
        {
            id: 'avance',
            title: 'Avance',
            icon: icons.IconCircleLetterA,
            type: 'item',
            url: '/avance',
            breadcrumbs: false
        },
    ]
};

export default centrocontrol;
