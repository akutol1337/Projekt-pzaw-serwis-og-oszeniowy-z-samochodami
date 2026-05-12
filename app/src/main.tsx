import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from '@/contexts/AuthContext'
import { ListingsProvider } from '@/contexts/ListingsContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import { ToastProvider } from '@/contexts/ToastContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ToastProvider>
        <AuthProvider>
          <ListingsProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </ListingsProvider>
        </AuthProvider>
      </ToastProvider>
    </HashRouter>
  </StrictMode>,
)
