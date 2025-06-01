import {
  addressComponent,
  type AddressComponent,
} from '@app/components/common/address-component/address-component';
import type BaseComponent from '@app/components/common/base-component';
import { createButton, createDiv, createH3 } from '@app/components/common/base-component-factory';
import { checkbox, type Checkbox } from '@app/components/common/checkbox-component';
import { BasePopupComponent } from '@app/components/popups/popup-base';
import type { AddressData } from '@app/components/profile/profile';
import './add-address-popup.scss';

export class AddAddressPopupComponent extends BasePopupComponent {
  private readonly header: BaseComponent<HTMLHeadingElement>;
  private readonly addressComponent: AddressComponent;
  private readonly defaultBillingCheckbox: Checkbox;
  private readonly buttonsContainer: BaseComponent<HTMLDivElement>;
  private readonly saveButton: BaseComponent<HTMLButtonElement>;
  private onAddressAdded: (addressData: AddressData) => void;

  constructor(
    onAddressAdded: (addressData: AddressData) => void,
    id: string = 'add-address-popup-component',
    className: string = 'add-address-popup-component',
  ) {
    super(id, className);

    this.onAddressAdded = onAddressAdded;
    this.header = createH3(undefined, 'heading-3');
    this.addressComponent = this.createAddressComponent();
    this.defaultBillingCheckbox = this.createdefaultBillingCheckbox();
    this.buttonsContainer = createDiv(undefined, 'button-container');
    this.saveButton = this.createSaveButton();

    this.init();
  }

  protected close(): void {
    super.close();

    this.addressComponent.reset();
    this.defaultBillingCheckbox.setChecked(false);
  }

  protected addEventListeners(): void {
    super.addEventListeners();

    this.saveButton.addEventListener('click', () => {
      const address = this.addressComponent.getAddress();
      this.onAddressAdded({
        street: address.streetName || '',
        city: address.city || '',
        country: address.country,
        postalCode: address.postalCode || '',
        key: address.key || '',
        isDefaultShipping: this.addressComponent.isChecked(),
        isDefaultBilling: this.defaultBillingCheckbox.isChecked(),
      });
      this.close();
    });
  }

  protected afterRenderContainer(): void {
    this.renderHeader();
    this.addressComponent.appendTo(this.container.getElement());
    this.defaultBillingCheckbox.appendTo(this.addressComponent.getElement());
    this.buttonsContainer.appendTo(this.container.getElement());
    this.saveButton.appendTo(this.buttonsContainer.getElement());
  }

  protected renderCloseButton(): void {
    this.closeButton.appendTo(this.buttonsContainer.getElement());
    this.closeButton.setText('Cancel');
  }

  private renderHeader(): void {
    this.header.appendTo(this.container.getElement());
    this.header.setText('Address adding');
  }

  private createAddressComponent(): AddressComponent {
    return addressComponent(
      undefined,
      'added-address-component',
      '',
      'Use as default shipping address',
      this.updateSaveButton.bind(this),
    );
  }

  private createdefaultBillingCheckbox(): Checkbox {
    return checkbox(undefined, 'address-checkbox', undefined, 'Use as default billing address');
  }

  private createSaveButton(): BaseComponent<HTMLButtonElement> {
    const button = createButton(undefined, 'button');
    button.setText('Save');
    button.addClass('save-button');
    button.setAttribute('disabled', 'true');
    return button;
  }

  private updateSaveButton(): void {
    const isAddressValid = this.addressComponent.hasValidValues();

    if (isAddressValid) {
      this.saveButton.removeAttribute('disabled');
    } else {
      this.saveButton.setAttribute('disabled', 'true');
    }
  }
}

export const AddAddressPopup = (
  onAddressAdded: (addressData: AddressData) => void,
): AddAddressPopupComponent => new AddAddressPopupComponent(onAddressAdded);
