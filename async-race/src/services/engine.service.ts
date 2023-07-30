import { DriveResponse, EngineSpecs, EngineStatus, FetchMethods } from '../types';
import { getUrl } from '../utils';
import { PATHS } from '../constants';

export class EngineService {
  public static async start(id: number): Promise<EngineSpecs> {
    const response: Response = await fetch(
      getUrl(`${PATHS.ENGINE}`, [
        ['id', `${id}`],
        ['status', EngineStatus.Start],
      ]),
      {
        method: FetchMethods.Patch,
      }
    );

    const data: EngineSpecs = await response.json();

    return data;
  }

  public static async stop(id: number): Promise<Response> {
    return fetch(
      getUrl(`${PATHS.ENGINE}`, [
        ['id', `${id}`],
        ['status', EngineStatus.Stop],
      ]),
      {
        method: FetchMethods.Patch,
      }
    );
  }

  public static async drive(id: number): Promise<DriveResponse> {
    try {
      const response: Response = await fetch(
        getUrl(`${PATHS.ENGINE}`, [
          ['id', `${id}`],
          ['status', EngineStatus.Drive],
        ]),
        {
          method: FetchMethods.Patch,
        }
      );

      const data: DriveResponse = await response.json();

      return data;
    } catch {
      return {
        success: false,
      };
    }
  }
}
