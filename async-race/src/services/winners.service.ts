import { getUrl } from '../utils';
import { PATHS, WINNERS_LIMIT } from '../constants';
import { CarWinner, FetchMethods, GetWinnersResponse } from '../types';

export class WinnersService {
  public static async createWinner(winner: CarWinner): Promise<void> {
    await fetch(getUrl(`${PATHS.WINNERS}`), {
      method: FetchMethods.Post,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  }

  public static async updateWinner({ id, time, wins }: CarWinner): Promise<void> {
    await fetch(getUrl(`${PATHS.WINNERS}/${id}`), {
      method: FetchMethods.Put,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wins, time }),
    });
  }

  public static async getWinner(id: number): Promise<CarWinner | null> {
    const response: Response = await fetch(getUrl(`${PATHS.WINNERS}/${id}`));

    if (response.status === 404) {
      return null;
    }

    const data: CarWinner = await response.json();

    return data;
  }

  public static async getWinners(
    page: number,
    sort: 'id' | 'wins' | 'time',
    order: 'ASC' | 'DESC'
  ): Promise<GetWinnersResponse> {
    const response: Response = await fetch(
      getUrl(`${PATHS.WINNERS}`, [
        ['_page', page.toString()],
        ['_limit', WINNERS_LIMIT.toString()],
        ['_order', order],
        ['_sort', sort],
      ])
    );

    return {
      total: Number(response.headers.get('X-Total-Count')) || 0,
      items: await response.json(),
    };
  }

  public static async deleteWinner(id: number): Promise<boolean> {
    const response: Response = await fetch(getUrl(`${PATHS.WINNERS}/${id}`), {
      method: FetchMethods.Delete,
    });

    return response.status !== 404;
  }
}
