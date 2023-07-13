import './style.css';
import { classNames } from './class-names';
import { CUSTOM_EVENTS } from '../../constants';
import { Store } from '../../store';
import { BaseComponent } from '../base-component/base-component';
import { LevelNode } from '../../levels/level-node/level-node';
import { Card } from './card/card';
import { setLocalStorage } from '../../local-storage';
import { GameState } from '../../types';

export class Cards extends BaseComponent {
  private elements: BaseComponent[] = [];

  constructor() {
    super({ classNames: [classNames.cardsWrapper] });

    this.attachListeners();
  }

  private attachListeners(): void {
    this.node.addEventListener(CUSTOM_EVENTS.MOUSE_IN, (event: Event) => this.handleMouseIn(event));
    this.node.addEventListener(CUSTOM_EVENTS.MOUSE_OUT, () => this.removeHoverClass());
    this.node.addEventListener(CUSTOM_EVENTS.WIN, () => this.handleWin());
    this.node.addEventListener(CUSTOM_EVENTS.WRONG_ANSWER, () => this.handleWrongAnswer());
  }

  private handleMouseIn(event: Event): void {
    if (event instanceof CustomEvent) {
      this.removeHoverClass();
      this.node.querySelector(event.detail.selector)?.classList.add(classNames.cardHovered);
    }
  }

  private handleWrongAnswer(): void {
    this.addClass(classNames.wrongAnswer);

    setTimeout(() => {
      this.removeClass(classNames.wrongAnswer);
    }, 500);
  }

  private handleWin(): void {
    const isGameOver = Store.currentLevel.id === Store.levels.length - 1;

    if (isGameOver) {
      this.node.innerHTML = `<p class="${classNames.gameOver}">Hoooray! You Win!</p>`;
      Store.levelSelector.render();
      setLocalStorage<GameState>({
        current: Store.currentLevel.id,
        completed: Store.completed,
        helped: Store.helped,
      });
    } else {
      this.addClass(classNames.win);

      const currentId = Store.currentLevel.id + 1;

      setLocalStorage<GameState>({
        current: currentId,
        completed: Store.completed,
        helped: Store.helped,
      });

      setTimeout(() => {
        Store.app.node.dispatchEvent(
          new CustomEvent(CUSTOM_EVENTS.RERENDER, {
            detail: {
              level: Store.levels.find((level) => level.id === currentId),
            },
          })
        );

        this.removeClass(classNames.win);
      }, 500);
    }
  }

  private removeHoverClass(): void {
    this.elements.forEach((element) => element.removeClass(classNames.cardHovered));
  }

  private createCards(nodeList: LevelNode[], parent: BaseComponent): void {
    const nodes: BaseComponent[] = [];

    nodeList.forEach((node, index) => {
      const tableElement = new Card(node, parent, this.elements, index);

      if (node.children) {
        this.createCards(node.children, tableElement);
      }

      nodes.push(tableElement);
      this.elements.push(tableElement);
    });

    parent.append(nodes);
  }

  public render(): void {
    this.elements.forEach((element) => element.delete());
    this.elements = [];
    this.node.innerHTML = '';

    this.createCards(Store.currentLevelNodes, this);
  }
}
