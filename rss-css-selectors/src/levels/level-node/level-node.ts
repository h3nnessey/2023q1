import { LevelNodeAttributes, CardRanks } from '../../types';

export class LevelNode {
  constructor(
    public tagName: CardRanks | 'cards',
    public children: LevelNode[] | null = null,
    public classNames: string[] = [],
    public id: LevelNodeAttributes.Id | null = null
  ) {}
}
