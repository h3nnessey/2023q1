import './style.css';
import classNames from '../../../classNames';
import { BaseComponent } from '../../baseComponent/BaseComponent';
import { LessonNode } from '../../../data/LessonNode';
import { LESSON_TARGET_CLASS } from '../../../constants';

export class TableElement extends BaseComponent {
  constructor(
    node: LessonNode,
    parent: BaseComponent,
    private tableElements: BaseComponent[],
    private readonly index: number
  ) {
    super({ tagName: node.tagName, classNames: node.classNames.concat([classNames.table.element.ct]), parent });
    this.setNodeAttributes(node.classNames, node.id);
    this.setAttribute('data-index', index.toString());
    this.setHoverHandler();
  }

  private setNodeAttributes(classNames: string[] | null, id: string | null): void {
    if (classNames) {
      classNames.forEach((className) => {
        if (className === LESSON_TARGET_CLASS) return;

        this.addClass(className);
      });
    }

    if (id) {
      this.setAttribute('id', id);
    }
  }

  private setHoverHandler(): void {
    this.addEventListener('mouseover', (event: Event) => {
      event.stopPropagation();

      this.tableElements.forEach((el) => el.removeClass('hovered'));

      this.addClass('hovered');

      let data = '';

      if (this.node.children.length) {
        data = `<${this.tagName}></${this.tagName}>`;
      } else {
        data = `<${this.tagName} />`;
      }

      this.setAttribute('data-value', data);

      let current = this.parentElement;

      let selector =
        this.tagName +
        this.getNodeClassName() +
        (this.getAttribute('id') ? '#' + this.getAttribute('id') : '') +
        (this.getAttribute('data-index') ? `[data-index="${this.getAttribute('data-index')}"]` : '');

      while (current) {
        if (current.hasClass('table')) {
          break;
        }

        selector +=
          ' ' +
          current.tagName +
          (current.getAttribute('id') ? '#' + current.getAttribute('id') : '') +
          (current.getAttribute('data-index') ? `[data-index="${current.getAttribute('data-index')}"]` : '');

        current = current.parentElement;
      }

      selector = selector.split(' ').reverse().join(' ');

      console.log(selector);
      document.querySelectorAll(`.html *`).forEach((el) => el.classList.remove('active'));
      document.querySelector(`.html ${selector}`)?.classList.add('active');
    });

    this.addEventListener('mouseleave', () => {
      this.tableElements.forEach((el) => el.removeClass('hovered'));
      document.querySelectorAll(`.html *`).forEach((el) => el.classList.remove('active'));
    });
  }
}
