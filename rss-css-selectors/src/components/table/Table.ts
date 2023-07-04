import './style.css';
import classNames from '../../classNames';
import { Store } from '../../store/Store';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { LessonNode } from '../../data/LessonNode';
import { TableElement } from './tableElement/TableElement';
import { setLocalStorage } from '../../localStorage';

export class Table extends BaseComponent {
  private elements: BaseComponent[] = [];

  constructor(parent: BaseComponent) {
    super({ classNames: [classNames.table.root], parent });

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
        const isGameOver = Store.currentLesson.id === Store.lessons.length - 1;

        if (isGameOver) {
          this.node.innerHTML = '<span class="game-over">Hoooray! You Win!</span>';
          Store.levelSelector.render();
          setLocalStorage({
            current: Store.currentLesson.id,
            completed: Store.completed,
            helped: Store.helped,
          });
        } else {
          this.addClass('win');

          const currentId = Store.currentLesson.id + 1;

          setLocalStorage({
            current: currentId,
            completed: Store.completed,
            helped: Store.helped,
          });

          setTimeout(() => {
            Store.app.node.dispatchEvent(
              new CustomEvent('rerender', {
                detail: {
                  lesson: Store.lessons.find((lesson) => lesson.id === currentId),
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

  private createTableDom(nodeList: LessonNode[], parent: BaseComponent): void {
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
    this.node.innerHTML = '';
    this.createTableDom(Store.currentLessonNodes, this);
  }
}
