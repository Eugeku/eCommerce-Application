import BaseComponent from '@common-components/base-component';
import { createButton, createDiv } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';

export abstract class BasePopupComponent extends BaseComponent<HTMLDialogElement> {
  protected readonly container: BaseComponent<HTMLDivElement>;
  protected readonly closeButton: BaseComponent<HTMLButtonElement>;
  private onCloseCallback?: () => void;

  constructor(
    id: string = 'api-error-popup-component',
    className: string = 'api-error-popup-component',
  ) {
    super(Tags.DIALOG, id, className);

    this.container = createDiv('', 'container');
    this.closeButton = createButton(undefined, 'close-button');
  }

  public show(): void {
    this.getElement().showModal();
  }

  public onClose(callback: () => void): void {
    this.onCloseCallback = callback;
  }

  protected renderComponent(): void {
    this.renderContainer();
    this.afterRenderContainer();
    this.renderCloseButton();
  }

  protected renderCloseButton(): void {
    this.closeButton.appendTo(this.container.getElement());
    this.closeButton.setText('Close');
  }

  protected addEventListeners(): void {
    this.addEventListenerCloseButton();
    this.addEventListenerCloseOnBackdrop();
    this.addEventListenerCloseOnEscape();
  }

  protected close(): void {
    this.getElement().close();
    this.remove();
    if (this.onCloseCallback) {
      this.onCloseCallback();
    }
  }

  private renderContainer(): void {
    this.container.appendTo(this.getElement());
  }

  private addEventListenerCloseButton(): void {
    this.closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  private addEventListenerCloseOnBackdrop(): void {
    this.getElement().addEventListener('click', (event) => {
      if (event.target === this.getElement()) {
        this.close();
      }
    });
  }

  private addEventListenerCloseOnEscape(): void {
    this.getElement().addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }

  protected abstract afterRenderContainer(): void;
}
