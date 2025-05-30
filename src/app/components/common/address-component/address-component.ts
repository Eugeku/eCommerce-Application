import type { BaseAddress } from '@commercetools/platform-sdk';
import BaseComponent from '../base-component';
import { createDiv, createH3, createLabel } from '../base-component-factory';
import { checkbox, type Checkbox } from '../checkbox-component';
import type { CityValidatingInput } from '../input/city-validating-input';
import { cityValidatingInput } from '../input/city-validating-input';
import type { PostalCodeValidatingInput } from '../input/postal-code-validating-input';
import { postalCodeValidatingInput } from '../input/postal-code-validating-input';
import type { StreetValidatingInput } from '../input/street-validating-input';
import { streetValidatingInput } from '../input/street-validating-input';
import { Tags } from '../tags';
import type { CountrySelectOptionPair } from './country-select-component';
import { CountrySelect } from './country-select-component';
import { AddressBuilder } from '@/app/utils/api/bean/address-builder';

export class AddressComponent extends BaseComponent<HTMLDivElement> {
  private enabled: boolean = true;
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
  private readonly checkBox: Checkbox;

  private readonly onInputChangedCallback: (() => void) | undefined;

  constructor(
    id: string = 'address-component',
    className: string = 'address-component',
    headerText: string,
    checkboxText: string,
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
    this.checkBox = this.createCheckBox(checkboxText);

    this.init();
  }

  public setEnabled(flag: boolean): void {
    this.enabled = flag;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public isChecked(): boolean {
    return this.checkBox.isChecked();
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
    this.checkBox.appendTo(this.getElement());
  }

  protected addEventListeners(): void {
    return;
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
      text: 'Street *',
    });
  }

  private createCityInput(): CityValidatingInput {
    return cityValidatingInput(this.onInputChangedCallback, {
      id: '',
      className: '',
      text: 'City *',
    });
  }

  private createPostalCodeInput(): PostalCodeValidatingInput {
    return postalCodeValidatingInput(this.onInputChangedCallback, {
      id: '',
      className: '',
      text: 'Postal code *',
    });
  }

  private createCountryDiv(): BaseComponent<HTMLDivElement> {
    return createDiv(undefined, 'country-input');
  }

  private createCountryLabel(): BaseComponent<HTMLLabelElement> {
    const label = createLabel(undefined, 'address-label');
    label.setText('Country *');

    return label;
  }

  private createCountrySelect(): CountrySelect {
    return new CountrySelect(this.coutriesPairs, this.onInputChangedCallback);
  }

  private createCheckBox(checkboxText: string): Checkbox {
    return checkbox(undefined, 'address-checkbox', undefined, checkboxText);
  }
}

export const addressComponent = (
  id: string = 'address-component',
  className: string = 'address-component',
  headerText: string,
  checkboxText: string,
  onInputChangedCallback: (() => void) | undefined,
): AddressComponent =>
  new AddressComponent(id, className, headerText, checkboxText, onInputChangedCallback);
