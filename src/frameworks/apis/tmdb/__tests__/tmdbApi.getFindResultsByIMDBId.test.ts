import { describe, it, vi } from 'vitest';
import { tmdbApiWithMockedKyInstance } from './tmdb.mock';

describe('Test getFindResultsByIMDBId', async () => {
  const json = {};
  const jsonFn = vi.fn().mockResolvedValue(json);

  tmdbApiWithMockedKyInstance.getApi().get.mockReturnValue({
    json: jsonFn,
  } as any);

  it('Should be called with the correct args', () => {
    const imdbId = 'tttest';
    const path = `find/${imdbId}`;

    tmdbApiWithMockedKyInstance.getFindResultsByIMDBId(imdbId);

    expect(tmdbApiWithMockedKyInstance.getApi().get.mock.calls[0][0]).toBe(path);
    expect(tmdbApiWithMockedKyInstance.getApi().get.mock.calls[0][1]).toEqual({
      searchParams: expect.objectContaining({
        external_source: 'imdb_id',
      }),
    });
  });

  it('Should retrun the correct json', async () => {
    const rVal = await tmdbApiWithMockedKyInstance.getFindResultsByIMDBId('');

    expect(rVal).toBe(json);
  });
});
