// ** React imports
import { lazy } from 'react'

// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'

// ** GetRoutes
import { DefaultRoute } from './routes'
import AccountLayout from '../pages/account/AccountLayout'
const LogIn = lazy(() => import('../pages/account/LogIn'))
const SignUp = lazy(() => import('../pages/account/SignUp'))

const Router = () => {
  const getHomeRoute = () => {
    return DefaultRoute
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    {
      path: '/signup',
      element: <AccountLayout />,
      children: [{ path: '*', element: <SignUp /> }],
    },
    {
      path: '/login',
      element: <AccountLayout />,
      children: [{ path: '*', element: <LogIn /> }],
    },
  ])
  return routes
}

export default Router
