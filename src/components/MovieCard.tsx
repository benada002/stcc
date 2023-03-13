import { Card, Skeleton } from 'antd';
import path from 'path-browserify';
import { useMemo } from 'react';

import { SearchItem } from '../frameworks/apis/netzkino/types/searchTypes';
import { useTMDBApiGetFindByImdbLink } from '../hooks/api/tmdbApi/useTMDBApiGetFindByImdbLink';

type MovieCardProps = {
  movie: SearchItem
  imgBasePath?: string | null
};

export function MovieCard({ movie, imgBasePath }: MovieCardProps) {
  const hasValidBasePath = typeof imgBasePath === 'string' && imgBasePath !== '';
  const movieQuery = useTMDBApiGetFindByImdbLink(movie.custom_fields['IMDb-Link'][0], typeof imgBasePath === 'string' && imgBasePath !== '');
  const posterPath = movieQuery.data?.movie_results?.[0]?.poster_path;

  const hasValidPosterPath = typeof posterPath === 'string' && posterPath !== '';
  const posterUrl = useMemo(
    () => {
      try {
        if (hasValidPosterPath && hasValidBasePath) {
          const url = new URL(path.join('original', posterPath), imgBasePath);

          return url.toString();
        }

      // eslint-disable-next-line no-empty
      } catch {}

      return null;
    },
    [hasValidPosterPath, hasValidBasePath, posterPath, imgBasePath],
  );

  return (
    <Card
      hoverable={false}
      cover={(
        (movieQuery.isLoading || typeof posterUrl !== 'string' || posterUrl === '')
          ? (
            <Skeleton.Image active={movieQuery.isLoading} />
          )
          : (
            <img
              alt={`${movie.title} poster`}
              src={posterUrl}
            />
          )
      )}
    >
      <Card.Meta title={movie.title} />
    </Card>
  );
}
