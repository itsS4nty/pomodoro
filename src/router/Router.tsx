import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TimerPage from '../pages/TimerPage';
import NotFound from '../pages/NotFound';
import SettingsPage from '../pages/SettingsPage';
import PomodorosPage from '../pages/PomodorosPage';

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <TimerPage />,
        },
        {
            path: '/settings',
            element: <SettingsPage />,
        },
        {
            path: '/pomodoros',
            element: <PomodorosPage />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]);
    return <RouterProvider router={router} />;
};

export default Router;
