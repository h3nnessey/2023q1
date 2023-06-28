import './style.css';
import { BaseComponent } from '../../../baseComponent/BaseComponent';
import { LessonNode } from '../../../../data/LessonNode';
import {
  CSS_CLASSES_TO_EXCLUDE,
  LESSON_TARGET_CLASS,
  HTML_VIEWER_MARKUP_ELEMENT_CLASS_LIST,
} from '../../../../constants';

export class HtmlViewerMarkupElement extends BaseComponent {
  private attributes: string[] = [];

  constructor(node: LessonNode, parent: BaseComponent, private readonly htmlViewerElements: BaseComponent[]) {
    super({
      tagName: node.tagName,
      classNames: node.classNames
        .filter((className) => className !== LESSON_TARGET_CLASS)
        .concat(HTML_VIEWER_MARKUP_ELEMENT_CLASS_LIST),
      parent,
    });

    this.setNodeAttributes(node.classNames, node.id);
    this.setHoverHandler();
  }

  public insertText(node: LessonNode): void {
    const nodeAttributes = this.attributes.length ? ' ' + this.attributes.join(' ') : '';

    if (node.children) {
      this.insertTextNodes([
        ['afterbegin', `<${node.tagName}${nodeAttributes}>`],
        ['beforeend', `</${node.tagName}>`],
      ]);
    } else {
      this.insertTextNodes([['afterbegin', `<${node.tagName}${nodeAttributes} />`]]);
    }
  }

  private setNodeAttributes(classNames: string[] | null, id: string | null): void {
    if (classNames) {
      classNames.forEach((className) => {
        if (className === LESSON_TARGET_CLASS) return;

        this.addClass(className);
        this.attributes.push(`class="${className}"`);
      });
    }

    if (id) {
      this.setAttribute('id', id);
      this.attributes.push(`id="${id}"`);
    }
  }

  private setHoverHandler(): void {
    this.addEventListener('mouseover', (event: Event) => {
      event.stopPropagation();

      this.htmlViewerElements.forEach((el) => el.removeClass('active'));

      this.addClass('active');

      let current = this.parentElement;

      let selector =
        this.tagName + this.getNodeClassName() + `${this.getAttribute('id') ? '#' + this.getAttribute('id') : ''}`;

      while (current) {
        if (current.hasClass('html')) {
          break;
        }

        selector += ' ' + current.tagName;
        current = current.parentElement;
      }

      console.log(selector.split(' ').reverse().join(' '));
    });

    this.addEventListener('mouseleave', () => {
      this.htmlViewerElements.forEach((el) => el.removeClass('active'));
    });
  }

  private getNodeClassName(): string {
    const classes = this.classNames.filter((className) => {
      return !CSS_CLASSES_TO_EXCLUDE.includes(className);
    });

    return `${classes.length ? '.' + classes.join(' ') : ''}`;
  }
}
