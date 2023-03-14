import { UseQueryResult } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import {
  describe, it, Mock, vi,
} from 'vitest';
import { GetFindList } from '../../../frameworks/apis/tmdb/types/findTypes';
import { useTMDBApiGetFindByImdbLink } from '../../../hooks/api/tmdbApi/useTMDBApiGetFindByImdbLink';

import { MovieCard } from '../index';

vi.mock('../../../hooks/api/tmdbApi/useTMDBApiGetFindByImdbLink');

const useTMDBApiGetFindByImdbLinkMock = useTMDBApiGetFindByImdbLink as
Mock<[string], UseQueryResult<GetFindList, unknown>>;

describe('Test MovieCard', () => {
  it('Should render loading skel if loading', () => {
    useTMDBApiGetFindByImdbLinkMock.mockReturnValue({
      isLoading: true,
    } as any);

    // @ts-expect-error
    const { container } = render(<MovieCard />);

    expect(container.querySelectorAll('div.ant-skeleton.ant-skeleton-active')).toHaveLength(1);
  });

  it('Should render skel but no animation if not loading but there is no poster url', () => {
    useTMDBApiGetFindByImdbLinkMock.mockReturnValue({
      isLoading: false,
    } as any);

    // @ts-expect-error
    const { container } = render(<MovieCard />);

    const conEle = container.querySelectorAll('div.ant-skeleton');

    expect(conEle).toHaveLength(1);
    expect(conEle[0].classList.contains('ant-skeleton-active')).toBe(false);
  });

  it('Should render card with img if everything is good', () => {
    useTMDBApiGetFindByImdbLinkMock.mockReturnValue({
      isLoading: false,
      data: {
        movie_results: [
          {
            poster_path: '/st-logo-white.png',
          },
        ],
      },
    } as any);

    const { container } = render(<MovieCard
      imgBasePath="https://www.simpletechs.net/wp-content/uploads/2019/01/"
      movie={{
        title: 'test title',
      } as any}
    />);

    const conEle = container.querySelectorAll('div.ant-skeleton');
    const img = container.querySelector('div.ant-card-cover img');

    expect(conEle).toHaveLength(0);
    expect((img as any)?.src).toBe('https://www.simpletechs.net/wp-content/uploads/2019/01/original/st-logo-white.png');
    expect(screen.getByText('test title')).toBeInTheDocument();
  });
});
