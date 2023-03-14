import { useQuery } from '@tanstack/react-query';

import tmdbApiInstance from '../../../frameworks/apis/tmdb/tmdbApi';
import { ITMDBApi } from '../../../frameworks/apis/tmdb/types/interface';
import { TMDB_CACHE_KEY } from './constants';
import { getLowerCaseCacheKeyFromArray } from '../../../utils/cache';

export const getFindByImdbLink = (imdbLink: string, apiClassInstance: ITMDBApi) => () => {
  const imdbUrl = new URL(imdbLink);
  const imdbPathArray = imdbUrl.pathname.split('/');
  const imdbId = imdbPathArray[imdbPathArray.length - 1];

  return apiClassInstance.getFindResultsByIMDBId(imdbId);
};

export const useTMDBApiGetFindByImdbLink = (imdbLink: string) => useQuery({
  queryKey: [TMDB_CACHE_KEY, 'getFindByImdbLink', imdbLink],
  queryFn: getFindByImdbLink(imdbLink, tmdbApiInstance),
  queryKeyHashFn: getLowerCaseCacheKeyFromArray,
});
