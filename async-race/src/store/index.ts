import type { CarWinner, GetCarsResponse, GetWinnersResponse, ICar, SortType, SortOrder } from '../types';
import { GarageService } from '../services/garage.service';
import type { Garage } from '../components/garage';
import type { Winners } from '../components/winners';
import { WinnersService } from '../services/winners.service';
import type { Modal } from '../components/modal';
import { GARAGE_LIMIT, WINNERS_LIMIT } from '../constants';

export class Store {
  public static garageCarsCount: number = 0;
  public static garageCars: ICar[] = [];
  public static garageCurrentPage: number = 1;
  public static garagePagesCount: number = 1;
  public static garage: Garage;

  public static garageResetEmitted: boolean = false;
  public static garagePaginationEmitted: boolean = false;

  public static winners: Winners;
  public static winnersItems: CarWinner[] = [];
  public static winnersCount: number = 0;
  public static winnersPagesCount: number = 1;
  public static winnersCurrentPage: number = 1;

  public static winnersSort: { order: SortOrder; type: SortType } = {
    order: 'ASC',
    type: 'id',
  };

  public static modal: Modal;

  public static async init(): Promise<void> {
    await Store.getGarageData();
    await Store.getWinnersData();
  }

  public static async updateGarage(): Promise<void> {
    await Store.getGarageData();
  }

  public static async updateWinners(): Promise<void> {
    await Store.getWinnersData();
  }

  private static async getWinnersData(): Promise<void> {
    return WinnersService.getWinners(Store.winnersCurrentPage, Store.winnersSort.type, Store.winnersSort.order).then(
      ({ total, items }: GetWinnersResponse) => {
        Store.winnersItems = items;
        Store.winnersCount = total;
        Store.winnersPagesCount = Math.ceil(total / WINNERS_LIMIT) || 1;
      }
    );
  }

  private static async getGarageData(): Promise<void> {
    return GarageService.getCars(Store.garageCurrentPage).then(({ total, items }: GetCarsResponse) => {
      Store.garageCars = items;
      Store.garageCarsCount = total;
      Store.garagePagesCount = Math.ceil(total / GARAGE_LIMIT) || 1;
    });
  }

  public static setSort(type: SortType): void {
    Store.winnersSort.type = type;
    if (Store.winnersSort.order === 'ASC') {
      Store.winnersSort.order = 'DESC';
    } else {
      Store.winnersSort.order = 'ASC';
    }
  }
}
