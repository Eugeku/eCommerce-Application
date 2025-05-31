import BaseComponent from '@common-components/base-component';
import { createButton, createForm, createH2 } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import { emailValidatingInput } from '../common/input/email-validating-input';
import { passwordValidatingInput } from '../common/input/password-validating-input';
import { ApiPopup } from '@/app/components/api-popup/api-popup';
import { router } from '@/app/router';
import { SdkApi } from '@/app/utils/api/commerce-sdk-api';
import { UserCache } from '@/app/utils/api/token-cache';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import './login.scss';

class LoginComponent extends BaseComponent<HTMLDivElement> {
  private ApiPopup = ApiPopup();
  private readonly form: BaseComponent<HTMLFormElement>;
  private readonly h2: BaseComponent<HTMLHeadingElement>;

  private readonly emailInputComponent = emailValidatingInput(this.updateSubmitButton.bind(this));
  private readonly passwordInputComponent = passwordValidatingInput(
    this.updateSubmitButton.bind(this),
  );
  private readonly submitButton: BaseComponent<HTMLButtonElement>;

  constructor(id: string = 'login-component', className: string = 'login-component') {
    super(Tags.DIV, id, className);

    this.h2 = createH2(undefined, 'heading-2');
    this.form = createForm(undefined, 'login-form');
    this.submitButton = this.createSubmitButton();

    this.init();
  }

  protected renderComponent(): void {
    this.renderH2();
    this.renderForm();
    this.renderEmailInputComponent();
    this.renderPasswordInputComponent();
    this.renderSubmitButton();
  }

  protected addEventListeners(): void {
    this.submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.onSubmit();
    });
  }

  private updateSubmitButton(): void {
    const validateEmailResults = this.emailInputComponent.isValid();
    const validatePasswordResults = this.passwordInputComponent.isValid();

    if (validateEmailResults && validatePasswordResults) {
      this.submitButton.removeAttribute('disabled');
    } else {
      this.submitButton.setAttribute('disabled', 'true');
    }
  }

  private renderPopupMessage(erroMessage: string): void {
    this.ApiPopup.appendTo(this.getElement());
    this.ApiPopup.setErrorMessage(erroMessage);
    this.ApiPopup.show();
  }

  private async onSubmit(): Promise<void> {
    const email = this.emailInputComponent.getInputValue();
    const password = this.passwordInputComponent.getInputValue();

    await SdkApi()
      .loginUser(email, password)
      .then(() => {
        this.clearInputs();
        return SdkApi().withPasswordFlow(email, password).getMe();
      })
      .then((response) => {
        UserCache.set(response.body);
        PublishSubscriber().publish('userLoggedIn', { userId: email });
        router.navigate('#/main');
      })
      .catch((error) => {
        this.renderPopupMessage(error.body.message);
      });
  }

  private clearInputs(): void {
    this.emailInputComponent.setInputValue('');
    this.passwordInputComponent.setInputValue('');
  }

  private renderForm(): void {
    this.form.appendTo(this.getElement());
  }

  private renderH2(): void {
    this.h2.setText('Login');
    this.h2.appendTo(this.getElement());
  }

  private renderSubmitButton(): void {
    this.submitButton.appendTo(this.form.getElement());
  }

  private renderPasswordInputComponent(): void {
    this.passwordInputComponent.appendTo(this.form.getElement());
  }

  private renderEmailInputComponent(): void {
    this.emailInputComponent.appendTo(this.form.getElement());
  }

  private createSubmitButton(): BaseComponent<HTMLButtonElement> {
    const submitButton = createButton(undefined, 'button');
    submitButton.setText('Sign In');
    submitButton.addClass('submit-button');
    submitButton.setAttribute('disabled', 'true');
    return submitButton;
  }
}

export const Login = (): LoginComponent => new LoginComponent();
