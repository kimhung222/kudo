import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/auth.context'
import { ErrorPage } from './pages/Error'
import { GreetingPage } from './pages/Greeting'
import { KudoPage } from './pages/Kudo'
import { HomePage } from './pages'
import { GMLayout } from "./components/Layout/GMLayout";

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AdminDashboard } from "./pages/AdminDashboard";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <ErrorPage/>,
  },
  { path: '/greeting', element: <GreetingPage/>, errorElement: <ErrorPage/> },
  { path: '/kudo', element: <KudoPage/>, errorElement: <ErrorPage/> },
  {
    path: '/admin-dashboard',
    element: <GMLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/admin-dashboard/', element: <AdminDashboard/>
      }
    ]
  },
])

const mountPoint = document.querySelector('#root') as HTMLElement
ReactDOM.createRoot(mountPoint).render(
  <AuthProvider>
    <RouterProvider router={ router }/>
  </AuthProvider>,
)
