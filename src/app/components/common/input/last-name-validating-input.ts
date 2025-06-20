import type BaseComponent from '../base-component';
import { InputType } from './input-types';
import type { LabelParameters } from './validating-input-component';
import { BaseValidatingInputComponent } from './validating-input-component';
import { nameRules } from '@/app/utils/validation-constants';

export class LastNameValidatingInput extends BaseValidatingInputComponent {
  constructor(
    id: string = 'last-name-input',
    className: string = 'last-name-input',
    onInputChangedCallback: (() => void) | undefined,
    labelParameters: LabelParameters | undefined,
  ) {
    super(id, className, onInputChangedCallback, labelParameters);

    this.init();
  }

  protected getValidationRulePairs(): Map<RegExp, string> {
    return new Map<RegExp, string>([
      [
        nameRules.onlyLetters,
        'Must contain at least one character and no special characters or numbers',
      ],
    ]);
  }

  protected createInput(): BaseComponent<HTMLInputElement> {
    return super.createInput(undefined, 'last-name', InputType.TEXT, 'Enter your last name');
  }
}

export const lastNameValidatingInput = (
  onInputChangedCallback: (() => void) | undefined,
  labelParameters: LabelParameters | undefined = undefined,
): LastNameValidatingInput =>
  new LastNameValidatingInput(
    'last-name-input',
    'last-name-input',
    onInputChangedCallback,
    labelParameters,
  );
