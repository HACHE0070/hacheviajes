import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './pages/App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL || (import.meta.env.MODE === 'production' ? '/hacheviajes' : '/') }>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
