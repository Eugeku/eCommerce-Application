import { CountrySelect } from '@app/components/common/address-component/country-select-component';
import BaseComponent from '@app/components/common/base-component';
import {
  createButton,
  createDiv,
  createH3,
  createLabel,
} from '@app/components/common/base-component-factory';
import type { CityValidatingInput } from '@app/components/common/input/city-validating-input';
import { cityValidatingInput } from '@app/components/common/input/city-validating-input';
import type { PostalCodeValidatingInput } from '@app/components/common/input/postal-code-validating-input';
import { postalCodeValidatingInput } from '@app/components/common/input/postal-code-validating-input';
import type { StreetValidatingInput } from '@app/components/common/input/street-validating-input';
import { streetValidatingInput } from '@app/components/common/input/street-validating-input';
import type { RadioButton } from '@app/components/common/radio-button-component';
import { radioButton } from '@app/components/common/radio-button-component';
import { Tags } from '@app/components/common/tags';
import type { BaseAddress } from '@commercetools/platform-sdk';
import type { AddressData } from './profile';
import { AddressBuilder } from '@/app/utils/api/bean/address-builder';
import { coutriesPairs } from '@/app/utils/countries-pairs';

const Classes = {
  HIDDEN: 'hidden',
};

export class ProfileAddressComponent extends BaseComponent<HTMLDivElement> {
  private readonly header: BaseComponent<HTMLHeadingElement>;
  private readonly streetInput: StreetValidatingInput;
  private readonly cityInput: CityValidatingInput;
  private readonly postalCodeInput: PostalCodeValidatingInput;
  private readonly countryDiv: BaseComponent<HTMLDivElement>;
  private readonly countryLabel: BaseComponent<HTMLLabelElement>;
  private readonly countrySelect: CountrySelect;
  private readonly radioContainer: BaseComponent<HTMLDivElement>;
  private readonly shippingRadioButton: RadioButton;
  private readonly billingRadioButton: RadioButton;
  private readonly buttonsContainer: BaseComponent<HTMLDivElement>;
  private readonly editButton: BaseComponent<HTMLButtonElement>;
  private readonly saveButton: BaseComponent<HTMLButtonElement>;
  private readonly cancelButton: BaseComponent<HTMLButtonElement>;
  private readonly deleteButton: BaseComponent<HTMLButtonElement>;

  private readonly onInputChangedCallback: (() => void) | undefined;
  private readonly onSaveCallback: (data: AddressData) => void;
  private readonly onCancelCallback: () => void;
  private readonly onDeleteCallback: (addressKey: string) => void;

  private data: AddressData | undefined;

  constructor(
    id: string = 'profile-address-component',
    className: string = 'profile-address-component',
    headerText: string,
    onSaveCallback: (data: AddressData) => void,
    onCancelCallback: () => void,
    onDeleteCallback: (addressKey: string) => void,
    onInputChangedCallback: (() => void) | undefined,
  ) {
    super(Tags.DIV, id, className);

    this.onSaveCallback = onSaveCallback;
    this.onCancelCallback = onCancelCallback;
    this.onDeleteCallback = onDeleteCallback;
    this.onInputChangedCallback = onInputChangedCallback;

    this.header = this.createHeader(headerText);
    this.streetInput = this.createStreetInput();
    this.cityInput = this.createCityInput();
    this.postalCodeInput = this.createPostalCodeInput();
    this.countryDiv = this.createCountryDiv();
    this.countryLabel = this.createCountryLabel();
    this.countrySelect = this.createCountrySelect();

    this.radioContainer = this.createRadioContainer();
    this.shippingRadioButton = this.createShippingRadio();
    this.billingRadioButton = this.createBillingRadio();

    this.buttonsContainer = this.createButtonsContainer();
    this.editButton = this.createEditButton();
    this.saveButton = this.createSaveButton();
    this.cancelButton = this.createCancelButton();
    this.deleteButton = this.createDeleteButton();

    this.init();
  }

  public setData(data: AddressData): void {
    this.data = data;
    this.restoreData();
  }

  public setEditable(): void {
    this.setActive(true);

    this.editButton.addClass(Classes.HIDDEN);
    this.deleteButton.addClass(Classes.HIDDEN);

    this.saveButton.removeClass(Classes.HIDDEN);
    this.cancelButton.removeClass(Classes.HIDDEN);
  }

  public setUneditable(): void {
    this.setActive(false);

    this.editButton.removeClass(Classes.HIDDEN);
    this.deleteButton.removeClass(Classes.HIDDEN);

    this.saveButton.addClass(Classes.HIDDEN);
    this.cancelButton.addClass(Classes.HIDDEN);
  }

  public setActive(state: boolean): void {
    this.streetInput.setActive(state);
    this.cityInput.setActive(state);
    this.postalCodeInput.setActive(state);
    this.countrySelect.setActive(state);
    this.shippingRadioButton.setActive(state);
    this.billingRadioButton.setActive(state);
  }

  public hasValidValues(): boolean {
    return (
      this.streetInput.getInputValue() !== '' &&
      this.streetInput.isValid() &&
      this.cityInput.getInputValue() !== '' &&
      this.cityInput.isValid() &&
      this.postalCodeInput.getInputValue() !== '' &&
      this.postalCodeInput.isValid() &&
      this.countrySelect.getValue() !== ''
    );
  }

  public getAddress(): BaseAddress {
    const address = AddressBuilder()
      .withKey(crypto.randomUUID())
      .withStreetName(this.streetInput.getInputValue())
      .withCity(this.cityInput.getInputValue())
      .withPostalCode(this.postalCodeInput.getInputValue())
      .withCountry(this.countrySelect.getValue())
      .build();
    return address;
  }

