import { describe, it } from 'vitest';

import { mockTmdbApiInstance } from '../../../../frameworks/apis/tmdb/__tests__/tmdb.mock';
import { getFindByImdbLink } from '../useTMDBApiGetFindByImdbLink';

describe('Test getFindByImdbLink', async () => {
  const url = 'http://www.imdb.com/title/tt0038109';
  const imdbId = 'tt0038109';
  const getFindResultsByIMDBIdRes = {};

  it('Should throw an error if imdb url is not valid', async () => {
    let error: any;

    try {
      await getFindByImdbLink('imdb.com/title/tt0038109', mockTmdbApiInstance.instance)();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });

  it('Should call with the correct args', async () => {
    await getFindByImdbLink(url, mockTmdbApiInstance.instance)();

    expect(mockTmdbApiInstance.instance.getFindResultsByIMDBId)
      .toHaveBeenCalledWith(imdbId);
  });

  it('Should retrun the correct json', async () => {
    mockTmdbApiInstance.instance.getFindResultsByIMDBId
      .mockResolvedValueOnce(getFindResultsByIMDBIdRes as any);

    const rVal = await getFindByImdbLink(url, mockTmdbApiInstance.instance)();

    expect(rVal).toBe(getFindResultsByIMDBIdRes);
  });
});
