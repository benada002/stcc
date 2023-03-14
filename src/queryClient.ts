import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { CACHE_MAX_AGE } from './constants';

export const queryCache = new QueryCache();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: CACHE_MAX_AGE,
      staleTime: CACHE_MAX_AGE,
      retry: 2,
      retryDelay: 5000,
    },
  },
  queryCache,
});

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
