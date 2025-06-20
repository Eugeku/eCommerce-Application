import { BaseChoiceComponent } from './base-choice-component';
import { InputType } from './input/input-types';

export class RadioButton extends BaseChoiceComponent {
  constructor(
    id: string = '',
    className: string = '',
    onChangedCallback: (() => void) | undefined,
    inputName: string,
    labelText: string,
    labelClass: string,
    inputClass: string,
  ) {
    super(id, className, onChangedCallback, labelText, labelClass, InputType.RADIO, inputClass);

    this.input.getElement().name = inputName;
    this.init();
  }
}

export const radioButton = (
  id: string = '',
  className: string = 'radio-button-component',
  onChangedCallback: (() => void) | undefined,
  inputName: string,
  labelText: string = '',
  labelClass: string = 'address-radio-button-text',
  inputClass: string = 'address-radio-button-input',
): RadioButton =>
  new RadioButton(id, className, onChangedCallback, inputName, labelText, labelClass, inputClass);
