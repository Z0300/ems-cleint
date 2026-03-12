import { RouterProvider } from '@tanstack/react-router'
import { AuthProvider, useAuth } from './components/auth/auth'
import { router } from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/global/theme-provider'

const queryClient = new QueryClient()

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme='light' storageKey='ems-ui-theme'>
          <InnerApp />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
