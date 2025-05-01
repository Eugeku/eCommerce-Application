import type { Tags } from './tags';

export default abstract class BaseComponent<T extends HTMLElement> {
  protected id: string;
  private element: T;
  private className: string;

  constructor(tagName: Tags, id: string = '', className: string = '') {
    this.id = id;
    this.className = className;
    this.element = document.createElement(tagName) as T;

    Object.setPrototypeOf(this.element, Object.getPrototypeOf(document.createElement(tagName)));
    this.setAttributes();
  }

  protected init(): void {
    this.renderComponent();
    this.addEventListeners();
  }

  protected abstract renderComponent(): void;
  
  protected abstract addEventListeners(): void;

  public getElement(): T {
    return this.element;
  }

  public appendTo(parent: HTMLElement): void {
    parent.append(this.element);
  }

  public setText(content: string): void {
    this.element.textContent = content;
  }

  public addEventListener(event: string, callback: EventListener): void {
    this.element.addEventListener(event, callback);
  }

  public removeEventListener(event: string, callback: EventListener): void {
    this.element.removeEventListener(event, callback);
  }

  public setAttribute(name: string, value: string): void {
    this.element.setAttribute(name, value);
  }

  public getAttribute(name: string): string | null {
    return this.element.getAttribute(name);
  }

  public removeAttribute(name: string): void {
    this.element.removeAttribute(name);
  }

  public destroy(): void {
    const clonedElement = this.element.cloneNode(true) as T;
    this.element.parentNode?.replaceChild(clonedElement, this.element);
    this.element = clonedElement;
  }

  public remove(): void {
    if (this.element.parentNode) {
      this.element.remove();
    }
  }

  public removeChildren(): void {
    [...this.element.childNodes].forEach((child) => {
      child.remove();
    });
  }

  private setAttributes(): void {
    if (this.id) {
      this.element.id = this.id;
    }
    if (this.className) {
      this.element.className = this.className;
    }
  }
}
