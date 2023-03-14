// eslint-disable-next-line import/no-extraneous-dependencies
import { mockDeep, mockReset } from 'vitest-mock-extended';

export const getDeepMockInstanceHelper = <T> () => {
  const mockInstance = mockDeep<T>();

  return {
    instance: mockInstance,
    resetMock: () => mockReset(mockInstance),
  };
};
