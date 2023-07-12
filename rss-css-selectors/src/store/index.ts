import { Level } from '../types';
import { levels } from '../levels/levels';
import { LevelNode } from '../levels/level-node/level-node';
import { HtmlViewer } from '../components/htmlViewer/HtmlViewer';
import { CssEditor } from '../components/css-editor/css-editor';
import { Table } from '../components/table/Table';
import { App } from '../components/app/app';
import { LessonSelector } from '../components/lessonSelector/LessonSelector';
import { GameState, getLocalStorage, setLocalStorage } from '../localStorage';

const { current, completed, helped }: GameState = getLocalStorage();

interface StoreElements {
  app: App;
  htmlViewer: HtmlViewer;
  cssEditor: CssEditor;
  cardsTable: Table;
  levelSelector: LessonSelector;
}

export class Store {
  public static levels: Level[] = levels;
  public static app: App;
  public static htmlViewer: HtmlViewer;
  public static cssEditor: CssEditor;
  public static cards: Table;
  public static levelSelector: LessonSelector;

  public static completed: number[] = completed;
  public static helped: number[] = helped;

  public static currentLevel: Level = levels[current];
  public static currentLevelNodes: LevelNode[] = levels[current].nodes;
  public static currentLevelAnswer: string = levels[current].answer;

  public static setElements(elements: StoreElements): void {
    Store.app = elements.app;
    Store.htmlViewer = elements.htmlViewer;
    Store.cssEditor = elements.cssEditor;
    Store.cards = elements.cardsTable;
    Store.levelSelector = elements.levelSelector;
  }

  public static setHelped(): void {
    Store.helped.push(Store.currentLevel.id);

    setLocalStorage({
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
    setLocalStorage({
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
