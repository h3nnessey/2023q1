import { BaseComponentConstructor } from '../../types';
import { CSS_CLASSES_TO_EXCLUDE } from '../../constants';

export class BaseComponent {
  private readonly element: HTMLElement;
  private readonly tag: string;
  public readonly parent: BaseComponent | null = null;
  public classNames: string[] = [];

  constructor({ tagName = 'div', classNames = [], parent, text, html }: BaseComponentConstructor) {
    this.element = document.createElement(tagName);
    this.tag = tagName;

    classNames?.forEach((className) => this.addClass(className));
    text && this.setTextContent(text);
    html && this.setHtml(html);

    if (parent) {
      this.parent = parent;
      parent.appendChild(this);
    }
  }

  public append(children: BaseComponent[]): void {
    children.forEach((child) => this.appendChild(child));
  }

  public appendChild(children: BaseComponent): void {
    this.element.appendChild(children.node);
  }

  get node(): HTMLElement {
    return this.element;
  }

  get parentElement(): BaseComponent | null {
    return this.parent;
  }

  public setAttribute(key: string, value: string): void {
    this.element.setAttribute(key, value);
  }

  public getAttribute(key: string): string | null {
    return this.element.getAttribute(key);
  }

  public addClass(className: string): void {
    !this.classNames.includes(className) && this.classNames.push(className);
    this.element.classList.add(className);
  }

  public hasClass(className: string): boolean {
    return this.classNames.includes(className);
  }

  public removeClass(className: string): void {
    this.classNames = this.classNames.filter((clName) => clName !== className);
    this.element.classList.remove(className);
  }

  public get tagName(): string {
    return this.tag;
  }

  public insertTextNodes(config: [InsertPosition, string][]): void {
    config.forEach(([where, data]) => {
      this.element.insertAdjacentText(where, data);
    });
  }

  public insertHtml(config: [InsertPosition, string][]): void {
    config.forEach(([where, data]) => {
      this.element.insertAdjacentHTML(where, data);
    });
  }

  public setHtml(html: string): void {
    this.element.innerHTML = '';
    this.element.insertAdjacentHTML('afterbegin', html);
  }

  public setTextContent(text: string): void {
    this.element.textContent = text;
  }

  public delete(): void {
    this.element.remove();
  }

  public addEventListener(eventType: keyof GlobalEventHandlersEventMap, callback: (event: Event) => void): void {
    this.element.addEventListener(eventType, callback);
  }

  public getNodeClassName(): string {
    const classes = this.classNames.filter((className) => {
      return !CSS_CLASSES_TO_EXCLUDE.includes(className);
    });

    return `${classes.length ? '.' + classes.join('.') : ''}`;
  }

  private getCurrentSelector(): string {
    return (
      this.tagName +
      this.getNodeClassName() +
      (this.getAttribute('id') ? '#' + this.getAttribute('id') : '') +
      (this.getAttribute('data-index') ? `[data-index="${this.getAttribute('data-index')}"]` : '')
    );
  }

  public getSelector(stopClassName: string): string {
    let current = this.parentElement;

    let selector = this.getCurrentSelector();

    while (current) {
      if (current.hasClass(stopClassName)) {
        break;
      }

      selector += ` ${current.getCurrentSelector()}`;

      current = current.parentElement;
    }

    selector = selector.split(' ').reverse().join(' ');

    return selector;
  }
}
