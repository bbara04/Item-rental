import { GoogleOAuthProvider } from '@react-oauth/google'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppContextProvider } from './AppContextProvider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <GoogleOAuthProvider clientId='1098748225687-4nmp7a3c4mi2hbb3d2v4o9m378arn007.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </AppContextProvider>
  </StrictMode>,
)
