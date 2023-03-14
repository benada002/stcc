import { describe, it } from 'vitest';
import { mockTmdbApiInstance } from '../../../../frameworks/apis/tmdb/__tests__/tmdb.mock';
import { getConfiguration } from '../useTMDBApiGetConfiguration';

describe('Test getConfiguration', async () => {
  const getConfigurationRes = {};
  const getConfigurationCl = getConfiguration(mockTmdbApiInstance.instance);

  mockTmdbApiInstance.instance.getConfiguration.mockResolvedValue(getConfigurationRes as any);

  it('Should retrun the correct json', async () => {
    const rVal = await getConfigurationCl();

    expect(rVal).toBe(getConfigurationRes);
  });
});
