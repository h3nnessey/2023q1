import { LessonNodeAttributes, CardRanks } from '../types';

export class LessonNode {
  constructor(
    public tagName: CardRanks,
    public children: LessonNode[] | null = null,
    public classNames: string[] = [],
    public id: LessonNodeAttributes.Id | null = null
  ) {}
}
