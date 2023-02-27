// assets
import { IconPlus } from '@tabler/icons';

// constant
const icons = { IconPlus };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'other',
    title: 'Nuevo',
    type: 'group',
    children: [
        {
            id: 'Agregar',
            title: 'Agregar',
            type: 'collapse',
            icon: icons.IconPlus,
            children: [
                {
                    id: 'agregarProyecto',
                    title: 'Agregar Proyecto',
                    type: 'item',
                    url: '/agregarproyecto',
                    breadcrumbs: false
                },
                {
                    id: 'agregarsistema',
                    title: 'Agregar Sistema',
                    type: 'item',
                    url: '/agregarsistema',
                    breadcrumbs: false
                },
                {
                    id: 'agregarsubsistema',
                    title: 'Agregar SubSistema',
                    type: 'item',
                    url: '/agregarsubsistema',
                    breadcrumbs: false
                },
                {
                    id: 'agregartag',
                    title: 'Agregar Tag',
                    type: 'item',
                    url: '/agregartag',
                    breadcrumbs: false
                },
                {
                    id: 'agregartarea',
                    title: 'Agregar Tarea',
                    type: 'item',
                    url: '/agregartarea',
                    breadcrumbs: false
                },
                {
                    id: 'agregarespecialidad',
                    title: 'Agregar Especialidad',
                    type: 'item',
                    url: '/agregarespecialidad',
                    breadcrumbs: false
                },
                {
                    id: 'agregartipo',
                    title: 'Agregar Tipo',
                    type: 'item',
                    url: '/agregartipo',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default other;
