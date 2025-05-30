import type BaseComponent from '../base-component';
import { InputType } from './input-types';
import type { LabelParameters } from './validating-input-component';
import { BaseValidatingInputComponent } from './validating-input-component';
import type { ValidatingRule } from './validating-rules';
import { IsUSAAddressCodeValidatingRule } from './validating-rules';

export class PostalCodeValidatingInput extends BaseValidatingInputComponent {
  constructor(
    id: string = 'postal-code-input',
    className: string = 'postal-code-input',
    onInputChangedCallback: (() => void) | undefined,
    labelParameters: LabelParameters | undefined,
  ) {
    super(id, className, onInputChangedCallback, labelParameters);

    this.init();
  }

  protected getValidationRulePairs(): Map<ValidatingRule, string> {
    return new Map<ValidatingRule, string>([
      [new IsUSAAddressCodeValidatingRule(), 'Must follow the format 90210 or 90210-1234'],
    ]);
  }

  protected createInput(): BaseComponent<HTMLInputElement> {
    return super.createInput(undefined, 'postal-code', InputType.TEXT, 'Postal Code');
  }
}

export const postalCodeValidatingInput = (
  onInputChangedCallback: (() => void) | undefined,
  labelParameters: LabelParameters | undefined = undefined,
): PostalCodeValidatingInput =>
  new PostalCodeValidatingInput(
    'postal-code-input',
    'postal-code-input',
    onInputChangedCallback,
    labelParameters,
  );
