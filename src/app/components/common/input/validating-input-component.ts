import BaseComponent from '../base-component';
import { createDiv, createInput, createLabel, createSpan } from '../base-component-factory';
import { Tags } from '../tags';
import { InputType } from './input-types';
import type { ValidatingRule } from './validating-rules';

const Classes = {
  HIDDEN: 'hidden',
};

export type LabelParameters = {
  id: string;
  className: string;
  text: string;
};

export abstract class BaseValidatingInputComponent extends BaseComponent<HTMLDivElement> {
  protected readonly input: BaseComponent<HTMLInputElement>;

  private readonly labelParams?: LabelParameters;
  private readonly label?: BaseComponent<HTMLLabelElement>;
  private readonly tooltip: BaseComponent<HTMLDivElement>;
  private readonly validationPair: Map<ValidatingRule, BaseComponent<HTMLSpanElement>> = new Map();
  private readonly onInputChangedCallback: (() => void) | undefined;

  constructor(
    id: string = '',
    className: string = 'validating-input-component',
    onInputChangedCallback: (() => void) | undefined,
    labelParameters: LabelParameters | undefined,
  ) {
    super(Tags.DIV, id, className);

    this.labelParams = labelParameters;
    this.label = this.createLabel();
    this.input = this.createInput();
    this.tooltip = this.createTooltip();
    this.onInputChangedCallback = onInputChangedCallback;
    this.createErrorMessages();
  }

  public setActive(state: boolean): void {
    this.input.getElement().readOnly = !state;
  }

  public getInputValue(): string {
    return this.input.getElement().value || '';
  }

  public setInputValue(value: string): void {
    this.input.getElement().value = value;
  }

  public isValid(): boolean {
    const inputValue = this.getInputValue();
    for (const rule of this.validationPair.keys()) {
      if (!rule.test(inputValue)) return false;
    }

    return true;
  }

  protected renderComponent(): void {
    this.label?.appendTo(this.getElement());
    this.input.appendTo(this.getElement());
    this.afterRenderInput();
    this.tooltip.appendTo(this.getElement());
    this.renderErrorMessages();
  }

  protected addEventListeners(): void {
    this.input.addEventListener('input', () => {
      this.validate();
      this.onInputChangedCallback?.();
    });
  }

  protected validate(): boolean {
    const inputValue = this.getInputValue();
    let isValid = true;

    for (const [rule, span] of this.validationPair) {
      const isRuleValid = rule.test(inputValue);
      if (!isRuleValid) isValid = false;
      this.renderValidationErrorForRule(span, isRuleValid);
    }

    this.renderValidationErrorForRule(
      this.tooltip,
      isValid || (inputValue === '' && !this.showTooltipWhenValueIsEmpty()),
    );
    return isValid;
  }

  protected showTooltipWhenValueIsEmpty(): boolean {
    return false;
  }

  protected afterRenderInput(): void {}

  protected createInput(
    id: string = '',
    className: string = '',
    type: InputType = InputType.TEXT,
    placeholder: string = '',
  ): BaseComponent<HTMLInputElement> {
    const input = createInput(id, className);
    const inputElement = input.getElement();
    inputElement.placeholder = placeholder;
    inputElement.type = type;

    return input;
  }

  protected createLabel(): BaseComponent<HTMLLabelElement> | undefined {
    if (!this.labelParams) return undefined;

    const label = createLabel(this.labelParams.id, this.labelParams.className);
    label.setText(this.labelParams.text);

    return label;
  }

  private createTooltip(): BaseComponent<HTMLDivElement> {
    const tooltip = createDiv(undefined, 'tooltip');
    tooltip.addClass(Classes.HIDDEN);

    return tooltip;
  }

  private createErrorMessages(): void {
    for (const [key, value] of this.getValidationRulePairs()) {
      const span = createSpan(undefined, 'error-message');
      span.setText(value);

      this.validationPair.set(key, span);
    }
  }

  private renderErrorMessages(): void {
    for (const span of this.validationPair.values()) {
      span.appendTo(this.tooltip.getElement());
    }
  }

  private renderValidationErrorForRule(
    component: BaseComponent<HTMLSpanElement>,
    isValidFlag: boolean,
  ): void {
    if (isValidFlag) {
      component.addClass(Classes.HIDDEN);
    } else {
      component.removeClass(Classes.HIDDEN);
    }
  }

  protected abstract getValidationRulePairs(): Map<ValidatingRule, string>;
}
