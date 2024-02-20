import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

import { App } from './components/App';
import { store } from './slices/index';
import reportWebVitals from './reportWebVitals';
import { resources } from './locales';

export const runApp = async (): Promise<void> => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

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
