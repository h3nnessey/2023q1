import { GameState, Level, StoreElements } from '../types';
import { levels } from '../levels/levels';
import { LevelNode } from '../levels/level-node/level-node';
import { HtmlViewer } from '../components/html-viewer/html-viewer';
import { CssEditor } from '../components/css-editor/css-editor';
import { Cards } from '../components/cards/cards';
import { App } from '../components/app/app';
import { LevelSelector } from '../components/level-selector/level-selector';
import { getLocalStorage, setLocalStorage } from '../local-storage';

export class Store {
  public static gameState: GameState = getLocalStorage<GameState>() ?? {
    current: 0,
    completed: [],
    helped: [],
  };

  public static levels: Level[] = levels;
  public static app: App;
  public static htmlViewer: HtmlViewer;
  public static cssEditor: CssEditor;
  public static cards: Cards;
  public static levelSelector: LevelSelector;

  public static currentLevel: Level = levels[Store.gameState.current];
  public static currentLevelNodes: LevelNode[] = levels[Store.gameState.current].nodes;
  public static currentLevelAnswer: string = levels[Store.gameState.current].answer;

  public static setElements(elements: StoreElements): void {
    Store.app = elements.app;
    Store.htmlViewer = elements.htmlViewer;
    Store.cssEditor = elements.cssEditor;
    Store.cards = elements.cards;
    Store.levelSelector = elements.levelSelector;
  }

  public static setHelped(): void {
    Store.gameState.helped.push(Store.currentLevel.id);

    Store.saveGameState({
      ...Store.gameState,
      helped: Store.gameState.helped,
    });
  }

  public static saveGameState({
    helped = Store.gameState.helped,
    completed = Store.gameState.completed,
    current = Store.gameState.current,
  }: {
    helped?: number[];
    completed?: number[];
    current?: number;
  }): void {
    setLocalStorage<GameState>({
      ...Store.gameState,
      helped,
      completed,
      current,
    });
  }

  public static setCompleted(): void {
    Store.gameState.completed.push(Store.currentLevel.id);
    Store.saveGameState({
      ...Store.gameState,
      completed: Store.gameState.completed,
    });
  }

  public static resetProgress(id: number): void {
    Store.gameState = {
      ...Store.gameState,
      completed: [],
      helped: [],
    };

    Store.saveGameState({
      ...Store.gameState,
      current: id,
    });
  }

  public static updateCurrentLevel(level: Level): void {
    Store.saveGameState({
      ...Store.gameState,
      current: level.id,
    });
    Store.currentLevel = level;
    Store.currentLevelNodes = level.nodes;
    Store.currentLevelAnswer = level.answer;
  }
}
