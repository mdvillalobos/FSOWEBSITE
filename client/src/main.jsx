import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/css/Index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from '../context/userContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>,
)
