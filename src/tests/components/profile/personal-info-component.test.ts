import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PersonalInfo } from '@/app/components/profile/personal-info-component';
import type { PersonalInfoData } from '@/app/components/profile/profile';

/* eslint-disable max-lines-per-function */
describe('PersonalInfoComponent', () => {
  let onSaveMock: ReturnType<typeof vi.fn>;
  let onChangePasswordMock: ReturnType<typeof vi.fn>;
  let component: ReturnType<typeof PersonalInfo>;
  let root: HTMLElement;

  const initialData: PersonalInfoData = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '2000-01-01',
    email: 'john@example.com',
  };

  beforeEach(() => {
    onSaveMock = vi.fn();
    onChangePasswordMock = vi.fn();
    component = PersonalInfo(onSaveMock, onChangePasswordMock);
    root = component.getElement();
    document.body.append(root);
    component.setData(initialData);
  });

  it('should render title and buttons', () => {
    expect(root.querySelector('.heading-3')?.textContent).toBe('Personal Info');
    expect(root.querySelector('.edit-button')).toBeTruthy();
    expect(root.querySelector('.save-button')).toBeTruthy();
    expect(root.querySelector('.cancel-button')).toBeTruthy();
    expect(root.querySelector('.change-password-button')).toBeTruthy();
  });

  it('should set editable state on edit button click', () => {
    const editButton = root.querySelector('.edit-button');
    if (editButton instanceof HTMLElement) {
      editButton.click();
    }

    expect(root.querySelector('.edit-button')?.classList.contains('hidden')).toBe(true);
    expect(root.querySelector('.change-password-button')?.classList.contains('hidden')).toBe(true);
    expect(root.querySelector('.save-button')?.classList.contains('hidden')).toBe(false);
    expect(root.querySelector('.cancel-button')?.classList.contains('hidden')).toBe(false);
  });

  it('should restore data and set uneditable on cancel', () => {
    const editButton = root.querySelector('.edit-button');
    if (editButton instanceof HTMLElement) {
      editButton.click();

      component['firstNameInput'].setInputValue('Jane');
      component['lastNameInput'].setInputValue('Smith');

      const cancelButton = root.querySelector('.cancel-button');
      if (cancelButton instanceof HTMLElement) {
        cancelButton.click();
      }

      expect(component['firstNameInput'].getInputValue()).toBe('John');
      expect(component['lastNameInput'].getInputValue()).toBe('Doe');
      expect(root.querySelector('.edit-button')?.classList.contains('hidden')).toBe(false);
    }
  });

  it('should call onSaveCallback with correct data on save', () => {
    const editButton = root.querySelector('.edit-button');
    if (editButton instanceof HTMLElement) {
      editButton.click();
    }

    component['firstNameInput'].setInputValue('Jane');
    component['lastNameInput'].setInputValue('Smith');
    component['dateInput'].setInputValue('1995-12-25');
    component['emailInput'].setInputValue('jane@example.com');

    const saveButton = root.querySelector('.save-button');
    if (saveButton instanceof HTMLElement) {
      saveButton.click();
    }

    expect(onSaveMock).toHaveBeenCalledOnce();
    expect(onSaveMock).toHaveBeenCalledWith({
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1995-12-25',
      email: 'jane@example.com',
    });
  });

  it('should call onChangePasswordCallback when change password button is clicked', () => {
    const changePasswordButton = root.querySelector('.change-password-button');
    if (changePasswordButton instanceof HTMLElement) {
      changePasswordButton.click();
    }

    expect(onChangePasswordMock).toHaveBeenCalledOnce();
  });

  it('should disable save button if inputs are invalid', () => {
    component['firstNameInput'].setInputValue('');
    component['updateSaveButton']();

    const saveButton = root.querySelector('.save-button');
    if (saveButton instanceof HTMLButtonElement) {
      expect(saveButton.disabled).toBe(true);
    } else {
      throw new TypeError('Save button not found or is not an HTMLButtonElement');
    }
  });
});
