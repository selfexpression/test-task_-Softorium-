import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './components/App';
import { store } from './slices/index';
import reportWebVitals from './reportWebVitals';

export const runApp = () => {
  const mountNode = document.getElementById('root') as HTMLElement;
  const root = ReactDOM.createRoot(mountNode);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
};

reportWebVitals();
