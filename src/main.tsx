import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  QueryClient,
} from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { compress, decompress } from 'lz-string';

import App from './App';

import 'antd/dist/reset.css';
import './index.css';
import { CACHE_MAX_AGE } from './constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: CACHE_MAX_AGE,
      retry: 2,
      retryDelay: 5000,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  serialize: (data) => compress(JSON.stringify(data)),
  deserialize: (data) => JSON.parse(decompress(data)),
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: localStoragePersister,
      }}
    >
      <App />
    </PersistQueryClientProvider>
  </React.StrictMode>,
);
