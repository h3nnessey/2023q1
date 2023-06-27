import { LessonNode } from '../data/LessonNode';

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  selector: string;
  description: string;
  examples: string[];
  answer: string;
  nodes: LessonNode[];
}

export enum Shapes {
  Circle = 'circle',
  Rectangle = 'rectangle',
  Square = 'square',
  Triangle = 'triangle',
  Hexagon = 'hexagon',
}

export enum LessonNodeAttributes {
  Id = 'rounded',
  ClassName = 'border-red',
  TargetClass = 'target',
}
