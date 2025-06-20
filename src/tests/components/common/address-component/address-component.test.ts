import { addressComponent } from '@common-components/address-component/address-component';
import type { AddressComponent } from '@common-components/address-component/address-component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AddressComponent', () => {
  let component: AddressComponent;

  beforeEach(() => {
    component = addressComponent(
      'address-id',
      'address-class',
      'Shipping Address',
      'Use as default',
    );
    document.body.append(component.getElement());
  });

  it('should render correctly with given id and class', () => {
    const element = component.getElement();
    expect(element.id).toBe('address-id');
    expect(element.classList.contains('address-class')).toBe(true);
  });

  it('should be enabled by default', () => {
    expect(component.isEnabled()).toBe(true);
  });

  it('should allow setting enabled state', () => {
    component.setEnabled(false);
    expect(component.isEnabled()).toBe(false);
  });

  it('should return checkbox state', () => {
    expect(component.isChecked()).toBe(false);
  });

  it('should return false if any required field is empty or invalid', () => {
    expect(component.hasValidValues()).toBe(false);
  });
});
