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

const Classes = {
  HIDDEN: 'hidden',
};

export type PersonalInfoData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
};

export class PersonalInfoComponent extends BaseComponent<HTMLDivElement> {
  private readonly personalInfoTitle: BaseComponent<HTMLHeadingElement>;
  private readonly firstNameInput: FirstNameValidatingInput;
  private readonly lastNameInput: LastNameValidatingInput;
  private readonly dateInput: DateValidatingInput;
  private readonly emailInput: EmailValidatingInput;
  private readonly changePasswordButton: BaseComponent<HTMLButtonElement>;
  private readonly editButton: BaseComponent<HTMLButtonElement>;
  private readonly saveButton: BaseComponent<HTMLButtonElement>;

  constructor(id: string = 'personal-info', className: string = 'personal-info') {
    super(Tags.DIV, id, className);

    this.personalInfoTitle = createH3(undefined, 'heading-3');
    this.firstNameInput = this.createFirstNameInput();
    this.lastNameInput = this.createLastNameInput();
    this.dateInput = this.createDateInput();
    this.emailInput = this.createEmailInput();
    this.changePasswordButton = this.createChangePassword();
    this.editButton = this.createEditButton();
    this.saveButton = this.createSaveButton();

    this.init();
  }

  public setData(data: PersonalInfoData): void {
    this.firstNameInput.setInputValue(data.firstName);
    this.lastNameInput.setInputValue(data.lastName);
    this.dateInput.setInputValue(data.dateOfBirth);
    this.emailInput.setInputValue(data.email);
  }

  public setEditable(): void {
    this.setActive(true);

    this.editButton.addClass(Classes.HIDDEN);
    this.saveButton.removeClass(Classes.HIDDEN);
  }

  public setUneditable(): void {
    this.setActive(false);

    this.editButton.removeClass(Classes.HIDDEN);
    this.saveButton.addClass(Classes.HIDDEN);
  }

  public setActive(state: boolean): void {
    this.firstNameInput.setActive(state);
    this.lastNameInput.setActive(state);
    this.dateInput.setActive(state);
    this.emailInput.setActive(state);
  }

  protected addEventListeners(): void {
    this.saveButton.addEventListener('click', () => {
      this.setUneditable();
    });

    this.editButton.addEventListener('click', () => {
      this.setEditable();
    });
  }

  protected renderComponent(): void {
    this.renderPersonalInfoTitle();
    this.firstNameInput.appendTo(this.getElement());
    this.lastNameInput.appendTo(this.getElement());
    this.dateInput.appendTo(this.getElement());
    this.emailInput.appendTo(this.getElement());
    this.changePasswordButton.appendTo(this.getElement());
    this.editButton.appendTo(this.getElement());
    this.saveButton.appendTo(this.getElement());
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

  private createSaveButton(): BaseComponent<HTMLButtonElement> {
    const button = createButton(undefined, 'button');
    button.setText('Save');
    button.addClass('address-button');
    return button;
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
