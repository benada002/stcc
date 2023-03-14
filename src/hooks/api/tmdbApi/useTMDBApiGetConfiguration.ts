import { useQuery } from '@tanstack/react-query';

import tmdbApiInstance from '../../../frameworks/apis/tmdb/tmdbApi';
import { ITMDBApi } from '../../../frameworks/apis/tmdb/types/interface';
import { TMDB_CACHE_KEY } from './constants';
import { getLowerCaseCacheKeyFromArray } from '../../../utils/cache';

export const getConfiguration = (
  apiClassInstance: ITMDBApi,
) => () => apiClassInstance.getConfiguration();

export const useTMDBApiGetConfiguration = () => useQuery({
  queryKey: [TMDB_CACHE_KEY, 'getConfiguration'],
  queryFn: getConfiguration(tmdbApiInstance),
  queryKeyHashFn: getLowerCaseCacheKeyFromArray,
});
