import type BaseComponent from '../base-component';
import { InputType } from './input-types';
import type { LabelParameters } from './validating-input-component';
import { BaseValidatingInputComponent } from './validating-input-component';
import {
  IsEarlyThanNowValidatingRule,
  IsEmptyDateValidatingRule,
  IsLateThan1900YearValidatingRule,
  IsOlderThanValidatingRule,
  type ValidatingRule,
} from './validating-rules';

export class DateValidatingInput extends BaseValidatingInputComponent {
  constructor(
    id: string = 'date-input',
    className: string = 'date-input',
    onInputChangedCallback: (() => void) | undefined,
    labelParameters: LabelParameters | undefined,
  ) {
    super(id, className, onInputChangedCallback, labelParameters);

    this.init();
  }

  protected getValidationRulePairs(): Map<ValidatingRule, string> {
    const ageRestriction = 14;
    return new Map<ValidatingRule, string>([
      [new IsLateThan1900YearValidatingRule(), 'Date cannot be earlier than 1900'],
      [new IsEarlyThanNowValidatingRule(), 'Date cannot be in the future'],
      [new IsEmptyDateValidatingRule(), 'Please enter your date of birth'],
      [
        new IsOlderThanValidatingRule(ageRestriction),
        `You should be at least ${ageRestriction} years old`,
      ],
    ]);
  }

  protected createInput(): BaseComponent<HTMLInputElement> {
    return super.createInput(undefined, 'date', InputType.DATE, '');
  }

  protected showTooltipWhenValueIsEmpty(): boolean {
    return true;
  }
}

export const dateValidatingInput = (
  onInputChangedCallback: (() => void) | undefined,
  labelParameters: LabelParameters | undefined = undefined,
): DateValidatingInput =>
  new DateValidatingInput('date-input', 'date-input', onInputChangedCallback, labelParameters);
