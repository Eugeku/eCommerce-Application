import type BaseComponent from '../base-component';
import { InputType } from './input-types';
import type { LabelParameters } from './validating-input-component';
import { BaseValidatingInputComponent } from './validating-input-component';
import { nameRules } from '@/app/utils/validation-constants';

export class FirstNameValidatingInput extends BaseValidatingInputComponent {
  constructor(
    id: string = 'first-name-input',
    className: string = 'first-name-input',
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
    return super.createInput(undefined, 'first-name', InputType.TEXT, 'Enter your first name');
  }
}

export const firstNameValidatingInput = (
  onInputChangedCallback: (() => void) | undefined,
  labelParameters: LabelParameters | undefined = undefined,
): FirstNameValidatingInput =>
  new FirstNameValidatingInput(
    'first-name-input',
    'first-name-input',
    onInputChangedCallback,
    labelParameters,
  );
