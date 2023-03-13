import ky from 'ky';

import { KyInstance } from 'ky/distribution/types/ky';
import { NETZKINO_API_PREFIX_URL } from '../../../constants';
import { INetzkinoApi } from './types/interface';
import { GetSearchList } from './types/searchTypes';

export class NetzkinoApi implements INetzkinoApi {
  private apiInstance = ky.create({
    prefixUrl: NETZKINO_API_PREFIX_URL,
  });

  public getApi(): KyInstance {
    return this.apiInstance;
  }

  public getSearchResults(searchQuery: string): Promise<GetSearchList> {
    return this.getApi().get(
      'search',
      {
        searchParams: {
          q: searchQuery,
          d: 'devtest',
        },
      },
    ).json<GetSearchList>();
  }
}

export default new NetzkinoApi();
