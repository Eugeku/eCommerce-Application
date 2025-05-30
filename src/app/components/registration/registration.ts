import type { Customer } from '@commercetools/platform-sdk';
import { ApiPopup } from '@components/api-popup/api-popup';
import type { AddressComponent } from '../common/address-component/address-component';
import { addressComponent } from '../common/address-component/address-component';
import BaseComponent from '../common/base-component';
import { createButton, createForm, createH2 } from '../common/base-component-factory';
import type { Checkbox } from '../common/checkbox-component';
import { checkbox } from '../common/checkbox-component';
import { dateValidatingInput } from '../common/input/date-validating-input';
import type { DateValidatingInput } from '../common/input/date-validating-input';
import type { EmailValidatingInput } from '../common/input/email-validating-input';
import { emailValidatingInput } from '../common/input/email-validating-input';
import type { FirstNameValidatingInput } from '../common/input/first-name-validating-input';
import { firstNameValidatingInput } from '../common/input/first-name-validating-input';
import type { LastNameValidatingInput } from '../common/input/last-name-validating-input';
import { lastNameValidatingInput } from '../common/input/last-name-validating-input';
import type { PasswordValidatingInput } from '../common/input/password-validating-input';
import { passwordValidatingInput } from '../common/input/password-validating-input';
import { Tags } from '../common/tags';
import { router } from '@/app/router';
import { CustomerBuilder } from '@/app/utils/api/bean/customer-builder';
import { SdkApi } from '@/app/utils/api/commerce-sdk-api';
import { UserCache } from '@/app/utils/api/token-cache';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import './registration.scss';

class RegistrationComponent extends BaseComponent<HTMLDivElement> {
  private ApiPopup = ApiPopup();
  private readonly h2: BaseComponent<HTMLHeadingElement>;
  private readonly form: BaseComponent<HTMLFormElement>;

  private readonly emailInput: EmailValidatingInput;
  private readonly passwordInput: PasswordValidatingInput;
  private readonly firstNameInput: FirstNameValidatingInput;
  private readonly lastNameInput: LastNameValidatingInput;
  private readonly dateInput: DateValidatingInput;
  private readonly shippingAddress: AddressComponent;
  private readonly useAsBillingCheckbox: Checkbox;
  private readonly billingAddress: AddressComponent;
  private readonly signUp: BaseComponent<HTMLButtonElement>;

  constructor(id: string = 'registration-component', className: string = 'registration-component') {
    super(Tags.DIV, id, className);

    this.h2 = createH2(undefined, 'heading-2');

    this.form = createForm(undefined, 'registration-form');
    this.emailInput = this.createEmailInput();
    this.passwordInput = this.createPasswordInput();
    this.firstNameInput = this.createFirstNameInput();
    this.lastNameInput = this.createLastNameInput();
    this.dateInput = this.createDateInput();
    this.shippingAddress = this.createShippingAddress();
    this.useAsBillingCheckbox = this.createUseAsBillingCheckbox();
    this.billingAddress = this.createBillingAddress();
    this.signUp = this.createSignUpButton();

    this.init();
  }

  protected renderComponent(): void {
    this.renderH2();
    this.renderForm();
    this.emailInput.appendTo(this.form.getElement());
    this.passwordInput.appendTo(this.form.getElement());
    this.firstNameInput.appendTo(this.form.getElement());
    this.lastNameInput.appendTo(this.form.getElement());
    this.dateInput.appendTo(this.form.getElement());
    this.shippingAddress.appendTo(this.form.getElement());
    this.useAsBillingCheckbox.appendTo(this.shippingAddress.getElement());
    this.billingAddress.appendTo(this.form.getElement());
    this.renderSignUpButton();
  }

  protected addEventListeners(): void {
    this.addSingUpListener();
    this.addUseSameAddressListener();
  }

  private addSingUpListener(): void {
    this.signUp.addEventListener('click', (event) => {
      event.preventDefault();
      this.onSignUp();
    });
  }

  private addUseSameAddressListener(): void {
    this.useAsBillingCheckbox.addEventListener('change', () => {
      if (this.useAsBillingCheckbox.isChecked()) {
        this.billingAddress.setEnabled(false);
        this.billingAddress.addClass('hidden');
      } else {
        this.billingAddress.setEnabled(true);
        this.billingAddress.removeClass('hidden');
      }
      this.updateSignUpButton();
    });
  }

  private updateSignUpButton(): void {
    const validateEmailResults = this.emailInput.isValid();
    const validatePasswordResults = this.passwordInput.isValid();
    const validateFirstNameResults = this.firstNameInput.isValid();
    const validateLastNameResults = this.lastNameInput.isValid();
    const validateDateResults = this.dateInput.isValid();
    const validateAddressResults = this.shippingAddress.isEnabled()
      ? this.shippingAddress.hasValidValues()
      : true;

    let validateBillingAddressResults;
    if (this.useAsBillingCheckbox.isChecked()) {
      validateBillingAddressResults = true;
    } else {
      validateBillingAddressResults = true;
      validateBillingAddressResults = this.billingAddress.isEnabled()
        ? this.billingAddress.hasValidValues()
        : true;
    }

    const isValid =
      validateEmailResults &&
      validatePasswordResults &&
      validateFirstNameResults &&
      validateLastNameResults &&
      validateDateResults &&
      validateAddressResults &&
      validateBillingAddressResults;

    if (isValid) {
      this.signUp.removeAttribute('disabled');
    } else {
      this.signUp.setAttribute('disabled', 'true');
    }
  }

