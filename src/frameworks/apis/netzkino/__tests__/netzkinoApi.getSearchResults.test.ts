import { describe, it, vi } from 'vitest';
import { nkApiWithMockedKyInstance } from './netzkinoApi.mock';

describe('Test getSearchResults', async () => {
  const json = {};
  const jsonFn = vi.fn().mockResolvedValue(json);

  nkApiWithMockedKyInstance.getApi().get.mockReturnValue({
    json: jsonFn,
  } as any);

  it('Should be called with the correct args', () => {
    const searchQuery = 'search';

    nkApiWithMockedKyInstance.getSearchResults(searchQuery);

    expect(nkApiWithMockedKyInstance.getApi().get.mock.calls[0][0]).toBe(searchQuery);
    expect(nkApiWithMockedKyInstance.getApi().get.mock.calls[0][1]).toEqual({
      searchParams: expect.objectContaining({
        q: searchQuery,
      }),
    });
  });

  it('Should retrun the correct json', async () => {
    const rVal = await nkApiWithMockedKyInstance.getSearchResults('');

    expect(rVal).toBe(json);
  });
});
