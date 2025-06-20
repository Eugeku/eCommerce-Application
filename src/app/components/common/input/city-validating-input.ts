import type BaseComponent from '../base-component';
import { InputType } from './input-types';
import type { LabelParameters } from './validating-input-component';
import { BaseValidatingInputComponent } from './validating-input-component';
import { addressRules } from '@/app/utils/validation-constants';

export class CityValidatingInput extends BaseValidatingInputComponent {
  constructor(
    id: string = 'city-input',
    className: string = 'city-input',
    onInputChangedCallback: (() => void) | undefined,
    labelParameters: LabelParameters | undefined,
  ) {
    super(id, className, onInputChangedCallback, labelParameters);

    this.init();
  }

  protected getValidationRulePairs(): Map<RegExp, string> {
    return new Map<RegExp, string>([[addressRules.city, 'Must contain only Latin letters']]);
  }

  protected createInput(): BaseComponent<HTMLInputElement> {
    return super.createInput(undefined, 'city', InputType.TEXT, 'City');
  }
}

export const cityValidatingInput = (
  onInputChangedCallback: (() => void) | undefined,
  labelParameters: LabelParameters | undefined = undefined,
): CityValidatingInput =>
  new CityValidatingInput('city-input', 'city-input', onInputChangedCallback, labelParameters);
