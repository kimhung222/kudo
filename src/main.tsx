import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './components/Layout'
import { ErrorPage, GreetingPage, KudoPage } from './pages'
import { AuthProvider } from './context/auth.context'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/greeting', element: <GreetingPage /> },
      { path: '/kudo', element: <KudoPage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
)
