import './style.css';
import { classNames } from '../../class-names';
import { CUSTOM_EVENTS } from '../../../../constants';
import { BaseComponent } from '../../../base-component/base-component';
import { LevelNode } from '../../../../levels/level-node/level-node';
import { LevelNodeAttributes } from '../../../../types';
import { Store } from '../../../../store';

export class MarkupElement extends BaseComponent {
  constructor(
    node: LevelNode,
    parent: BaseComponent,
    private readonly htmlViewerElements: BaseComponent[],
    private readonly index: number
  ) {
    super({
      tagName: node.tagName,
      classNames: node.classNames
        .filter((className) => className !== LevelNodeAttributes.TargetClass)
        .concat([classNames.pl20, classNames.customTag]),
      parent,
    });

    this.setElementData(node.id, index);
    this.attachListeners();
  }

  private setElementData(id: string | null, index: number): void {
    this.setAttribute('data-index', index.toString());
    id && this.setAttribute('id', id);
  }

  private attachListeners(): void {
    this.addEventListener('mouseover', (event: Event) => {
      event.stopPropagation();
      this.removeActiveClass();
      this.addClass(classNames.active);

      Store.cards.node.dispatchEvent(
        new CustomEvent(CUSTOM_EVENTS.MOUSE_IN, {
          detail: {
            selector: this.getSelector(classNames.markup),
          },
        })
      );
    });

    this.addEventListener('mouseleave', () => {
      this.removeActiveClass();
      Store.cards.node.dispatchEvent(new CustomEvent(CUSTOM_EVENTS.MOUSE_OUT));
    });
  }

  public insertText(node: LevelNode): void {
    const { bracket, tag, attr } = {
      bracket: (isOpen: boolean): string => `<span class="${classNames.tagBracket}">${isOpen ? '&lt;' : '&gt;'}</span>`,
      tag: (name: string): string => `<span class="${classNames.tagName}">${name}</span>`,
      attr: (type: string, value: string): string =>
        `<span class="${classNames.tagAttr}"> ${type}</span><span class="${classNames.tagAttrValue}">="${value}"</span>`,
    };

    let id = this.getAttribute('id') || '';
    if (id) id = attr('id', id);

    const classes = this.classNames.length ? attr('class', this.getNodeClassName().replace('.', '')) : '';

    if (node.children) {
      this.insertHtml([
        ['afterbegin', `${bracket(true)}${tag(node.tagName)}${classes + id}${bracket(false)}`],
        ['beforeend', `${bracket(true) + '/'}${tag(node.tagName)}${bracket(false)}`],
      ]);
    } else {
      this.insertHtml([['afterbegin', `${bracket(true)}${tag(node.tagName)}${classes + id}${' /' + bracket(false)}`]]);
    }
  }

  private removeActiveClass(): void {
    this.htmlViewerElements.forEach((el) => el.removeClass(classNames.active));
  }
}
