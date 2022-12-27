import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/auth.context'
import { ErrorPage } from './pages/Error'
import { GreetingPage } from './pages/Greeting'
import { KudoPage } from './pages/Kudo'
import { HomePage } from './pages/Home/Home'
import { routePaths } from './libs/routePaths'
import { GMLayout } from './components/Layout/GMLayout'
import { AdminDashboard } from './pages/AdminDashboard'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { MyMemories } from './pages/Memories/MyMemories'
import { TechiesMemories } from './pages/Memories/TechiesMemories/TechiesMemories'

const router = createBrowserRouter([
  {
    path: routePaths.home,
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  { path: routePaths.greeting, element: <GreetingPage />, errorElement: <ErrorPage /> },
  { path: routePaths.kudo, element: <KudoPage />, errorElement: <ErrorPage /> },
  { path: routePaths.myMemories, element: <MyMemories />, errorElement: <ErrorPage /> },
  { path: routePaths.techiesMemories, element: <TechiesMemories />, errorElement: <ErrorPage /> },
  {
    path: routePaths.adminDashboard,
    element: <GMLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/admin-dashboard/',
        element: <AdminDashboard />,
      },
    ],
  },
])

const mountPoint = document.querySelector('#root') as HTMLElement
ReactDOM.createRoot(mountPoint).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
)
