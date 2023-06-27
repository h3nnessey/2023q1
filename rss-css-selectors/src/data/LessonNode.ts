import { LessonNodeAttributes, Shapes } from '../types';

export class LessonNode {
  constructor(
    public tagName: Shapes,
    public children: LessonNode[] | null = null,
    public classNames: string[] = [],
    public id: LessonNodeAttributes.Id | null = null
  ) {}
}
