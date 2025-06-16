import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EmailValidatingInput } from '@/app/components/common/input/email-validating-input';

describe('EmailValidatingInput', () => {
  let component: EmailValidatingInput;

  beforeEach(() => {
    component = new EmailValidatingInput('email-input', 'email-input', vi.fn(), undefined);
  });

  it('should render with correct attributes', () => {
    const element = component.getElement();
    expect(element.id).toBe('email-input');
    expect(element.className).toBe('email-input');

    const input = component['input'].getElement();
    expect(input?.getAttribute('name')).toBe('email');
    expect(input?.getAttribute('autocomplete')).toBe('on');
  });

  it('should validate correct and incorrect emails properly', () => {
    component.setInputValue('user@example.com');
    expect(component.isValid()).toBe(true);

    component.setInputValue('invalid-email');
    expect(component.isValid()).toBe(false);

    component.setInputValue('   user@example.com   ');
    expect(component.isValid()).toBe(false);

    component.setInputValue('user@');
    expect(component.isValid()).toBe(false);
  });

  it('should create input with type "text" and proper placeholder', () => {
    const input = component['input'].getElement();

    expect(input?.getAttribute('type')).toBe('text');
    expect(input?.getAttribute('placeholder')).toBe('Enter your e-mail');
  });
});
