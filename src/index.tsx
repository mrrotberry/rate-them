import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { UserContextProvider } from 'context/user';
import { CollaboratorsContextProvider } from 'context/collaborators';

import App from './App';

import 'normalize.css/normalize.css';

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <CollaboratorsContextProvider>
        <App />
      </CollaboratorsContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('SW registered');
      })
      .catch(registrationError => {
        // eslint-disable-next-line no-console
        console.log('SW registration failed: ', registrationError);
      });
  });
}
