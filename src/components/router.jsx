import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRouter";

export const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "/signUp", element: <SignUp/>},
    {path: "/signIn", element: <SignIn/>},
    {path: "/Dashboard", element: 
    <PrivateRoute>
        <Dashboard/>
    </PrivateRoute>},
]);