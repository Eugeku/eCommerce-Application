import BaseComponent from '@common-components/base-component';
import { Tags } from '@common-components/tags';
import { createInput, createOption, createSelect } from '../../common/base-component-factory';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import './filter.scss';

class FilterComponent extends BaseComponent<HTMLDivElement> {
  private readonly filterInput: BaseComponent<HTMLInputElement>;
  private readonly select: BaseComponent<HTMLSelectElement>;

  constructor(id: string = 'filter-component', className: string = 'filter-component') {
    super(Tags.DIV, id, className);
    this.filterInput = createInput(undefined, 'filter-input');
    this.select = createSelect(undefined, 'filter-select');

    this.init();
  }

  protected renderComponent(): void {
    this.renderFilterInput();
    this.renderSelect();
  }

  protected addEventListeners(): void {
    this.addInputEventListener();
  }

  private addInputEventListener(): void {
    this.filterInput.addEventListener('input', () => {
      PublishSubscriber().publish('searchText', {
        text: this.filterInput.getElement().value.trim(),
      });
    });
  }

  private renderFilterInput(): void {
    this.filterInput.appendTo(this.getElement());
    this.filterInput.setAttribute('placeholder', 'Search...');
  }

  private renderSelect(): void {
    this.select.appendTo(this.getElement());

    const sortOptions = {
      'Name ASC': 'name.en-US asc',
      'Name DESC': 'name.en-US desc',
      'Price ASC': 'price asc',
      'Price DESC': 'price desc',
    };

    Object.entries(sortOptions).map(([label, value]) => {
      const option = createOption(undefined, 'filter-select-option');
      option.getElement().value = value;
      option.getElement().textContent = label;
      option.appendTo(this.select.getElement());
    });

    this.select.addEventListener('change', () => {
      const value = this.select.getElement().value;
      PublishSubscriber().publish('sort', { text: value });
    });
  }
}

export const Filter = (): FilterComponent => new FilterComponent();
