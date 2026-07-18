import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// @ts-ignore: side-effect import without type declarations
import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore: side-effect import without type declarations
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
