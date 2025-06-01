import BaseComponent from '@app/components/common/base-component';
import { createOption } from '@app/components/common/base-component-factory';
import { Tags } from '@app/components/common/tags';
import type { CountrySelectOptionPair } from '@/app/utils/countries-pairs';

export class CountrySelect extends BaseComponent<HTMLSelectElement> {
  private readonly onSelectChangedCallback: (() => void) | undefined;
  private readonly optionPairs: BaseComponent<HTMLOptionElement>[] = [];

  constructor(
    optionPairs: CountrySelectOptionPair[],
    onSelectChangedCalback: (() => void) | undefined,
    id: string = '',
    className: string = 'country-select-component',
  ) {
    super(Tags.SELECT, id, className);

    this.onSelectChangedCallback = onSelectChangedCalback;
    this.createOptions(optionPairs);

    this.init();
  }

  public setActive(state: boolean): void {
    this.getElement().disabled = !state;
  }

  public getValue(): string {
    return this.getElement().value || '';
  }

  public setValue(value: string): void {
    this.getElement().value = value;
  }

  public reset(): void {
    this.getElement().value = this.optionPairs[0].getElement().value;
  }

  protected renderComponent(): void {
    this.renderOptions();
  }

  protected addEventListeners(): void {
    this.addEventListener('change', () => {
      this.onSelectChangedCallback?.();
    });
  }

  private createOptions(optionPairs: CountrySelectOptionPair[]): void {
    for (const pair of optionPairs) {
      const option = createOption(undefined, 'country-select-option');
      option.getElement().value = pair.value;
      option.setText(pair.text);

      this.optionPairs.push(option);
    }
  }

  private renderOptions(): void {
    for (const option of this.optionPairs) {
      option.appendTo(this.getElement());
    }
  }
}
