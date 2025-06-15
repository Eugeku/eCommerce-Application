import { type Category } from '@commercetools/platform-sdk';
import BaseComponent from '@common-components/base-component';
import { Tags } from '@common-components/tags';
import { createDiv } from '@/app/components/common/base-component-factory';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import './category-element.scss';

class CategoryElementComponent extends BaseComponent<HTMLLIElement> {
  private readonly category: Category | string;
  private readonly categoryImg: BaseComponent<HTMLDivElement>;
  private readonly categoryName: BaseComponent<HTMLDivElement>;

  constructor(
    id: string = '',
    className: string = 'category-element-component',
    category: Category | string,
  ) {
    super(Tags.LI, id, className);
    this.category = category;
    this.categoryImg = createDiv(undefined, 'category-img');
    this.categoryName = createDiv(undefined, 'category-name');
    this.init();
  }

  public setActive(flag: boolean): void {
    if (flag) {
      this.getElement().classList.add('active');
    } else {
      this.getElement().classList.remove('active');
    }
  }

  protected renderComponent(): void {
    this.renderCategoryImage();
    this.renderCategoryName();
  }

  protected addEventListeners(): void {
    this.addEventListener('click', () => {
      if (typeof this.category === 'string') {
        PublishSubscriber().publish('selectCategoryId', { categoryId: this.category });
      } else {
        PublishSubscriber().publish('selectCategoryId', { categoryId: this.category.id });
      }
    });
  }

  private renderCategoryImage(): void {
    if (typeof this.category !== 'string' && this.category.name['en-US']) {
      this.categoryImg.getElement().style.backgroundImage = `url(./assets/icons/${this.category.name['en-US'].toLowerCase()}.png)`;
    } else {
      this.categoryImg.getElement().style.backgroundImage = `url(./assets/icons/${this.category.toString().toLowerCase()}.png)`;
    }
    this.categoryImg.appendTo(this.getElement());
  }

  private renderCategoryName(): void {
    if (typeof this.category !== 'string' && this.category.name['en-US']) {
      this.categoryName.setText(
        this.category.name['en-US'][0].toUpperCase() + this.category.name['en-US'].slice(1),
      );
    } else {
      this.categoryName.setText(
        this.category.toString()[0].toUpperCase() + this.category.toString().slice(1),
      );
    }
    this.categoryName.appendTo(this.getElement());
  }
}

export const CategoryElement = (category: Category | string = 'All'): CategoryElementComponent =>
  new CategoryElementComponent(undefined, undefined, category);
