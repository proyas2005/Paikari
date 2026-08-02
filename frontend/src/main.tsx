import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// @ts-ignore: side-effect import without type declarations
import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore: side-effect import without type declarations
import './styles/index.css';
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
    
  </React.StrictMode>
);
