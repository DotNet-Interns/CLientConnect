import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import UserProvider from "./Contexts/User.jsx"
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
  </StrictMode>,
)
