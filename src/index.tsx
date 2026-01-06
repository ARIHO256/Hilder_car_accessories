import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './contexts/CartContext';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container missing. Please check public/index.html');
}
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
