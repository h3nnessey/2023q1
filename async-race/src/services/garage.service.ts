import { ICar, FetchMethods, GetCarsResponse } from '../types';
import { GARAGE_LIMIT, PATHS } from '../constants';
import { getUrl } from '../utils';

export class GarageService {
  public static async getCars(page = 1, limit = GARAGE_LIMIT): Promise<GetCarsResponse> {
    const response: Response = await fetch(
      getUrl(`${PATHS.GARAGE}`, [
        ['_page', page.toString()],
        ['_limit', limit.toString()],
      ])
    );

    return {
      total: Number(response.headers.get('X-Total-Count')) || 0,
      items: await response.json(),
    };
  }

  public static async getCar(id: number = 1): Promise<ICar> {
    const response: Response = await fetch(getUrl(`${PATHS.GARAGE}/${id}`));

    const data: ICar = await response.json();

    return data;
  }

  public static async createCar({ name, color }: Omit<ICar, 'id'>): Promise<ICar> {
    const response: Response = await fetch(getUrl(`${PATHS.GARAGE}`), {
      method: FetchMethods.Post,
      body: JSON.stringify({ name, color }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ICar = await response.json();

    return data;
  }

  public static async deleteCar(id: number): Promise<void> {
    await fetch(getUrl(`${PATHS.GARAGE}/${id}`), {
      method: FetchMethods.Delete,
    });
  }

  public static async updateCar(id: number, { name, color }: Omit<ICar, 'id'>): Promise<void> {
    await fetch(getUrl(`${PATHS.GARAGE}/${id}`), {
      method: FetchMethods.Put,
      body: JSON.stringify({ name, color }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
