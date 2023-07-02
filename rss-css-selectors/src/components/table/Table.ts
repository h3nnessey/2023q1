import './style.css';
import classNames from '../../classNames';
import { Store } from '../../store/Store';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { LessonNode } from '../../data/LessonNode';
import { TableElement } from './tableElement/TableElement';

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
        this.addClass('win');
        const currentId = Store.currentLesson.id === Store.lessons.length - 1 ? 0 : Store.currentLesson.id + 1;

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
    this.createTableDom(Store.currentLessonNodes, this);
  }
}
