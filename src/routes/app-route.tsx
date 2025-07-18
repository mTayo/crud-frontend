import { lazy } from 'react';
import HomePageLayout from 'Layout/HomeLayout';
import AuthLayout from 'Layout/AuthLayout';
import Loadable from 'components/common/Loadable';
import AppProvider from 'appconfig/providers/AppProvider';
import { Navigate } from 'react-router-dom';


// ===========================||  ROUTING ||=========================== //

const HomePage = Loadable(lazy(() => import("pages/Home")));
// Auth
const SignInPage = Loadable(lazy(() => import("pages/Login")));
const RegisterPage = Loadable(lazy(() => import("pages/Register")));


export const AuthRoutes = {
  path: "/auth",
  element:<AuthLayout />,
  children: [
    {
        path: '/auth/sign-in',
        element: <SignInPage />,
    },
    {
        path: '/auth/register',
        element: <RegisterPage />,
    }
  ],
};

export const HomeRoutes = {
  path: "/",
  element:(
    <AppProvider>
      <HomePageLayout />
    </AppProvider>
  ),
  children: [

    {
        path: '/',
        element: <Navigate to="/auth/sign-in" replace />
    },
    {
        path: '/home',
        element: <HomePage />,
    },
    
  ],
};