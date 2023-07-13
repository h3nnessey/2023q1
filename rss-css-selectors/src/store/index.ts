import { GameState, Level } from '../types';
import { levels } from '../levels/levels';
import { LevelNode } from '../levels/level-node/level-node';
import { HtmlViewer } from '../components/html-viewer/html-viewer';
import { CssEditor } from '../components/css-editor/css-editor';
import { Cards } from '../components/cards/cards';
import { App } from '../components/app/app';
import { LevelSelector } from '../components/level-selector/level-selector';
import { getLocalStorage, setLocalStorage } from '../local-storage';

const { current, completed, helped }: GameState = getLocalStorage<GameState>() ?? {
  current: 0,
  completed: [],
  helped: [],
};

interface StoreElements {
  app: App;
  htmlViewer: HtmlViewer;
  cssEditor: CssEditor;
  cards: Cards;
  levelSelector: LevelSelector;
}

export class Store {
  public static levels: Level[] = levels;
  public static app: App;
  public static htmlViewer: HtmlViewer;
  public static cssEditor: CssEditor;
  public static cards: Cards;
  public static levelSelector: LevelSelector;

  public static completed: number[] = completed;
  public static helped: number[] = helped;

  public static currentLevel: Level = levels[current];
  public static currentLevelNodes: LevelNode[] = levels[current].nodes;
  public static currentLevelAnswer: string = levels[current].answer;

  public static setElements(elements: StoreElements): void {
    Store.app = elements.app;
    Store.htmlViewer = elements.htmlViewer;
    Store.cssEditor = elements.cssEditor;
    Store.cards = elements.cards;
    Store.levelSelector = elements.levelSelector;
  }

  public static setHelped(): void {
    Store.helped.push(Store.currentLevel.id);

    setLocalStorage<GameState>({
      helped: Store.helped,
      completed: Store.completed,
      current: Store.currentLevel.id,
    });
  }

  public static setCompleted(): void {
    Store.completed.push(Store.currentLevel.id);
  }

  public static resetProgress(id: number): void {
    Store.completed = [];
    Store.helped = [];
    setLocalStorage<GameState>({
      current: id,
      completed: [],
      helped: [],
    });
  }

  public static updateCurrentLevel(level: Level): void {
    Store.currentLevel = level;
    Store.currentLevelNodes = level.nodes;
    Store.currentLevelAnswer = level.answer;
  }
}
