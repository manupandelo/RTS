import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout/index';
import Loadable from '../ui-component/Loadable';

// utilities routing
const Sistema= Loadable(lazy(() => import('../views/utilities/Sistema')));
const Subsistema = Loadable(lazy(() => import('../views/utilities/Subsistema')));
const Tag = Loadable(lazy(() => import('../views/utilities/Tag')));
const Tarea = Loadable(lazy(() => import('../views/utilities/Tarea')));
const AgregarProyecto = Loadable(lazy(() => import('../views/other/AgregarProyecto')));
const AgregarSistema = Loadable(lazy(() => import('../views/other/AgregarSistema')));
const AgregarSubsistema = Loadable(lazy(() => import('../views/other/AgregarSubsistema')));
const AgregarTag = Loadable(lazy(() => import('../views/other/AgregarTag')));
const AgregarTarea = Loadable(lazy(() => import('../views/other/AgregarTarea')));
const AgregarEspecialidad = Loadable(lazy(() => import('../views/other/AgregarEspecialidad')));
const AgregarTipo = Loadable(lazy(() => import('../views/other/AgregarTipo')));
const Home = Loadable(lazy(() => import('../views/other/Home')));

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/sistema',
                    element: <Sistema />
                },
                {
                    path: '/subsistema',
                    element: <Subsistema />
                },
                {
                    path: '/tag',
                    element: <Tag />
                },
                {
                    path: '/tarea',
                    element: <Tarea />
                },
                {
                    path: '/agregar/proyecto',
                    element: <AgregarProyecto />
                },  
                {
                    path: '/agregar/sistema',
                    element: <AgregarSistema />
                },
                {
                    path: '/agregar/subsistema',
                    element: <AgregarSubsistema />
                },
                {
                    path: '/agregar/tag',
                    element: <AgregarTag />
                },
                {
                    path: '/agregar/tarea',
                    element: <AgregarTarea />
                },
                {
                    path: '/agregar/especialidad',
                    element: <AgregarEspecialidad />
                },
                {
                    path: '/agregar/tipo',
                    element: <AgregarTipo />
                }
            ]
        }
    ]);
}
