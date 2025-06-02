import BaseComponent from '@common-components/base-component';
import { createH2, createUl } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import { CategoryNav } from './category-nav/category-nav';
import { Filter } from './filter/filter';
import { ProductList } from './product-list/product-list';
import './store.scss';

class StoreComponent extends BaseComponent<HTMLDivElement> {
  private readonly categoryNav = CategoryNav();
  private readonly filter = Filter();
  private readonly productList = ProductList();
  private readonly h1: BaseComponent<HTMLHeadingElement>;

  constructor(id: string = 'store-component', className: string = 'store-component') {
    super(Tags.DIV, id, className);

    this.h1 = createH2(undefined, 'heading-2');
    this.init();
  }

  protected renderComponent(): void {
    this.renderHeading1();
    this.renderCategoryNav();
    this.renderFilter();
    this.renderProductList();
  }

  protected addEventListeners(): void {
    return;
  }

  private renderHeading1(): void {
    this.h1.appendTo(this.getElement());
    this.h1.setText('Buy yourself an equipment!');
  }

  private renderCategoryNav(): void {
    this.categoryNav.appendTo(this.getElement());
  }

  private renderFilter(): void {
    this.filter.appendTo(this.getElement());
  }

  private renderProductList(): void {
    this.productList.appendTo(this.getElement());
  }
}

export const Store = (): StoreComponent => new StoreComponent();
