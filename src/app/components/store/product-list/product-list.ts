import BaseComponent from '@common-components/base-component';
import { Tags } from '@common-components/tags';
import { Pagination } from './pagination/pagination';
import { ProductCard } from './product-card/product-card';
import { createDiv } from '../../common/base-component-factory';
import { router } from '@/app/router';
import { SdkApi, type SearchOptions } from '@/app/utils/api/commerce-sdk-api';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import './product-list.scss';

class ProductListComponent extends BaseComponent<HTMLDivElement> {
  public items: ReturnType<typeof ProductCard>[] = [];
  private readonly pagination = Pagination();
  private readonly productCardWrapper: BaseComponent<HTMLDivElement>;
  private searchOptions: SearchOptions;

  constructor(id: string = 'product-list-component', className: string = 'product-list-component') {
    super(Tags.DIV, id, className);

    this.searchOptions = {
      filter: [],
      sort: ['name.en-US asc'],
      limit: 10,
      offset: 0,
    };

    this.productCardWrapper = createDiv(undefined, 'product-list-wrapper');

    this.init();
  }

  protected renderComponent(): void {
    this.renderProductCardWrapper();
    this.renderProductListBySearchOptions();
    this.renderPagination();
  }

  protected addEventListeners(): void {
    this.addEventListenerSelectByCategory();
    this.addEventListenerSelectBySearch();
    this.addEventListenerSelectBySort();
    this.addEventListenerSelectByPagination();
  }

  private addEventListenerSelectByCategory(): void {
    PublishSubscriber().subscribe('selectCategoryId', (payload) => {
      this.searchOptions.offset = 0;
      this.pagination.setCurrentPage(0);
      if (payload.categoryId.toLowerCase() === 'all') {
        this.renderProductListBySearchOptions([]);
      } else {
        this.renderProductListBySearchOptions([`categories.id:"${payload.categoryId}"`]);
      }
    });
  }

  private addEventListenerSelectBySearch(): void {
    PublishSubscriber().subscribe('searchText', (payload) => {
      this.renderProductListBySearchOptions(
        undefined,
        undefined,
        undefined,
        undefined,
        payload.text,
      );
    });
  }

  private addEventListenerSelectBySort(): void {
    PublishSubscriber().subscribe('sort', (payload) => {
      this.renderProductListBySearchOptions(undefined, [`${payload.text}`]);
    });
  }

  private addEventListenerSelectByPagination(): void {
    PublishSubscriber().subscribe('pagination', (payload) => {
      this.renderProductListBySearchOptions(
        undefined,
        undefined,
        undefined,
        payload.page * this.searchOptions.limit,
      );
    });
  }

  private renderPagination(): void {
    this.pagination.appendTo(this.getElement());
  }

  private async loadProductsBySearchOptions(
    filter?: string[],
    sort?: string[],
    limit?: number,
    offset?: number,
    searchText?: string,
  ): Promise<void> {
    this.productCardWrapper.removeChildren();
    this.items = [];

    if (filter !== undefined) {
      this.searchOptions.filter = [...new Set(filter)];
    }

    if (sort !== undefined) {
      this.searchOptions.sort = sort;
    }

    if (limit !== undefined) {
      this.searchOptions.limit = limit;
    }

    if (offset !== undefined) {
      this.searchOptions.offset = offset;
    }

    if (searchText !== undefined) {
      this.searchOptions.searchText = searchText;
    }

    await SdkApi()
      .getProductsBySearchOptions(this.searchOptions)
      .then((response) => {
        response.body?.results.map((product) => {
          const productCard = ProductCard(product);
          this.items.push(productCard);
        });
        if (response.body?.total) {
          this.pagination.setTotalPages(Math.ceil(response.body.total / this.searchOptions.limit));
        }
      });
  }

  private renderProductCardWrapper(): void {
    this.productCardWrapper.appendTo(this.getElement());
  }

  private async renderProductListBySearchOptions(
    filter?: string[],
    sort?: string[],
    limit?: number,
    offset?: number,
    text?: string,
  ): Promise<void> {
    await this.loadProductsBySearchOptions(filter, sort, limit, offset, text);
    this.items.map((item) => {
      item.appendTo(this.productCardWrapper.getElement());
      item.addEventListener('click', () => {
        router.addRoute(`#/store/${item.product.key}`, () => {
          PublishSubscriber().publish('selectProduct', { product: item.product });
        });
        router.navigate(`#/store/${item.product.key}`);
      });
    });
  }
}

export const ProductList = (): ProductListComponent => new ProductListComponent();
