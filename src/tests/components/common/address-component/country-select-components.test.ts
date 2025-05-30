import { CountrySelect } from '@common-components/address-component/country-select-component';
import type { CountrySelectOptionPair } from '@common-components/address-component/country-select-component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('CountrySelect', () => {
  let component: CountrySelect;
  const optionPairs: CountrySelectOptionPair[] = [
    { value: 'US', text: 'United States' },
    { value: 'DE', text: 'Germany' },
  ];

  beforeEach(() => {
    component = new CountrySelect(optionPairs, undefined, 'country-id', 'custom-class');
    document.body.append(component.getElement());
  });

  it('should render select with correct id and class', () => {
    const element = component.getElement();
    expect(element.tagName).toBe('SELECT');
    expect(element.id).toBe('country-id');
    expect(element.classList.contains('custom-class')).toBe(true);
  });

  it('should render correct number of options with correct values and texts', () => {
    const options = component.getElement().querySelectorAll('option');
    expect(options.length).toBe(2);
    expect(options[0].value).toBe('US');
    expect(options[0].textContent).toBe('United States');
    expect(options[1].value).toBe('DE');
    expect(options[1].textContent).toBe('Germany');
  });

  it('should return selected value', () => {
    const select = component.getElement();
    select.value = 'DE';
    expect(component.getValue()).toBe('DE');
  });

  it('should call callback when selection changes', () => {
    const callback = vi.fn();
    const compWithCallback = new CountrySelect(optionPairs, callback);
    document.body.append(compWithCallback.getElement());

    compWithCallback.getElement().value = 'DE';
    compWithCallback.getElement().dispatchEvent(new Event('change', { bubbles: true }));

    expect(callback).toHaveBeenCalled();
  });
});
