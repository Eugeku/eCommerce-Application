import BaseComponent from '../base-component';
import { createOption } from '../base-component-factory';
import { Tags } from '../tags';

export type CountrySelectOptionPair = {
  value: string;
  text: string;
};

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
