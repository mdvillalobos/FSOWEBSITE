import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../context/userContext.jsx'
import App from './App.jsx';
import './assets/css/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>,
)
