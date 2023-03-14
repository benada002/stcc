import { describe, it, vi } from 'vitest';
import { tmdbApiWithMockedKyInstance } from './tmdb.mock';

describe('Test getFindResultsByIMDBId', async () => {
  const json = {};
  const jsonFn = vi.fn().mockResolvedValue(json);

  tmdbApiWithMockedKyInstance.getApi().get.mockReturnValue({
    json: jsonFn,
  } as any);

  it('Should be called with the correct args', () => {
    const path = 'configuration';

    tmdbApiWithMockedKyInstance.getConfiguration();

    expect(tmdbApiWithMockedKyInstance.getApi().get.mock.calls[0][0]).toBe(path);
  });

  it('Should retrun the correct json', async () => {
    const rVal = await tmdbApiWithMockedKyInstance.getConfiguration();

    expect(rVal).toBe(json);
  });
});
