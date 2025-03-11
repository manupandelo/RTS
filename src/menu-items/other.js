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
                    title: 'Proyecto',
                    type: 'item',
                    url: '/agregar/proyecto',
                    breadcrumbs: false
                },
                {
                    id: 'agregarsistema',
                    title: 'Sistema',
                    type: 'item',
                    url: '/agregar/sistema',
                    breadcrumbs: false
                },
                {
                    id: 'agregarsubsistema',
                    title: 'SubSistema',
                    type: 'item',
                    url: '/agregar/subsistema',
                    breadcrumbs: false
                },
                {
                    id: 'agregartag',
                    title: 'Tag',
                    type: 'item',
                    url: '/agregar/tag',
                    breadcrumbs: false
                },
                {
                    id: 'agregarespecialidad',
                    title: 'Especialidad',
                    type: 'item',
                    url: '/agregar/especialidad',
                    breadcrumbs: false
                },
                {
                    id: 'agregartipo',
                    title: 'Tipo',
                    type: 'item',
                    url: '/agregar/tipo',
                    breadcrumbs: false
                },
                {
                    id: 'agregartarea',
                    title: 'Tarea',
                    type: 'item',
                    url: '/agregar/tarea',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default other;
