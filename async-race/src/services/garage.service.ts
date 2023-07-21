import { ICar, FetchMethods, GetCarsResponse } from '../types';
import { PATHS } from '../constants';
import { getUrl } from '../utils';

export class GarageService {
  public static async getCars(page = '1', limit = '7'): Promise<GetCarsResponse> {
    const response: Response = await fetch(
      getUrl(`${PATHS.GARAGE}`, [
        ['_page', page],
        ['_limit', limit],
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

  public static async createCar({ name, color }: Omit<ICar, 'id'>) {
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

  public static async deleteCar(id: number) {
    const response = await fetch(getUrl(`${PATHS.GARAGE}/${id}`), {
      method: FetchMethods.Delete,
    });

    const data = await response.json();

    return data;
  }

  public static async updateCar(id: number, { name, color }: Omit<ICar, 'id'>) {
    const response: Response = await fetch(getUrl(`${PATHS.GARAGE}/${id}`), {
      method: FetchMethods.Put,
      body: JSON.stringify({ name, color }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ICar = await response.json();

    return data;
  }
}
