import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UsersRoute from '@/routes/users'
import UserDetailsRoute from './routes/user-details'
import { Toaster } from './components/ui/toaster'
import AddUserRoute from './routes/add-user'

function App() {
  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <UsersRoute />,
    },
    {
      path: '/users/:userId',
      element: <UserDetailsRoute />,
    },
    {
      path: '/users/new',
      element: <AddUserRoute />,
    },
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
