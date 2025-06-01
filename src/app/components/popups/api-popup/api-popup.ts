import type BaseComponent from '@common-components/base-component';
import { createP } from '@common-components/base-component-factory';
import './api-popup.scss';
import { BasePopupComponent } from '../popup-base';

class ApiPopupComponent extends BasePopupComponent {
  private readonly message: BaseComponent<HTMLParagraphElement>;
  private messageText: string;

  constructor(
    id: string = 'api-error-popup-component',
    className: string = 'api-error-popup-component',
    messageText: string = 'data not found',
  ) {
    super(id, className);

    this.messageText = messageText;
    this.message = createP(undefined, 'message');

    this.init();
  }

  public setErrorMessage(messageText: string): void {
    this.messageText = messageText;
    this.message.setText(this.messageText);
  }

  protected afterRenderContainer(): void {
    this.renderMessage();
  }

  private renderMessage(): void {
    this.message.appendTo(this.container.getElement());
    this.setErrorMessage(this.messageText);
  }
}

export const ApiPopup = (erroMessage: string = 'data not found'): ApiPopupComponent =>
  new ApiPopupComponent(undefined, undefined, erroMessage);
