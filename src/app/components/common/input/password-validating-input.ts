import type BaseComponent from '../base-component';
import { createDiv } from '../base-component-factory';
import { InputType } from './input-types';
import type { LabelParameters } from './validating-input-component';
import { BaseValidatingInputComponent } from './validating-input-component';
import { eyeClose, eyeOpen } from '@/app/utils/svg-constants';
import { passwordRules } from '@/app/utils/validation-constants';

export class PasswordValidatingInput extends BaseValidatingInputComponent {
  private readonly passwordControl: BaseComponent<HTMLDivElement>;
  private isPasswordVisible: boolean = false;

  constructor(
    id: string = 'password-input',
    className: string = 'password-input',
    onInputChangedCallback: (() => void) | undefined,
    labelParameters: LabelParameters | undefined,
  ) {
    super(id, className, onInputChangedCallback, labelParameters);

    this.passwordControl = this.createPasswordControl();
    this.init();
  }

  protected addEventListeners(): void {
    super.addEventListeners();
    this.addEventListenerPasswordControl();
  }

  protected getValidationRulePairs(): Map<RegExp, string> {
    return new Map<RegExp, string>([
      [passwordRules.minLength, 'Password must be at least 8 characters long'],
      [passwordRules.upperCase, 'Password must contain at least one uppercase letter (A-Z)'],
      [passwordRules.lowerCase, 'Password must contain at least one lowercase letter (a-z)'],
      [passwordRules.digit, 'Password must contain at least one digit (0-9)'],
      [
        passwordRules.specialChar,
        'Password must contain at least one special character (e.g., !@#$%^&*)',
      ],
      [passwordRules.noWhitespace, 'Password must not contain leading or trailing whitespace'],
    ]);
  }

  protected createInput(): BaseComponent<HTMLInputElement> {
    return super.createInput(undefined, 'password', InputType.PASSWORD, 'Enter your password');
  }

  protected afterRenderInput(): void {
    this.passwordControl.appendTo(this.getElement());
  }

  private addEventListenerPasswordControl(): void {
    this.passwordControl.addEventListener('click', () => {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.input.getElement().type = this.isPasswordVisible ? InputType.TEXT : InputType.PASSWORD;
      this.passwordControl.removeChildren();
      this.passwordControl
        ?.getElement()
        .insertAdjacentHTML('afterbegin', this.isPasswordVisible ? eyeOpen : eyeClose);
    });
  }

  private createPasswordControl(): BaseComponent<HTMLDivElement> {
    const passwordControl = createDiv(undefined, 'password-control');
    passwordControl.getElement().insertAdjacentHTML('afterbegin', eyeClose);
    return passwordControl;
  }
}

export const passwordValidatingInput = (
  onInputChangedCallback: (() => void) | undefined,
  labelParameters: LabelParameters | undefined = undefined,
): PasswordValidatingInput =>
  new PasswordValidatingInput(
    'password-input',
    'password-input',
    onInputChangedCallback,
    labelParameters,
  );
