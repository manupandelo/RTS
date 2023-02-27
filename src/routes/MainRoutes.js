import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout/index';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default/index')));

// utilities routing
const Sistema= Loadable(lazy(() => import('../views/utilities/Sistema')));
const Subsistema = Loadable(lazy(() => import('../views/utilities/Subsistema')));
const Tag = Loadable(lazy(() => import('../views/utilities/Tag')));
const Tarea = Loadable(lazy(() => import('../views/utilities/Tarea')));
const Registro = Loadable(lazy(() => import('../views/utilities/Registro')));
const AgregarProyecto = Loadable(lazy(() => import('../views/other/AgregarProyecto')));
const AgregarSistema = Loadable(lazy(() => import('../views/other/AgregarSistema')));
const AgregarSubsistema = Loadable(lazy(() => import('../views/other/AgregarSubsistema')));
const AgregarTag = Loadable(lazy(() => import('../views/other/AgregarTag')));
const AgregarTarea = Loadable(lazy(() => import('../views/other/AgregarTarea')));
const AgregarEspecialidad = Loadable(lazy(() => import('../views/other/AgregarEspecialidad')));
const AgregarTipo = Loadable(lazy(() => import('../views/other/AgregarTipo')));



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sistema',
            element: <Sistema />
        },
        {
            path: 'subsistema',
            element: <Subsistema />
        },
        {
            path: 'tag',
            element: <Tag />
        },
        {
            path: 'tarea',
            element: <Tarea />
        },
        {
            path: 'registro',
            element: <Registro />
        },
        {
            path: 'agregarproyecto',
            element: <AgregarProyecto />
        },  
        {
            path: 'agregarsistema',
            element: <AgregarSistema />
        },
        {
            path: 'agregarsubsistema',
            element: <AgregarSubsistema />
        },
        {
            path: 'agregartag',
            element: <AgregarTag />
        },
        {
            path: 'agregartarea',
            element: <AgregarTarea />
        },
        {
            path: 'agregarespecialidad',
            element: <AgregarEspecialidad />
        },
        {
            path: 'agregartipo',
            element: <AgregarTipo />
        }
    ]
};

export default MainRoutes;
