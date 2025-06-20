import type BaseComponent from '@app/components/common/base-component';
import { createButton, createDiv, createH3 } from '@app/components/common/base-component-factory';
import type { PasswordValidatingInput } from '@app/components/common/input/password-validating-input';
import { passwordValidatingInput } from '@app/components/common/input/password-validating-input';
import { BasePopupComponent } from '@app/components/popups/popup-base';
import './change-password-popup.scss';

export class ChangePasswordPopupComponent extends BasePopupComponent {
  private readonly header: BaseComponent<HTMLHeadingElement>;
  private readonly currentPasswordInput: PasswordValidatingInput;
  private readonly newPasswordInput: PasswordValidatingInput;
  private readonly buttonsContainer: BaseComponent<HTMLDivElement>;
  private readonly saveButton: BaseComponent<HTMLButtonElement>;
  private onPasswordChanged: (currentPassword: string, newPassword: string) => void;

  constructor(
    onPasswordChange: (currentPassword: string, newPassword: string) => void,
    id: string = 'change-password-popup-component',
    className: string = 'change-password-popup-component',
  ) {
    super(id, className);

    this.onPasswordChanged = onPasswordChange;
    this.header = createH3(undefined, 'heading-3');
    this.currentPasswordInput = this.createPasswordInput();
    this.newPasswordInput = this.createNewPasswordInput();
    this.buttonsContainer = createDiv(undefined, 'button-container');
    this.saveButton = this.createSaveButton();

    this.init();
  }

  protected close(): void {
    super.close();

    this.currentPasswordInput.setInputValue('');
    this.currentPasswordInput.setPasswordVisible(false);
    this.newPasswordInput.setInputValue('');
    this.newPasswordInput.setPasswordVisible(false);
  }

  protected addEventListeners(): void {
    super.addEventListeners();

    this.saveButton.addEventListener('click', () => {
      this.onPasswordChanged(
        this.currentPasswordInput.getInputValue(),
        this.newPasswordInput.getInputValue(),
      );
      this.close();
    });
  }

  protected afterRenderContainer(): void {
    this.renderHeader();
    this.currentPasswordInput.appendTo(this.container.getElement());
    this.newPasswordInput.appendTo(this.container.getElement());
    this.buttonsContainer.appendTo(this.container.getElement());
    this.saveButton.appendTo(this.buttonsContainer.getElement());
  }

  protected renderCloseButton(): void {
    this.closeButton.appendTo(this.buttonsContainer.getElement());
    this.closeButton.setText('Cancel');
  }

  private renderHeader(): void {
    this.header.appendTo(this.container.getElement());
    this.header.setText('Password change');
  }

  private createPasswordInput(): PasswordValidatingInput {
    return passwordValidatingInput(this.updateSaveButton.bind(this), {
      id: '',
      className: '',
      text: 'Current password',
    });
  }

  private createNewPasswordInput(): PasswordValidatingInput {
    return passwordValidatingInput(this.updateSaveButton.bind(this), {
      id: '',
      className: '',
      text: 'New password',
    });
  }

  private createSaveButton(): BaseComponent<HTMLButtonElement> {
    const button = createButton(undefined, 'button');
    button.setText('Save');
    button.addClass('save-button');
    button.setAttribute('disabled', 'true');
    return button;
  }

  private updateSaveButton(): void {
    const currentPassword = this.currentPasswordInput.isValid();
    const newPassword = this.newPasswordInput.isValid();

    if (currentPassword && newPassword) {
      this.saveButton.removeAttribute('disabled');
    } else {
      this.saveButton.setAttribute('disabled', 'true');
    }
  }
}

export const ChangePasswordPopup = (
  onPasswordChange: (currentPassword: string, newPassword: string) => void,
): ChangePasswordPopupComponent => new ChangePasswordPopupComponent(onPasswordChange);
