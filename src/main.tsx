import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/auth.context'
import { ErrorPage } from './pages/Error'
import { GreetingPage } from './pages/Greeting'
import { KudoPage } from './pages/Kudo'
import { HomePage } from './pages'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  { path: '/greeting', element: <GreetingPage />, errorElement: <ErrorPage /> },
  { path: '/kudo', element: <KudoPage />, errorElement: <ErrorPage /> },
])

const mountPoint = document.querySelector('#root') as HTMLElement
ReactDOM.createRoot(mountPoint).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
)
