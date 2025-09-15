import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FinishingProvider } from './contexts/FinishingContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FinishingProvider>
      <App />
    </FinishingProvider>
  </StrictMode>,
)