  protected renderComponent(): void {
    this.header.appendTo(this.getElement());
    this.streetInput.appendTo(this.getElement());
    this.cityInput.appendTo(this.getElement());
    this.postalCodeInput.appendTo(this.getElement());
    this.countryDiv.appendTo(this.getElement());
    this.countryLabel.appendTo(this.countryDiv.getElement());
    this.countrySelect.appendTo(this.countryDiv.getElement());

    this.radioContainer.appendTo(this.getElement());
    this.shippingRadioButton.appendTo(this.radioContainer.getElement());
    this.billingRadioButton.appendTo(this.radioContainer.getElement());

    this.buttonsContainer.appendTo(this.getElement());
    this.editButton.appendTo(this.buttonsContainer.getElement());
    this.saveButton.appendTo(this.buttonsContainer.getElement());
    this.cancelButton.appendTo(this.buttonsContainer.getElement());
    this.deleteButton.appendTo(this.buttonsContainer.getElement());
  }

  protected addEventListeners(): void {
    this.editButton.addEventListener('click', () => {
      this.setEditable();
    });

    this.saveButton.addEventListener('click', () => {
      this.onSave();
    });

    this.cancelButton.addEventListener('click', () => {
      this.setUneditable();
      this.onCancelCallback();
    });

    this.deleteButton.addEventListener('click', () => {
      this.onDeleteCallback(this.data?.id || '');
    });
  }

  private createHeader(text: string): BaseComponent<HTMLHeadingElement> {
    const header = createH3();
    header.setText(text);
    return header;
  }

  private createStreetInput(): StreetValidatingInput {
    return streetValidatingInput(this.onInputChangedCallback, {
      id: '',
      className: '',
      text: 'Street',
    });
  }

  private createCityInput(): CityValidatingInput {
    return cityValidatingInput(this.onInputChangedCallback, {
      id: '',
      className: '',
      text: 'City',
    });
  }

  private createPostalCodeInput(): PostalCodeValidatingInput {
    return postalCodeValidatingInput(this.onInputChangedCallback, {
      id: '',
      className: '',
      text: 'Postal code',
    });
  }

  private createCountryDiv(): BaseComponent<HTMLDivElement> {
    return createDiv(undefined, 'country-input');
  }

  private createCountryLabel(): BaseComponent<HTMLLabelElement> {
    const label = createLabel(undefined, 'address-label');
    label.setText('Country');

    return label;
  }

  private createCountrySelect(): CountrySelect {
    return new CountrySelect(coutriesPairs, this.onInputChangedCallback);
  }

  private createRadioContainer(): BaseComponent<HTMLDivElement> {
    return createDiv(undefined, 'radio-container');
  }

  private createShippingRadio(): RadioButton {
    return radioButton(undefined, 'address-radio', undefined, 'shipping', 'Default Shipping');
  }

  private createBillingRadio(): RadioButton {
    return radioButton(undefined, 'address-radio', undefined, 'billing', 'Default Billing');
  }

  private createButtonsContainer(): BaseComponent<HTMLDivElement> {
    return createDiv(undefined, 'address-buttons-container');
  }

  private createEditButton(): BaseComponent<HTMLButtonElement> {
    const button = createButton(undefined, 'button');
    button.setText('Edit');
    button.addClass('address-button');
    return button;
  }

  private createSaveButton(): BaseComponent<HTMLButtonElement> {
    const button = createButton(undefined, 'button');
    button.setText('Save');
    button.addClass('address-button');
    return button;
  }

  private createCancelButton(): BaseComponent<HTMLButtonElement> {
    const button = createButton(undefined, 'button');
    button.setText('Cancel');
    button.addClass('cancel-button');
    return button;
  }

  private createDeleteButton(): BaseComponent<HTMLButtonElement> {
    const button = createButton(undefined, 'button');
    button.setText('Delete');
    button.addClass('address-button');
    return button;
  }

  private onSave(): void {
    const street = this.streetInput.getInputValue();
    const city = this.cityInput.getInputValue();
    const postalCode = this.postalCodeInput.getInputValue();
    const country = this.countrySelect.getValue();
    const isDefaultBilling = this.billingRadioButton.isChecked();
    const isDefaultShipping = this.shippingRadioButton.isChecked();

    this.onSaveCallback({
      id: this.data?.id,
      key: this.data?.key,
      street: street,
      city: city,
      country: country,
      postalCode: postalCode,
      isDefaultBilling: isDefaultBilling,
      isDefaultShipping: isDefaultShipping,
    });
  }

  private restoreData(): void {
    if (!this.data) return;

    this.streetInput.setInputValue(this.data.street);
    this.cityInput.setInputValue(this.data.city);
    this.postalCodeInput.setInputValue(this.data.postalCode);
    this.countrySelect.setValue(this.data.country);
    this.shippingRadioButton.setChecked(this.data.isDefaultShipping);
    this.billingRadioButton.setChecked(this.data.isDefaultBilling);
  }
}

export const profileAddressComponent = (
  id: string = 'profile-address-component',
  className: string = 'profile-address-component',
  headerText: string,
  onInputChangedCallback: (() => void) | undefined = undefined,
  onSaveCallback: (data: AddressData) => void,
  onCancelCallback: () => void,
  onDeleteCallback: (addressKey: string) => void,
): ProfileAddressComponent =>
  new ProfileAddressComponent(
    id,
    className,
    headerText,
    onSaveCallback,
    onCancelCallback,
    onDeleteCallback,
    onInputChangedCallback,
  );
