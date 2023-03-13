import ky from 'ky';
import type { KyInstance } from 'ky/distribution/types/ky';

import type { ITMDBApi } from './types/interface';
import type { GetFindList } from './types/findTypes';
import type { GetConfiguration } from './types/configurationTypes';
import { TMDB_API_KEY, TMDB_API_PREFIX_URL } from '../../../constants';

export class NetzkinoApi implements ITMDBApi {
  private apiInstance: KyInstance;

  constructor(apiKey?: string) {
    this.apiInstance = ky.create({
      prefixUrl: TMDB_API_PREFIX_URL,
      searchParams: {
        api_key: apiKey || TMDB_API_KEY,
      },
    });
  }

  public getApi(): KyInstance {
    return this.apiInstance;
  }

  public getConfiguration(): Promise<GetConfiguration> {
    return this.getApi().get(
      'configuration',
    ).json<GetConfiguration>();
  }

  public getFindResultsByIMDBId(imdbId: string): Promise<GetFindList> {
    return this.getApi().get(
      `find/${imdbId}`,
      {
        searchParams: {
          external_source: 'imdb_id',
        },
      },
    ).json<GetFindList>();
  }
}

export default new NetzkinoApi();
