import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { TMDB_API_KEY } from '../../../constants';
import tmdbApiInstance from '../../../frameworks/apis/tmdb/tmdbApi';
import { ITMDBApi } from '../../../frameworks/apis/tmdb/types/interface';

const getConfiguration = (apiClassInstance: ITMDBApi) => () => apiClassInstance.getConfiguration();

export const useTMDBApiGetConfiguration = () => {
  const getFindByImdbLinkCb = useCallback(
    getConfiguration(tmdbApiInstance),
    [tmdbApiInstance],
  );

  return useQuery({
    queryKey: [TMDB_API_KEY, 'getConfiguration'],
    queryFn: getFindByImdbLinkCb,
    cacheTime: 1000 * 60 * 60 * 24 * 2, // 2 days
  });
};
