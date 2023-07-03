import './style.css';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { LESSON_TARGET_CLASS } from '../../../../constants';
import { LessonNode } from '../../../../data/LessonNode';

export class TableElementInfo extends BaseComponent {
  private attributes: {
    classNames: string[];
    id: string | null;
  } = { classNames: [], id: null };

  constructor(node: LessonNode, parent: BaseComponent) {
    super({ classNames: ['card-info'], parent });

    this.setNodeAttributes(node.classNames, node.id);
    this.insertText(node);
  }

  public insertText(node: LessonNode): void {
    const id = this.attributes.id
      ? `<span class="tag-attr">id</span><span class="tag-attr-value">="${this.attributes.id}"</span>`
      : '';

    const classNames = this.attributes.classNames.length
      ? `<span class="tag-attr"> class</span><span class="tag-attr-value">="${this.attributes.classNames.join(
          ' '
        )}"</span>`
      : '';

    if (node.children) {
      this.insertHtml([
        [
          'afterbegin',
          `<span class="tag-bracket">&lt;</span><span class="tag-name">${node.tagName}</span>${
            classNames + id
          }<span class="tag-bracket">&gt;</span>`,
        ],
        [
          'beforeend',
          `<span class="tag-bracket">&lt;/</span><span class="tag-name">${node.tagName}</span><span class="tag-bracket">&gt;</span>`,
        ],
      ]);
    } else {
      this.insertHtml([
        [
          'afterbegin',
          `<span class="tag-bracket">&lt;</span><span class="tag-name">${node.tagName}</span>${
            classNames + id
          }<span class="tag-bracket">/&gt;</span>`,
        ],
      ]);
    }
  }

  private setNodeAttributes(classNames: string[] | null, id: string | null): void {
    if (classNames) {
      classNames.forEach((className) => {
        if (className === LESSON_TARGET_CLASS) return;

        this.addClass(className);
        this.attributes.classNames.push(className);
      });
    }

    if (id) {
      this.setAttribute('id', id);
      this.attributes.id = id;
    }
  }
}
