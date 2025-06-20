import { addressRules } from '@/app/utils/validation-constants';

export type ValidatingRule = {
  test(value: string): boolean;
};

export class IsLateThan1900YearValidatingRule implements ValidatingRule {
  public test(value: string): boolean {
    if (!value) return true;
    const date = new Date(value);
    const referenceDate = new Date('1900-01-01');

    return date.getTime() > referenceDate.getTime();
  }
}

export class IsEarlyThanNowValidatingRule implements ValidatingRule {
  public test(value: string): boolean {
    if (!value) return true;
    const date = new Date(value);
    const referenceDate = new Date();

    return date.getTime() < referenceDate.getTime();
  }
}

export class IsEmptyDateValidatingRule implements ValidatingRule {
  public test(value: string): boolean {
    return value !== '';
  }
}

export class IsOlderThanValidatingRule implements ValidatingRule {
  private readonly age: number;

  constructor(age: number) {
    this.age = age;
  }

  public test(value: string): boolean {
    if (!value) return true;

    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate > today) return true;
    // today.setDate(today.getDate() + 1);
    const referenceDate = new Date(birthDate);
    referenceDate.setFullYear(birthDate.getFullYear() + this.age);

    return today > referenceDate;
  }
}

export class IsUSAAddressCodeValidatingRule implements ValidatingRule {
  public test(value: string): boolean {
    return addressRules.zip5.test(value) || addressRules.zip9.test(value);
  }
}
