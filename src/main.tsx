import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import { CACHE_MAX_AGE } from './constants';
import {
  queryClient,
  persister,
} from './queryClient';

import 'antd/dist/reset.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: CACHE_MAX_AGE,
      }}
    >
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </PersistQueryClientProvider>
  </React.StrictMode>,
);
