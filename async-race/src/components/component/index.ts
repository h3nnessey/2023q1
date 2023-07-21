import type { ComponentConstructor } from '../../types';

export class Component {
  private classes: string[] = [];

  private readonly element: HTMLElement;

  private readonly parent: Component | null = null;

  constructor({ tagName = 'div', classNames = [], parent = null, text }: ComponentConstructor) {
    this.element = document.createElement(tagName);

    classNames.forEach((className) => this.addClass(className));

    if (text) this.setTextContent(text);

    if (parent) {
      this.parent = parent;
      parent.appendChild(this);
    }
  }

  public addClass(className: string): void {
    if (!this.classes.includes(className)) this.classes.push(className);
    this.element.classList.add(className);
  }

  public hasClass(className: string): boolean {
    return this.classes.includes(className);
  }

  public removeClass(className: string): void {
    this.classes = this.classes.filter((clName) => clName !== className);
    this.element.classList.remove(className);
  }

  public appendChild(child: Component): void {
    this.element.appendChild(child.node);
  }

  public append(children: Component[]): void {
    children.forEach((child) => this.appendChild(child));
  }

  public get node(): HTMLElement {
    return this.element;
  }

  public get parentElement(): Component | null {
    return this.parent;
  }

  public get tag(): string {
    return this.element.tagName;
  }

  public delete(): void {
    this.element.remove();
  }

  public setTextContent(text: string): void {
    this.element.textContent = text;
  }

  public setAttribute(attribute: string, value: string): void {
    this.element.setAttribute(attribute, value);
  }

  public removeAttribute(attribute: string): void {
    this.element.removeAttribute(attribute);
  }

  public addEventListener(eventType: keyof GlobalEventHandlersEventMap, callback: (event: Event) => void): void {
    this.element.addEventListener(eventType, callback);
  }
}
