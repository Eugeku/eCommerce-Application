import type BaseComponent from '@app/components/common/base-component';
import { createButton, createDiv, createH3 } from '@app/components/common/base-component-factory';
import { BasePopupComponent } from '@app/components/popups/popup-base';
import './delete-address-popup.scss';

export class DeleteAddressPopupComponent extends BasePopupComponent {
  private readonly header: BaseComponent<HTMLHeadingElement>;
  private readonly buttonsContainer: BaseComponent<HTMLDivElement>;
  private readonly saveButton: BaseComponent<HTMLButtonElement>;
  private readonly onAddressDeleted: () => void;

  constructor(
    onAddressDeleted: () => void,
    id: string = 'delete-address-popup-component',
    className: string = 'delete-address-popup-component',
  ) {
    super(id, className);

    this.onAddressDeleted = onAddressDeleted;
    this.header = createH3(undefined, 'heading-3');
    this.buttonsContainer = createDiv(undefined, 'button-container');
    this.saveButton = this.createDeleteButton();

    this.init();
  }

  protected addEventListeners(): void {
    super.addEventListeners();

    this.saveButton.addEventListener('click', () => {
      this.onAddressDeleted();
      this.close();
    });
  }

  protected afterRenderContainer(): void {
    this.renderHeader();
    this.buttonsContainer.appendTo(this.container.getElement());
    this.saveButton.appendTo(this.buttonsContainer.getElement());
  }

  protected renderCloseButton(): void {
    this.closeButton.appendTo(this.buttonsContainer.getElement());
    this.closeButton.setText('Cancel');
  }

  private renderHeader(): void {
    this.header.appendTo(this.container.getElement());
    this.header.setText('Delete address?');
  }

  private createDeleteButton(): BaseComponent<HTMLButtonElement> {
    const button = createButton(undefined, 'button');
    button.setText('Delete');
    button.addClass('delete-button');
    return button;
  }
}

export const DeleteAddressPopup = (onAddressDeleted: () => void): DeleteAddressPopupComponent =>
  new DeleteAddressPopupComponent(onAddressDeleted);
