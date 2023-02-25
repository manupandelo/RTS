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
const Agregar = Loadable(lazy(() => import('../views/utilities/Agregar')));



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
            path: 'agregar',
            element: <Agregar />
        }
    ]
};

export default MainRoutes;
