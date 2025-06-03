import BaseComponent from '@common-components/base-component';
import { Tags } from '@common-components/tags';
import './category-nav.scss';
import { CategoryElement } from './category-element/category-element';
import { SdkApi } from '@/app/utils/api/commerce-sdk-api';

class CategoryNavComponent extends BaseComponent<HTMLUListElement> {
  private items: ReturnType<typeof CategoryElement>[] = [];

  constructor(id: string = 'categor-nav-component', className: string = 'categor-nav-component') {
    super(Tags.DIV, id, className);

    this.init();
  }

  protected renderComponent(): void {
    this.renderCategoryNav();
  }

  protected addEventListeners(): void {
    return;
  }

  private async loadCategories(): Promise<void> {
    await SdkApi()
      .getCategories()
      .then((response) => {
        console.log(response);
        response.body?.results.map((category) => {
          const categoryItem = CategoryElement(category);
          this.items.push(categoryItem);
        });
      });
  }

  private async renderCategoryNav(): Promise<void> {
    const categoryElement = CategoryElement();
    this.items.push(categoryElement);
    categoryElement.setActive(true);
    categoryElement.appendTo(this.getElement());

    await this.loadCategories();

    this.items.map((item) => {
      item.appendTo(this.getElement());
      item.addEventListener('click', () => {
        this.items.map((item) => item.setActive(false));
        item.setActive(true);
      });
    });
  }
}

export const CategoryNav = (): CategoryNavComponent => new CategoryNavComponent();
