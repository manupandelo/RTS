import { IconBookmark, IconListDetails, IconSubtask, IconCheckupList, IconDatabase, IconFolder } from '@tabler/icons';

// constant
const icons = {
    IconFolder,
    IconBookmark,
    IconListDetails,
    IconSubtask,
    IconCheckupList,
    IconDatabase
};

//

const pendientes = {
    id: 'pendientes',
    title: 'Pendientes',
    type: 'group',
    children: [
        {
            id: 'tag',
            title: 'Tag',
            type: 'item',
            url: '/tagspendientes',
            icon: icons.IconBookmark,
            breadcrumbs: false
        },
        {
            id: 'tarea',
            title: 'Tarea',
            type: 'item',
            icon: icons.IconListDetails,
            url: '/tareaspendientes',
            breadcrumbs: false
        }
    ]
};

export default pendientes