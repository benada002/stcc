import type { KyInstance } from 'ky/distribution/types/ky';
import type { GetConfiguration } from './configurationTypes';
import type { GetFindList } from './findTypes';

export interface ITMDBApi {
  getApi(): KyInstance
  getFindResultsByIMDBId(imdbId: string): Promise<GetFindList>
  getConfiguration(): Promise<GetConfiguration>
}
