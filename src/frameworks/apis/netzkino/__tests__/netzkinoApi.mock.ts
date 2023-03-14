import { vi } from 'vitest';
import { mockKyInstance } from '../../../../mocks/ky/KyInstanceMock';
import { getDeepMockInstanceHelper } from '../../../../tests/utils/getDeepMockInstanceHelper';
import { NetzkinoApi } from '../netzkinoApi';

export const mockNkApiInstance = getDeepMockInstanceHelper<NetzkinoApi>();
export const nkApiWithMockedKyInstance = new NetzkinoApi() as unknown as Omit<NetzkinoApi, 'getApi'> & {
  getApi: () => typeof mockKyInstance['instance']
};

nkApiWithMockedKyInstance.getApi = vi.fn().mockReturnValue(mockKyInstance.instance);
