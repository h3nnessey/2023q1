import { LessonNode } from '../data/LessonNode';
import { BaseComponent } from '../components/baseComponent/BaseComponent';

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  selector: string;
  description: string;
  target: string;
  example: string;
  answer: string;
  help: string;
  nodes: LessonNode[];
}

export enum CardRanks {
  Ace = 'ace',
  Two = 'two',
  Three = 'three',
  Four = 'four',
  Five = 'five',
  Six = 'six',
  Seven = 'seven',
  Eight = 'eight',
  Nine = 'nine',
  Ten = 'ten',
  Jack = 'jack',
  Queen = 'queen',
  King = 'king',
}

export enum CardSuits {
  Clubs = 'clubs',
  Hearts = 'hearts',
  Spades = 'spades',
  Diamonds = 'diamonds',
}

export enum LessonNodeAttributes {
  Id = 'corner',
  TargetClass = 'target',
}

export interface BaseComponentConstructor {
  tagName?: string;
  classNames?: string[];
  parent?: BaseComponent;
  text?: string;
  html?: string;
}
