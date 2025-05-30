import BaseComponent from './base-component';
import { createInput, createLabel } from './base-component-factory';
import { Tags } from './tags';

export abstract class BaseChoiceComponent extends BaseComponent<HTMLDivElement> {
  protected readonly input: BaseComponent<HTMLInputElement>;
  private readonly label: BaseComponent<HTMLSpanElement>;

  private readonly onChangedCallback: (() => void) | undefined;

  constructor(
    id: string = '',
    className: string = '',
    onChangedCallback: (() => void) | undefined,
    labelText: string,
    labelClass: string,
    inputType: string,
    inputClass: string,
  ) {
    super(Tags.DIV, id, className);

    this.onChangedCallback = onChangedCallback;

    this.input = this.createInput(inputType, inputClass);
    this.label = this.createLabel(labelText, labelClass);
  }

  public setActive(state: boolean): void {
    this.input.getElement().disabled = !state;
  }

  public isChecked(): boolean {
    return this.input.getElement().checked;
  }

  protected renderComponent(): void {
    this.input.appendTo(this.label.getElement());
    this.label.appendTo(this.getElement());
  }

  protected addEventListeners(): void {
    this.input.addEventListener('change', () => {
      this.onChangedCallback?.();
    });
  }

  private createInput(inputType: string, inputClass: string): BaseComponent<HTMLInputElement> {
    const input = createInput(undefined, inputClass);
    input.getElement().type = inputType;
    return input;
  }

  private createLabel(text: string, labelClass: string): BaseComponent<HTMLLabelElement> {
    const label = createLabel(undefined, labelClass);
    label.setText(text);
    return label;
  }
}
