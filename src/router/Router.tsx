import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import TimerPage from '../pages/TimerPage';
import NotFound from '../pages/NotFound';
import SettingsPage from '../pages/SettingsPage';

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
            element: (
                <span>
                    Pomodoros<Link to='/'>Back</Link>
                </span>
            ),
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]);
    return <RouterProvider router={router} />;
};

export default Router;
