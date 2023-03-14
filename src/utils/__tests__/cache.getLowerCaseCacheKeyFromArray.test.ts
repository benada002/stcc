import { describe, it } from 'vitest';
import { getLowerCaseCacheKeyFromArray } from '../cache';

describe('Test getLowerCaseCacheKeyFromArray', async () => {
  it('Should retrun a joined lower case string', () => {
    const rVal = getLowerCaseCacheKeyFromArray(['test', 'T']);

    expect(rVal).toBe('test.t');
  });
});
