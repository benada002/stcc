import { vi } from 'vitest';
import { mockKyInstance } from '../../../../mocks/ky/KyInstanceMock';
import { getDeepMockInstanceHelper } from '../../../../tests/utils/getDeepMockInstanceHelper';
import { TMDBApi } from '../tmdbApi';

export const mockTmdbApiInstance = getDeepMockInstanceHelper<TMDBApi>();
export const tmdbApiWithMockedKyInstance = new TMDBApi() as unknown as Omit<TMDBApi, 'getApi'> & {
  getApi: () => typeof mockKyInstance['instance']
};

tmdbApiWithMockedKyInstance.getApi = vi.fn().mockReturnValue(mockKyInstance.instance);
