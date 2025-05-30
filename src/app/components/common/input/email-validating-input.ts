import type BaseComponent from '../base-component';
import { InputType } from './input-types';
import type { LabelParameters } from './validating-input-component';
import { BaseValidatingInputComponent } from './validating-input-component';
import { emailRules } from '@/app/utils/validation-constants';

export class EmailValidatingInput extends BaseValidatingInputComponent {
  constructor(
    id: string = 'email-input',
    className: string = 'email-input',
    onInputChangedCallback: (() => void) | undefined,
    labelParameters: LabelParameters | undefined,
  ) {
    super(id, className, onInputChangedCallback, labelParameters);

    this.init();
  }

  protected getValidationRulePairs(): Map<RegExp, string> {
    return new Map<RegExp, string>([
      [emailRules.format, 'Email must be properly formatted (e.g., user@example.com)'],
      [emailRules.noWhitespace, 'Email must not contain leading or trailing whitespace'],
      [emailRules.hasAt, 'Email must contain an "@" symbol'],
      [emailRules.hasDomain, 'Email must include a domain (e.g., example.com)'],
    ]);
  }

  protected createInput(): BaseComponent<HTMLInputElement> {
    return super.createInput(undefined, 'email', InputType.TEXT, 'Enter your e-mail');
  }
}

export const emailValidatingInput = (
  onInputChangedCallback: (() => void) | undefined,
  labelParameters: LabelParameters | undefined = undefined,
): EmailValidatingInput =>
  new EmailValidatingInput('email-input', 'email-input', onInputChangedCallback, labelParameters);
