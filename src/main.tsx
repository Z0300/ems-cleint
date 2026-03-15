import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'
import { Toaster } from './components/ui/sonner'

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
      <Toaster position='top-right' richColors />
      <TanStackDevtools config={{ hideUntilHover: true }} plugins={[formDevtoolsPlugin()]} />
    </StrictMode>,
  )
}
