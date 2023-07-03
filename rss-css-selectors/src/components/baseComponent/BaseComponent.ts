import { BaseComponentConstructor } from '../../types';
import { CSS_CLASSES_TO_EXCLUDE } from '../../constants';

export class BaseComponent {
  private readonly element: HTMLElement;
  private readonly tag: string;
  public parent: BaseComponent | null = null;
  public classNames: string[] = [];

  constructor({ tagName = 'div', classNames = [], parent, text, html }: BaseComponentConstructor) {
    this.element = document.createElement(tagName);
    this.tag = tagName;
    this.addClass(...classNames);

    if (parent) {
      this.parent = parent;
      parent.appendChild(this);
    }

    if (text) {
      this.setTextContent(text);
    }

    if (html) {
      this.setHtml(html);
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

  public addClass(...classNames: string[]): void {
    this.element.classList.add(...classNames);
    this.classNames.push(...classNames);
    this.classNames = Array.from(new Set(this.classNames));
  }

  public hasClass(className: string): boolean {
    return this.classNames.includes(className);
  }

  public removeClass(className: string): void {
    this.classNames.filter((clName) => clName !== className);
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

  public setTextContent(text: string) {
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

    return `${classes.length ? '.' + classes.join(' ') : ''}`;
  }
}
