import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { TMDB_API_KEY } from '../../../constants';
import tmdbApiInstance from '../../../frameworks/apis/tmdb/tmdbApi';
import { ITMDBApi } from '../../../frameworks/apis/tmdb/types/interface';

const getFindByImdbLink = (imdbLink: string, apiClassInstance: ITMDBApi) => () => {
  const imdbUrl = new URL(imdbLink);
  const imdbPathArray = imdbUrl.pathname.split('/');
  const imdbId = imdbPathArray[imdbPathArray.length - 1];

  return apiClassInstance.getFindResultsByIMDBId(imdbId);
};

export const useTMDBApiGetFindByImdbLink = (imdbLink: string, enabled?: boolean) => {
  const getFindByImdbLinkCb = useCallback(
    getFindByImdbLink(imdbLink, tmdbApiInstance),
    [imdbLink, tmdbApiInstance],
  );

  return useQuery({
    queryKey: [TMDB_API_KEY, 'findByImdbLink', imdbLink],
    queryFn: getFindByImdbLinkCb,
    enabled: typeof imdbLink === 'string' && imdbLink !== '' && enabled,
  });
};
