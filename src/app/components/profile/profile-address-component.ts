import { CountrySelect } from '@app/components/common/address-component/country-select-component';
import type { CountrySelectOptionPair } from '@app/components/common/address-component/country-select-component';
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
import { AddressBuilder } from '@/app/utils/api/bean/address-builder';

const Classes = {
  HIDDEN: 'hidden',
};

export class ProfileAddressComponent extends BaseComponent<HTMLDivElement> {
  private readonly coutriesPairs: Array<CountrySelectOptionPair> = [
    { value: 'US', text: 'United States' },
  ];

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
  private readonly deleteButton: BaseComponent<HTMLButtonElement>;

  private readonly onInputChangedCallback: (() => void) | undefined;

  constructor(
    id: string = 'profile-address-component',
    className: string = 'profile-address-component',
    headerText: string,
    onInputChangedCallback: (() => void) | undefined,
  ) {
    super(Tags.DIV, id, className);
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
    this.deleteButton = this.createDeleteButton();

    this.init();
  }

  public setData(): void {
    this.streetInput.setInputValue('some street');
    this.cityInput.setInputValue('some city');
    this.postalCodeInput.setInputValue('12345');
  }

  public setEditable(): void {
    this.setActive(true);

    this.editButton.addClass(Classes.HIDDEN);
    this.saveButton.removeClass(Classes.HIDDEN);
  }

  public setUneditable(): void {
    this.setActive(false);

    this.editButton.removeClass(Classes.HIDDEN);
    this.saveButton.addClass(Classes.HIDDEN);
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
    this.deleteButton.appendTo(this.buttonsContainer.getElement());
  }

  protected addEventListeners(): void {
    this.saveButton.addEventListener('click', () => {
      this.setUneditable();
      console.log('save button clicked');
    });

    this.editButton.addEventListener('click', () => {
      this.setEditable();
      console.log('edit button clicked');
    });

    this.deleteButton.addEventListener('click', () => {
      console.log('delete button clicked');
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
    return new CountrySelect(this.coutriesPairs, this.onInputChangedCallback);
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

  private createDeleteButton(): BaseComponent<HTMLButtonElement> {
    const button = createButton(undefined, 'button');
    button.setText('Delete');
    button.addClass('address-button');
    return button;
  }
}

export const profileAddressComponent = (
  id: string = 'profile-address-component',
  className: string = 'profile-address-component',
  headerText: string,
  onInputChangedCallback: (() => void) | undefined = undefined,
): ProfileAddressComponent =>
  new ProfileAddressComponent(id, className, headerText, onInputChangedCallback);
