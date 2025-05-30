import BaseComponent from '@app/components/common/base-component';
import { dateValidatingInput } from '@components/common/input/date-validating-input';
import type { DateValidatingInput } from '@components/common/input/date-validating-input';
import { emailValidatingInput } from '@components/common/input/email-validating-input';
import type { EmailValidatingInput } from '@components/common/input/email-validating-input';
import { firstNameValidatingInput } from '@components/common/input/first-name-validating-input';
import type { FirstNameValidatingInput } from '@components/common/input/first-name-validating-input';
import { lastNameValidatingInput } from '@components/common/input/last-name-validating-input';
import type { LastNameValidatingInput } from '@components/common/input/last-name-validating-input';
import { createButton, createH3 } from '../common/base-component-factory';
import { Tags } from '../common/tags';

export class PersonalInfoComponent extends BaseComponent<HTMLDivElement> {
  private readonly personalInfoTitle: BaseComponent<HTMLHeadingElement>;
  private readonly firstNameInput: FirstNameValidatingInput;
  private readonly lastNameInput: LastNameValidatingInput;
  private readonly dateInput: DateValidatingInput;
  private readonly emailInput: EmailValidatingInput;
  private readonly changePasswordButton: BaseComponent<HTMLButtonElement>;
  private readonly editButton: BaseComponent<HTMLButtonElement>;

  constructor(id: string = 'personal-info', className: string = 'personal-info') {
    super(Tags.DIV, id, className);

    this.personalInfoTitle = createH3(undefined, 'heading-3');
    this.firstNameInput = this.createFirstNameInput();
    this.lastNameInput = this.createLastNameInput();
    this.dateInput = this.createDateInput();
    this.emailInput = this.createEmailInput();
    this.changePasswordButton = this.createChangePassword();
    this.editButton = this.createEditButton();

    this.init();
  }

  protected addEventListeners(): void {}

  protected renderComponent(): void {
    this.renderPersonalInfoTitle();
    this.firstNameInput.appendTo(this.getElement());
    this.lastNameInput.appendTo(this.getElement());
    this.dateInput.appendTo(this.getElement());
    this.emailInput.appendTo(this.getElement());
    this.changePasswordButton.appendTo(this.getElement());
    this.editButton.appendTo(this.getElement());
  }

  private renderPersonalInfoTitle(): void {
    this.personalInfoTitle.setText('Personal Info');
    this.personalInfoTitle.appendTo(this.getElement());
  }

  private createEditButton(): BaseComponent<HTMLButtonElement> {
    const editButton = createButton(undefined, 'button');
    editButton.setText('Edit');
    editButton.addClass('edit-button');
    return editButton;
  }

  private createChangePassword(): BaseComponent<HTMLButtonElement> {
    const changePasswordButton = createButton(undefined, 'button');
    changePasswordButton.setText('Change Password');
    changePasswordButton.addClass('change-password-button');
    return changePasswordButton;
  }

  private createFirstNameInput(): FirstNameValidatingInput {
    return firstNameValidatingInput(undefined, {
      id: '',
      className: '',
      text: 'First name',
    });
  }

  private createLastNameInput(): LastNameValidatingInput {
    return lastNameValidatingInput(undefined, {
      id: '',
      className: '',
      text: 'Last name',
    });
  }

  private createDateInput(): DateValidatingInput {
    return dateValidatingInput(undefined, {
      id: '',
      className: '',
      text: 'Date of birth',
    });
  }

  private createEmailInput(): EmailValidatingInput {
    return emailValidatingInput(undefined, {
      id: '',
      className: '',
      text: 'Email',
    });
  }
}

export const PersonalInfo = (): PersonalInfoComponent => new PersonalInfoComponent();
