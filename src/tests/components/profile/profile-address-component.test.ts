import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { AddressData } from '@/app/components/profile/profile';
import { profileAddressComponent } from '@/app/components/profile/profile-address-component';

/* eslint-disable max-lines-per-function */
describe('ProfileAddressComponent', () => {
  let component: ReturnType<typeof profileAddressComponent>;
  let root: HTMLElement;
  let onSaveMock: ReturnType<typeof vi.fn>;
  let onCancelMock: ReturnType<typeof vi.fn>;
  let onDeleteMock: ReturnType<typeof vi.fn>;

  const initialData: AddressData = {
    id: '1',
    key: '1',
    street: 'Main St',
    city: 'New York',
    postalCode: '10001',
    country: 'US',
    isDefaultBilling: true,
    isDefaultShipping: false,
  };

  beforeEach(() => {
    onSaveMock = vi.fn();
    onCancelMock = vi.fn();
    onDeleteMock = vi.fn();

    component = profileAddressComponent(
      'profile-address-component',
      'profile-address-component',
      'Address',
      undefined,
      onSaveMock,
      onCancelMock,
      onDeleteMock,
    );

    root = component.getElement();
    document.body.append(root);
    component.setData(initialData);
  });

  it('renders inputs and buttons', () => {
    expect(root.querySelector('h3')?.textContent).toBe('Address');
    expect(root.querySelector('button')?.textContent).toBe('Edit');
  });

  it('enters editable mode on edit button click', () => {
    const editButton = root.querySelector('button');
    if (editButton instanceof HTMLButtonElement) {
      editButton.click();
    }

    expect(root.querySelector('button')?.classList.contains('hidden')).toBe(true);
    expect(component['saveButton'].getElement().classList.contains('hidden')).toBe(false);
  });

  it('cancels editing and triggers cancel callback', () => {
    component.setEditable();
    const cancelButton = root.querySelector('.cancel-button');
    if (cancelButton instanceof HTMLButtonElement) {
      cancelButton.click();
    }

    expect(onCancelMock).toHaveBeenCalledOnce();
    expect(component['editButton'].getElement().classList.contains('hidden')).toBe(false);
  });

  it('saves valid data and calls save callback', () => {
    component.setEditable();
    component['streetInput'].setInputValue('Broadway');
    component['cityInput'].setInputValue('Los Angeles');
    component['postalCodeInput'].setInputValue('90001');
    component['countrySelect'].setValue('US');
    component['billingRadioButton'].setChecked(true);
    component['shippingRadioButton'].setChecked(false);

    const saveButton = component['saveButton'].getElement();
    if (saveButton instanceof HTMLButtonElement) {
      saveButton.click();
    }

    expect(onSaveMock).toHaveBeenCalledOnce();
    expect(onSaveMock).toHaveBeenCalledWith({
      id: '1',
      key: '1',
      street: 'Broadway',
      city: 'Los Angeles',
      country: 'US',
      postalCode: '90001',
      isDefaultBilling: true,
      isDefaultShipping: false,
    });
  });

  it('deletes address and calls delete callback with id', () => {
    const deleteButton = component['deleteButton'].getElement();
    if (deleteButton instanceof HTMLButtonElement) {
      deleteButton.click();
    }

    expect(onDeleteMock).toHaveBeenCalledOnce();
    expect(onDeleteMock).toHaveBeenCalledWith('1');
  });

  it('hasValidValues returns false when street is empty', () => {
    component.setEditable();
    component['streetInput'].setInputValue('');
    expect(component.hasValidValues()).toBe(false);
  });
});
