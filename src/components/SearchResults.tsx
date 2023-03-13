import {
  Col,
  Empty,
  Row,
  Spin,
} from 'antd';

import { useNetzkinoApiGetSearch } from '../hooks/api/netzkinoApi/useNetzkinoApiGetSearch';
import { useTMDBApiGetConfiguration } from '../hooks/api/tmdbApi/useTMDBApiGetConfiguration';
import { MovieCard } from './MovieCard';

type SearchResultsProps = {
  searchQuery?: string
};

export function SearchResults({ searchQuery }: SearchResultsProps) {
  const tmdbConfigQuery = useTMDBApiGetConfiguration();
  const searchResult = useNetzkinoApiGetSearch(
    searchQuery as string,
    typeof searchQuery === 'string' || searchQuery !== '',
  );

  if (typeof searchQuery !== 'string' || searchQuery === '') {
    return (
      <Empty
        description="Please, type a movie name..."
      />
    );
  }

  if (searchResult.isLoading || tmdbConfigQuery.isLoading) {
    return <Spin size="large" />;
  }

  if (
    !searchResult.data?.posts
    || !Array.isArray(searchResult.data.posts)
    || searchResult.data.posts.length < 1
  ) {
    return (
      <Empty
        description="No movies found for your search"
      />
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {searchResult.data.posts.map((movie) => (
        <Col
          key={movie.id}
          className="gutter-row"
          xs={24}
          sm={12}
          md={8}
          lg={6}
        >
          <MovieCard
            movie={movie}
            imgBasePath={tmdbConfigQuery.data?.images?.base_url}
          />
        </Col>
      ))}
    </Row>
  );
}
