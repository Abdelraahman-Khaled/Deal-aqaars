import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FinishingProvider } from './contexts/FinishingContext'
import { PropertyProvider } from './contexts/PropertyContext'
import { BuildingProvider } from './contexts/BuildingContext'
import { LandProvider } from './contexts/LandContext'
import { FactoryProvider } from './contexts/FactoryContext'
import ToastContainerApp from './Components/ToastContainerApp/ToastContainerApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FinishingProvider>
      <PropertyProvider>
        <BuildingProvider>
          <LandProvider>
            <FactoryProvider>
              <App />
            </FactoryProvider>
          </LandProvider>
        </BuildingProvider>
      </PropertyProvider>
    </FinishingProvider>
    <ToastContainerApp />
  </StrictMode>,
)
