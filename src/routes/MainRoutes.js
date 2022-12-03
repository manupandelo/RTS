import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout/index';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default/index')));

// utilities routing
const DataGrid = Loadable(lazy(() => import('../views/utilities/Tablas')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page/index')));

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
            element: <DataGrid />
        },
        {
            path: 'subsistema',
            element: <DataGrid />
        },
        {
            path: 'tag',
            element: <DataGrid />
        },
        {
            path: 'tarea',
            element: <DataGrid />
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
