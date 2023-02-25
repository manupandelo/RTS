// assets
import { IconPlus } from '@tabler/icons';

// constant
const icons = { IconPlus };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'other',
    type: 'group',
    children: [
        {
            id: 'agregar',
            title: 'Agregar',
            type: 'item',
            url: '/agregar',
            icon: icons.IconPlus,
            breadcrumbs: false
        },
    ]
};

export default other;
