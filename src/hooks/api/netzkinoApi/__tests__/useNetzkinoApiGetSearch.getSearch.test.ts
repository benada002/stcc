import { describe, it } from 'vitest';
import { mockNkApiInstance } from '../../../../frameworks/apis/netzkino/__tests__/netzkinoApi.mock';
import { getSearch } from '../useNetzkinoApiGetSearch';

describe('Test getSearch', async () => {
  const searchQuery = 'test';
  const getSearchResultsRes = {};
  const getSearchCl = getSearch(searchQuery, mockNkApiInstance.instance);

  mockNkApiInstance.instance.getSearchResults.mockResolvedValue(getSearchResultsRes as any);

  it('Should call with the correct args', async () => {
    await getSearchCl();

    expect(mockNkApiInstance.instance.getSearchResults)
      .toHaveBeenCalledWith(searchQuery);
  });

  it('Should retrun the correct json', async () => {
    const rVal = await getSearchCl();

    expect(rVal).toBe(getSearchResultsRes);
  });
});
