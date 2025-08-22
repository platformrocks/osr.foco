import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from './components/ui/provider';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
