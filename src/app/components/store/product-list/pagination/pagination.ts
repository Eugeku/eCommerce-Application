import BaseComponent from '@common-components/base-component';
import { Tags } from '@common-components/tags';
import './pagination.scss';
import {
  createButton,
  createDiv,
  createSpan,
} from '@/app/components/common/base-component-factory';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';

class PaginationComponent extends BaseComponent<HTMLLIElement> {
  private currentPageNumber: number;
  private totalPages: number;
  private fullLeftArrow: BaseComponent<HTMLButtonElement>;
  private fullLeftImage: BaseComponent<HTMLSpanElement>;
  private leftArrow: BaseComponent<HTMLButtonElement>;
  private leftImage: BaseComponent<HTMLSpanElement>;
  private currentPage: BaseComponent<HTMLDivElement>;
  private currentPageText: BaseComponent<HTMLSpanElement>;
  private rightArrow: BaseComponent<HTMLButtonElement>;
  private rightImage: BaseComponent<HTMLSpanElement>;
  private fullRightArrow: BaseComponent<HTMLButtonElement>;
  private fullRightImage: BaseComponent<HTMLSpanElement>;

  constructor(id: string = 'pagination-component', className: string = 'pagination-component') {
    super(Tags.DIV, id, className);
    this.currentPageNumber = 0;
    this.totalPages = 1;
    this.fullLeftArrow = createButton(undefined, 'full-left-arrow button-pagination');
    this.fullLeftImage = createSpan(undefined, 'full-left-image');
    this.leftArrow = createButton(undefined, 'left-arrow button-pagination');
    this.leftImage = createSpan(undefined, 'left-image');
    this.currentPage = createDiv(undefined, 'current-page button-pagination');
    this.currentPageText = createSpan(undefined, 'current-page-text');
    this.rightArrow = createButton(undefined, 'right-arrow button-pagination');
    this.rightImage = createSpan(undefined, 'right-image');
    this.fullRightArrow = createButton(undefined, 'full-right-arrow button-pagination');
    this.fullRightImage = createSpan(undefined, 'full-right-image');

    this.init();
  }

  public setTotalPages(total: number): void {
    this.totalPages = total;
    this.renderCurrentPageNumber();
  }

  public setCurrentPage(page: number): void {
    this.currentPageNumber = page;
    this.renderCurrentPageNumber();
  }

  protected renderComponent(): void {
    this.renderFullLeftArrow();
    this.renderLeftArrow();
    this.renderCurrentPage();
    this.renderRightArrow();
    this.renderFullRightArrow();
  }

  protected addEventListeners(): void {
    this.addfullLeftArrowEventListeners();
    this.addLeftArrowEventListeners();
    this.addRightArrowEventListeners();
    this.addfullRightArrowEventListeners();
  }

  private addRightArrowEventListeners(): void {
    this.rightArrow.addEventListener('click', () => {
      this.currentPageNumber += 1;
      this.renderCurrentPageNumber();
      PublishSubscriber().publish('pagination', { page: this.currentPageNumber });
    });
  }

  private addLeftArrowEventListeners(): void {
    this.leftArrow.addEventListener('click', () => {
      this.currentPageNumber -= 1;
      this.renderCurrentPageNumber();
      PublishSubscriber().publish('pagination', { page: this.currentPageNumber });
    });
  }

  private addfullLeftArrowEventListeners(): void {
    this.fullLeftArrow.addEventListener('click', () => {
      if (this.currentPageNumber !== 0) {
        this.currentPageNumber = 0;
        this.renderCurrentPageNumber();
        PublishSubscriber().publish('pagination', { page: this.currentPageNumber });
      }
    });
  }

  private addfullRightArrowEventListeners(): void {
    this.fullRightArrow.addEventListener('click', () => {
      if (this.currentPageNumber !== this.totalPages - 1) {
        this.currentPageNumber = this.totalPages - 1;
        this.renderCurrentPageNumber();
        PublishSubscriber().publish('pagination', { page: this.currentPageNumber });
      }
    });
  }

  private renderFullLeftArrow(): void {
    this.fullLeftImage.setText('<<');
    this.fullLeftImage.appendTo(this.fullLeftArrow.getElement());
    this.fullLeftArrow.appendTo(this.getElement());
  }

  private renderLeftArrow(): void {
    this.leftImage.setText('<');
    this.leftImage.appendTo(this.leftArrow.getElement());
    this.leftArrow.appendTo(this.getElement());
  }

  private renderCurrentPage(): void {
    this.renderCurrentPageNumber();
    this.currentPageText.appendTo(this.currentPage.getElement());
    this.currentPage.appendTo(this.getElement());
  }

  private renderCurrentPageNumber(): void {
    this.currentPageText.setText((this.currentPageNumber + 1).toString());

    const isFirstPage = this.currentPageNumber === 0;
    if (isFirstPage) {
      this.leftArrow.setAttribute('disabled', 'true');
      this.fullLeftArrow.setAttribute('disabled', 'true');
    } else {
      this.leftArrow.removeAttribute('disabled');
      this.fullLeftArrow.removeAttribute('disabled');
    }

    const isLastPage = this.currentPageNumber >= this.totalPages - 1;
    if (isLastPage) {
      this.rightArrow.setAttribute('disabled', 'true');
      this.fullRightArrow.setAttribute('disabled', 'true');
    } else {
      this.rightArrow.removeAttribute('disabled');
      this.fullRightArrow.removeAttribute('disabled');
    }
  }

  private renderRightArrow(): void {
    this.rightImage.setText('>');
    this.rightImage.appendTo(this.rightArrow.getElement());
    this.rightArrow.appendTo(this.getElement());
  }

  private renderFullRightArrow(): void {
    this.fullRightImage.setText('>>');
    this.fullRightImage.appendTo(this.fullRightArrow.getElement());
    this.fullRightArrow.appendTo(this.getElement());
  }
}

export const Pagination = (): PaginationComponent => new PaginationComponent();
