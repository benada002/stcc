import { useQuery } from '@tanstack/react-query';

import netzkinoApiInstance from '../../../frameworks/apis/netzkino/netzkinoApi';
import { INetzkinoApi } from '../../../frameworks/apis/netzkino/types/interface';
import { NETZKINO_CACHE_KEY } from './constants';
import { getLowerCaseCacheKeyFromArray } from '../../../utils/cache';

export const getSearch = (
  searchQuery: string,
  apiClassInstance: INetzkinoApi,
) => () => apiClassInstance
  .getSearchResults(searchQuery);

export const useNetzkinoApiGetSearch = (searchQuery: string) => useQuery({
  queryKey: [NETZKINO_CACHE_KEY, 'search', searchQuery],
  queryFn: getSearch(searchQuery, netzkinoApiInstance),
  queryKeyHashFn: getLowerCaseCacheKeyFromArray,
});
