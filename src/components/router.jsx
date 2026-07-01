import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Dashboard from "./Dashboard";
import UserProfile from "../features/UserProfile/UserProfile";
import PrivateRoute from "./PrivateRouter";

export const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "/signUp", element: <SignUp/>},
    {path: "/signIn", element: <SignIn/>},
    {path: "/Dashboard", element: 
    <PrivateRoute>
        <Dashboard/>
    </PrivateRoute>},
    {path: "/profile", element:
    <PrivateRoute>
        <UserProfile/>
    </PrivateRoute>},
]);