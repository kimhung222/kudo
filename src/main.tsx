import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/auth.context'
import { ErrorPage } from './pages/Error'
import { GreetingPage } from './pages/Greeting'
import { KudoPage } from './pages/Kudo'
import { HomePage } from './pages/Home/Home'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { routePaths } from './libs/routePaths'

const router = createBrowserRouter([
  {
    path: routePaths.home,
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  { path: routePaths.greeting, element: <GreetingPage />, errorElement: <ErrorPage /> },
  { path: routePaths.kudo, element: <KudoPage />, errorElement: <ErrorPage /> },
])

const mountPoint = document.querySelector('#root') as HTMLElement
ReactDOM.createRoot(mountPoint).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
)
