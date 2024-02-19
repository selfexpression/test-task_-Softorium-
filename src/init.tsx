import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/App';
import reportWebVitals from './reportWebVitals';

export const runApp = () => {
  const mountNode = document.getElementById('root') as HTMLElement;
  const root = ReactDOM.createRoot(mountNode);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

reportWebVitals();
