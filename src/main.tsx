import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Toaster } from 'sileo'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
      <Toaster
        position="top-right"
        options={{
          fill: "#171717",
          roundness: 16,
          styles: {
            title: "text-white!",
            description: "text-white/75!",
            badge: "bg-white/10!",
            button: "bg-white/10! hover:bg-white/15!",
          },
        }}
      />
      <TanStackDevtools config={{ hideUntilHover: true }} plugins={[formDevtoolsPlugin()]} />
    </StrictMode>,
  )
}
