import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import netzkinoApiInstance from '../../../frameworks/apis/netzkino/netzkinoApi';
import { INetzkinoApi } from '../../../frameworks/apis/netzkino/types/interface';
import { NETZKINO_CACHE_KEY } from './constants';

const getSearch = (searchQuery: string, apiClassInstance: INetzkinoApi) => () => apiClassInstance
  .getSearchResults(searchQuery);

export const useNetzkinoApiGetSearch = (searchQuery: string, enabled?: boolean) => {
  const getSearchCb = useCallback(
    getSearch(searchQuery, netzkinoApiInstance),
    [searchQuery, netzkinoApiInstance],
  );

  return useQuery({
    queryKey: [NETZKINO_CACHE_KEY, 'search', searchQuery],
    queryFn: getSearchCb,
    enabled: typeof searchQuery === 'string' && searchQuery !== '' && enabled,
  });
};
