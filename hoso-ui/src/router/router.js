import {
    createBrowserRouter,
    Navigate
} from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import Task from "../page/Task";
import Workflow from "../page/Workflow";
import Department from "../page/Department";
import Login from "../page/auth/Login";
import Signup from "../page/auth/Signup";
import Account from "../page/Account";

import ValidateAccountProvider from "./validateAccountProvider";
import ProtectedRoute from "./ProtectedRoute"


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <ProtectedRoute><Home /></ProtectedRoute>,
            },
            {
                path: 'account',
                element: <ProtectedRoute><Account /></ProtectedRoute>
            },
            {
                path: 'task',
                element: <ProtectedRoute><Task /></ProtectedRoute>
            },
            {
                path: 'workflow',
                element: <ProtectedRoute><Workflow /></ProtectedRoute>
            },
            {
                path: 'department',
                element: <ProtectedRoute><Department /></ProtectedRoute>
            },
            {
                path: 'login',
                element: <ValidateAccountProvider><Login /></ValidateAccountProvider>,
            },
            {
                path: 'signup',
                element: <ValidateAccountProvider><Signup /></ValidateAccountProvider>
            },
            {
                path: '*',
                element: <Navigate to={'/'} />
            }
        ]

    },

])
export default router;