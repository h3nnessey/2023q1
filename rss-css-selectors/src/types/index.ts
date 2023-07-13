import { LevelNode } from '../levels/level-node/level-node';
import { BaseComponent } from '../components/base-component/base-component';

export interface GameState {
  current: number;
  completed: number[];
  helped: number[];
}

export interface Level {
  id: number;
  title: string;
  subtitle: string;
  selector: string;
  description: string;
  target: string;
  example: string;
  answer: string;
  help: string;
  nodes: LevelNode[];
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

export enum LevelNodeAttributes {
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
