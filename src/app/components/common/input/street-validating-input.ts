import type BaseComponent from '../base-component';
import { InputType } from './input-types';
import type { LabelParameters } from './validating-input-component';
import { BaseValidatingInputComponent } from './validating-input-component';
import { addressRules } from '@/app/utils/validation-constants';

export class StreetValidatingInput extends BaseValidatingInputComponent {
  constructor(
    id: string = 'street-input',
    className: string = 'street-input',
    onInputChangedCallback: (() => void) | undefined,
    labelParameters: LabelParameters | undefined,
  ) {
    super(id, className, onInputChangedCallback, labelParameters);
    this.init();
  }

  protected getValidationRulePairs(): Map<RegExp, string> {
    return new Map<RegExp, string>([
      [addressRules.street, 'Must contain only Latin letters and numbers'],
    ]);
  }

  protected createInput(): BaseComponent<HTMLInputElement> {
    return super.createInput(undefined, 'street', InputType.TEXT, 'Street');
  }
}

export const streetValidatingInput = (
  onInputChangedCallback: (() => void) | undefined,
  labelParameters: LabelParameters | undefined = undefined,
): StreetValidatingInput =>
  new StreetValidatingInput(
    'street-input',
    'street-input',
    onInputChangedCallback,
    labelParameters,
  );
