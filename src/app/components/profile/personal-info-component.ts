import BaseComponent from '@app/components/common/base-component';
import { createButton, createH3 } from '@components/common/base-component-factory';
import { dateValidatingInput } from '@components/common/input/date-validating-input';
import type { DateValidatingInput } from '@components/common/input/date-validating-input';
import { emailValidatingInput } from '@components/common/input/email-validating-input';
import type { EmailValidatingInput } from '@components/common/input/email-validating-input';
import { firstNameValidatingInput } from '@components/common/input/first-name-validating-input';
import type { FirstNameValidatingInput } from '@components/common/input/first-name-validating-input';
import { lastNameValidatingInput } from '@components/common/input/last-name-validating-input';
import type { LastNameValidatingInput } from '@components/common/input/last-name-validating-input';
import { Tags } from '@components/common/tags';
import type { PersonalInfoData } from './profile';

const Classes = {
  HIDDEN: 'hidden',
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
  private readonly cancelButton: BaseComponent<HTMLButtonElement>;
  private readonly onSaveCallback: (data: PersonalInfoData) => void;
  private readonly onChangePasswordCallback: () => void;

  private data: PersonalInfoData | undefined;

  constructor(
    id: string = 'personal-info',
    className: string = 'personal-info',
    onSaveCallback: (data: PersonalInfoData) => void,
    onChangePasswordCallback: () => void,
  ) {
    super(Tags.DIV, id, className);

    this.onSaveCallback = onSaveCallback;
    this.onChangePasswordCallback = onChangePasswordCallback;

    this.personalInfoTitle = createH3(undefined, 'heading-3');
    this.firstNameInput = this.createFirstNameInput();
    this.lastNameInput = this.createLastNameInput();
    this.dateInput = this.createDateInput();
    this.emailInput = this.createEmailInput();
    this.changePasswordButton = this.createChangePassword();
    this.editButton = this.createEditButton();
    this.saveButton = this.createSaveButton();
    this.cancelButton = this.createCancelButton();

    this.init();
  }

  public setData(data: PersonalInfoData): void {
    this.data = data;
    this.restoreData();
  }

  public setEditable(): void {
    this.setActive(true);

    this.editButton.addClass(Classes.HIDDEN);
    this.changePasswordButton.addClass(Classes.HIDDEN);

    this.saveButton.removeClass(Classes.HIDDEN);
    this.cancelButton.removeClass(Classes.HIDDEN);
  }

  public setUneditable(): void {
    this.setActive(false);

    this.editButton.removeClass(Classes.HIDDEN);
    this.changePasswordButton.removeClass(Classes.HIDDEN);

    this.saveButton.addClass(Classes.HIDDEN);
    this.cancelButton.addClass(Classes.HIDDEN);
  }

  public setActive(state: boolean): void {
    this.firstNameInput.setActive(state);
    this.lastNameInput.setActive(state);
    this.dateInput.setActive(state);
    this.emailInput.setActive(state);
  }

  protected addEventListeners(): void {
    this.editButton.addEventListener('click', () => {
      this.setEditable();
    });

    this.saveButton.addEventListener('click', () => {
      this.onSave();
    });

    this.cancelButton.addEventListener('click', () => {
      this.restoreData();
      this.setUneditable();
    });

    this.changePasswordButton.addEventListener('click', () => {
      this.onChangePasswordCallback();
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
    this.cancelButton.appendTo(this.getElement());
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
    button.addClass('save-button');
    return button;
  }

  private createCancelButton(): BaseComponent<HTMLButtonElement> {
    const button = createButton(undefined, 'button');
    button.setText('Cancel');
    button.addClass('cancel-button');
    return button;
  }

  private createChangePassword(): BaseComponent<HTMLButtonElement> {
    const changePasswordButton = createButton(undefined, 'button');
    changePasswordButton.setText('Change Password');
    changePasswordButton.addClass('change-password-button');
    return changePasswordButton;
  }

  private createFirstNameInput(): FirstNameValidatingInput {
    return firstNameValidatingInput(this.updateSaveButton.bind(this), {
      id: '',
      className: '',
      text: 'First name',
    });
  }

  private createLastNameInput(): LastNameValidatingInput {
    return lastNameValidatingInput(this.updateSaveButton.bind(this), {
      id: '',
      className: '',
      text: 'Last name',
    });
  }

  private createDateInput(): DateValidatingInput {
    return dateValidatingInput(this.updateSaveButton.bind(this), {
      id: '',
      className: '',
      text: 'Date of birth',
    });
  }

  private createEmailInput(): EmailValidatingInput {
    return emailValidatingInput(this.updateSaveButton.bind(this), {
      id: '',
      className: '',
      text: 'Email',
    });
  }

  private updateSaveButton(): void {
    const validateFirstName = this.firstNameInput.isValid();
    const validateLastName = this.lastNameInput.isValid();
    const validateBirthDate = this.dateInput.isValid();
    const validateEmail = this.emailInput.isValid();

    if (validateFirstName && validateLastName && validateBirthDate && validateEmail) {
      this.saveButton.removeAttribute('disabled');
    } else {
      this.saveButton.setAttribute('disabled', 'true');
    }
  }

  private restoreData(): void {
    if (!this.data) return;

    this.firstNameInput.setInputValue(this.data.firstName);
    this.lastNameInput.setInputValue(this.data.lastName);
    this.dateInput.setInputValue(this.data.dateOfBirth);
    this.emailInput.setInputValue(this.data.email);
  }

  private onSave(): void {
    const firstName = this.firstNameInput.getInputValue();
    const lastName = this.lastNameInput.getInputValue();
    const dateOfBirth = this.dateInput.getInputValue();
    const email = this.emailInput.getInputValue();

    this.onSaveCallback({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
    });
  }
}

export const PersonalInfo = (
  onSaveCallback: (data: PersonalInfoData) => void,
  onChangePasswordCallback: () => void,
  id: string = 'personal-info',
  className: string = 'personal-info',
): PersonalInfoComponent =>
  new PersonalInfoComponent(id, className, onSaveCallback, onChangePasswordCallback);
