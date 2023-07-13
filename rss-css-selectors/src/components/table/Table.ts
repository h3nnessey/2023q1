import './style.css';
import classNames from '../../classNames';
import { Store } from '../../store';
import { BaseComponent } from '../base-component/base-component';
import { LevelNode } from '../../levels/level-node/level-node';
import { TableElement } from './tableElement/TableElement';
import { setLocalStorage } from '../../local-storage';
import {GameState} from "../../types";

export class Table extends BaseComponent {
  private elements: BaseComponent[] = [];

  constructor() {
    super({ classNames: [classNames.table.root] });

    this.node.addEventListener('mouse-in', (event: Event) => {
      if (event instanceof CustomEvent) {
        this.elements.forEach((element) => element.removeClass('hovered'));
        this.node.querySelector(event.detail.selector)?.classList.add('hovered');
      }
    });

    this.node.addEventListener('mouse-out', (event: Event) => {
      if (event instanceof CustomEvent) {
        this.elements.forEach((element) => element.removeClass('hovered'));
      }
    });

    this.node.addEventListener('win', (event: Event) => {
      if (event instanceof CustomEvent) {
        const isGameOver = Store.currentLevel.id === Store.levels.length - 1;

        if (isGameOver) {
          this.node.innerHTML = '<p class="game-over">Hoooray! You Win!</p>';
          Store.levelSelector.render();
          setLocalStorage<GameState>({
            current: Store.currentLevel.id,
            completed: Store.completed,
            helped: Store.helped,
          });
        } else {
          this.addClass('win');

          const currentId = Store.currentLevel.id + 1;

          setLocalStorage<GameState>({
            current: currentId,
            completed: Store.completed,
            helped: Store.helped,
          });

          setTimeout(() => {
            Store.app.node.dispatchEvent(
              new CustomEvent('rerender', {
                detail: {
                  level: Store.levels.find((level) => level.id === currentId),
                },
              })
            );
            this.removeClass('win');
          }, 1000);
        }
      }
    });

    this.node.addEventListener('wrong-answer', (event: Event) => {
      if (event instanceof CustomEvent) {
        this.addClass('wrong-answer');

        setTimeout(() => {
          this.removeClass('wrong-answer');
        }, 500);
      }
    });
  }

  private createTableDom(nodeList: LevelNode[], parent: BaseComponent): void {
    const nodes: BaseComponent[] = [];

    nodeList.forEach((node, index) => {
      const tableElement = new TableElement(node, parent, this.elements, index);

      if (node.children) {
        this.createTableDom(node.children, tableElement);
      }

      nodes.push(tableElement);
      this.elements.push(tableElement);
    });

    parent.append(nodes);
  }

  public render() {
    this.elements.forEach((element) => element.delete());
    this.elements = [];
    this.node.innerHTML = '';

    this.createTableDom(Store.currentLevelNodes, this);
  }
}
