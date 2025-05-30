import { BaseChoiceComponent } from './base-choice-component';
import { InputType } from './input/input-types';

export class Checkbox extends BaseChoiceComponent {
  constructor(
    id: string = '',
    className: string = '',
    onChangedCallback: (() => void) | undefined,
    labelText: string,
    labelClass: string,
    inputClass: string,
  ) {
    super(id, className, onChangedCallback, labelText, labelClass, InputType.CHECKBOX, inputClass);

    this.init();
  }
}

export const checkbox = (
  id: string = '',
  className: string = 'checkbox-component',
  onChangedCallback: (() => void) | undefined,
  checkboxText: string = '',
  labelClass: string = 'address-checkbox-text',
  inputClass: string = 'address-checkbox-input',
): Checkbox => new Checkbox(id, className, onChangedCallback, checkboxText, labelClass, inputClass);
