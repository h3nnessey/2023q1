import { LessonNodeAttributes, CardRanks } from '../types';

export class LessonNode {
  constructor(
    public tagName: CardRanks | 'cards',
    public children: LessonNode[] | null = null,
    public classNames: string[] = [],
    public id: LessonNodeAttributes.Id | null = null
  ) {}
}
