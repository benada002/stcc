import type { KyInstance } from 'ky/distribution/types/ky';

import type { GetSearchList } from './searchTypes';

export interface INetzkinoApi {
  getApi(): KyInstance
  getSearchResults(searchQuery: string): Promise<GetSearchList>
}