  private renderH2(): void {
    this.h2.setText('Registration');
    this.h2.appendTo(this.getElement());
  }

  private renderPopupMessage(message: string, callback?: () => void): void {
    this.ApiPopup.appendTo(this.getElement());
    this.ApiPopup.setErrorMessage(message);
    if (callback) this.ApiPopup.onClose(callback);
    this.ApiPopup.show();
  }

  private customerBuild(): Customer {
    const uuid = crypto.randomUUID();
    const email = this.emailInput.getInputValue();
    const password = this.passwordInput.getInputValue();
    const firstName = this.firstNameInput.getInputValue();
    const lastName = this.lastNameInput.getInputValue();
    const date = this.dateInput.getInputValue();
    const shippingAddress = this.shippingAddress.getAddress();
    let billingAddress;
    let addresses;
    if (this.useAsBillingCheckbox.isChecked()) {
      billingAddress = shippingAddress;
      addresses = [shippingAddress];
    } else {
      billingAddress = this.billingAddress.getAddress();
      addresses = [shippingAddress, billingAddress];
    }

    const customer = CustomerBuilder()
      .withId(uuid)
      .withEmail(email)
      .withPassword(password)
      .withFirstName(firstName)
      .withLastName(lastName)
      .withDateOfBirth(date)
      .withAddresses(addresses)
      .withDefaultShippingAddressId(
        this.shippingAddress.isChecked() ? shippingAddress.key : undefined,
      )
      .withDefaultBillingAddressId(this.billingAddress.isChecked() ? billingAddress.key : undefined)
      .build();
    return customer;
  }

  private async onSignUp(): Promise<void> {
    const customer = this.customerBuild();
    const password = this.passwordInput.getInputValue();

    await SdkApi()
      .createCustomer(customer)
      .then(() => {
        this.renderPopupMessage(
          `Customer with email: ${customer.email} and firstName: ${customer.firstName} created`,
          () => {
            router.navigate('#/main');
          },
        );
      })
      .then(() => {
        return SdkApi().withPasswordFlow(customer.email, password).getMe();
      })
      .then((response) => {
        UserCache.set(response.body);
        PublishSubscriber().publish('userLoggedIn', { userId: customer.email });
      })
      .catch((error) => {
        this.renderPopupMessage(error.body.message, () => void 0);
      });
  }

  private renderForm(): void {
    this.form.appendTo(this.getElement());
  }

  private renderSignUpButton(): void {
    this.signUp.appendTo(this.form.getElement());
  }

  private createEmailInput(): EmailValidatingInput {
    return emailValidatingInput(this.updateSignUpButton.bind(this), {
      id: '',
      className: '',
      text: 'Email *',
    });
  }

  private createPasswordInput(): PasswordValidatingInput {
    return passwordValidatingInput(this.updateSignUpButton.bind(this), {
      id: '',
      className: '',
      text: 'Password *',
    });
  }

  private createFirstNameInput(): FirstNameValidatingInput {
    return firstNameValidatingInput(this.updateSignUpButton.bind(this), {
      id: '',
      className: '',
      text: 'First name *',
    });
  }

  private createLastNameInput(): LastNameValidatingInput {
    return lastNameValidatingInput(this.updateSignUpButton.bind(this), {
      id: '',
      className: '',
      text: 'Last name *',
    });
  }

  private createDateInput(): DateValidatingInput {
    return dateValidatingInput(this.updateSignUpButton.bind(this), {
      id: '',
      className: '',
      text: 'Date of birth *',
    });
  }

  private createShippingAddress(): AddressComponent {
    return addressComponent(
      undefined,
      'shipping-address-component',
      'Shipping Address',
      'Use as default shipping address',
      this.updateSignUpButton.bind(this),
    );
  }

  private createBillingAddress(): AddressComponent {
    return addressComponent(
      undefined,
      'billing-address-component',
      'Billing Address',
      'Use as default billing address',
      this.updateSignUpButton.bind(this),
    );
  }

  private createUseAsBillingCheckbox(): Checkbox {
    return checkbox(undefined, 'address-checkbox', undefined, 'Use the same address for billing');
  }

  private createSignUpButton(): BaseComponent<HTMLButtonElement> {
    const signUpButton = createButton(undefined, 'button');
    signUpButton.setText('Sign Up');
    signUpButton.addClass('submit-button');
    signUpButton.setAttribute('disabled', 'true');
    return signUpButton;
  }
}

export const Registration = (): RegistrationComponent => new RegistrationComponent();
