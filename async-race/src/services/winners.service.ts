import { getUrl } from '../utils';
import { PATHS } from '../constants';

export class WinnersService {
  public static async createWinner() {
    return fetch(getUrl(`${PATHS.WINNERS}`));
  }
}
