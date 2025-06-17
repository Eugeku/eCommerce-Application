import { describe, it, expect, beforeEach } from 'vitest';
import { InputType } from '@/app/components/common/input/input-types';
import { PasswordValidatingInput } from '@/app/components/common/input/password-validating-input';
import { eyeClose, eyeOpen } from '@/app/utils/svg-constants';
import { passwordRules } from '@/app/utils/validation-constants';

/* eslint-disable max-lines-per-function */
function extractPathD(svg: string): string | null {
  const match = svg.match(/<path[^>]*d="([^"]+)"/);
  return match ? match[1] : 'undefined';
}

describe('PasswordValidatingInput', () => {
  let component: PasswordValidatingInput;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    component = new PasswordValidatingInput(
      'password-input',
      'password-input',
      undefined,
      undefined,
    );
    inputElement = component['input'].getElement();
  });

  it('should initialize with password hidden and render eyeClose icon', () => {
    expect(inputElement.type).toBe(InputType.PASSWORD);

    const controlElement = component['passwordControl'].getElement();
    const path = controlElement.querySelector('path');
    expect(path?.getAttribute('d')).toBe(extractPathD(eyeClose));
  });

  it('should toggle password visibility', () => {
    const inputElement = component['input'].getElement();
    expect(component['isPasswordVisible']).toBe(false);

    component.setPasswordVisible(true);
    expect(inputElement.type).toBe(InputType.TEXT);
    let path = component['passwordControl'].getElement().querySelector('path');
    expect(path?.getAttribute('d')).toBe(extractPathD(eyeOpen));

    component.setPasswordVisible(false);
    expect(inputElement.type).toBe(InputType.PASSWORD);
    path = component['passwordControl'].getElement().querySelector('path');
    expect(path?.getAttribute('d')).toBe(extractPathD(eyeClose));
  });

  it('should toggle password visibility on control click', () => {
    const controlElement = component['passwordControl'].getElement();

    controlElement.click();
    expect(inputElement.type).toBe(InputType.TEXT);
    expect(component['isPasswordVisible']).toBe(true);

    controlElement.click();
    expect(inputElement.type).toBe(InputType.PASSWORD);
    expect(component['isPasswordVisible']).toBe(false);
  });

  it('should return all password validation rules', () => {
    const rules = component['getValidationRulePairs']();
    expect(rules.size).toBe(6);
    expect(rules.has(passwordRules.minLength)).toBe(true);
    expect(rules.has(passwordRules.upperCase)).toBe(true);
    expect(rules.has(passwordRules.lowerCase)).toBe(true);
    expect(rules.has(passwordRules.digit)).toBe(true);
    expect(rules.has(passwordRules.specialChar)).toBe(true);
    expect(rules.has(passwordRules.noWhitespace)).toBe(true);
  });
});
