import { CarResponse, FetchMethods } from '../types';
import { PATHS } from '../constants';
import { getUrl } from '../utils';

export class GarageService {
  public static async getCars(page = '1', limit = '7'): Promise<CarResponse[]> {
    const response: Response = await fetch(
      getUrl(`${PATHS.GARAGE}`, [
        ['_page', page],
        ['_limit', limit],
      ])
    );

    const data: CarResponse[] = await response.json();

    return data;
  }

  public static async getCar(id: number = 1): Promise<CarResponse> {
    const response: Response = await fetch(getUrl(`${PATHS.GARAGE}/${id}`));

    const data: CarResponse = await response.json();

    return data;
  }

  public static async createCar({ name, color }: Omit<CarResponse, 'id'>) {
    const response: Response = await fetch(getUrl(`${PATHS.GARAGE}`), {
      method: FetchMethods.Post,
      body: JSON.stringify({ name, color }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: CarResponse = await response.json();

    return data;
  }

  public static async deleteCar(id: number) {
    const response = await fetch(getUrl(`${PATHS.GARAGE}/${id}`), {
      method: FetchMethods.Delete,
    });

    const data = await response.json();

    return data;
  }

  public static async updateCar(id: number, { name, color }: Omit<CarResponse, 'id'>) {
    const response: Response = await fetch(getUrl(`${PATHS.GARAGE}/${id}`), {
      method: FetchMethods.Put,
      body: JSON.stringify({ name, color }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: CarResponse = await response.json();

    return data;
  }
}
