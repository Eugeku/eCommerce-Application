import { router } from '@app/router';
import { type ProductProjection } from '@commercetools/platform-sdk';
import BaseComponent from '@common-components/base-component';
import {
  createH3,
  createP,
  createDiv,
  createImg,
  createButton,
} from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import './product-page.scss';

class ProductPageComponent extends BaseComponent<HTMLDivElement> {
  private totalImages: number;
  private currentImage: number;
  private readonly product: ProductProjection | undefined;
  private readonly wrapper: BaseComponent<HTMLDivElement>;
  private readonly textsContainer: BaseComponent<HTMLDivElement>;
  private readonly h3: BaseComponent<HTMLHeadingElement>;
  private readonly description: BaseComponent<HTMLParagraphElement>;
  private readonly sliderSmall: BaseComponent<HTMLDivElement>;
  private readonly imagesContainer: BaseComponent<HTMLDivElement>;
  private readonly pricesDiv: BaseComponent<HTMLDivElement>;
  private readonly defaultPrice: BaseComponent<HTMLParagraphElement>;
  private readonly salePrice: BaseComponent<HTMLParagraphElement>;
  private readonly buttonLeft: BaseComponent<HTMLButtonElement>;
  private readonly buttonRight: BaseComponent<HTMLButtonElement>;
  private readonly buttonBack: BaseComponent<HTMLButtonElement>;

  constructor(
    id: string = 'product-page-component',
    className: string = 'product-page-component',
    product?: ProductProjection,
  ) {
    super(Tags.DIV, id, className);
    this.product = product;

    this.wrapper = createDiv(undefined, 'wrapper');
    this.textsContainer = createDiv(undefined, 'texts-container');
    this.h3 = createH3(undefined, 'heading-3');
    this.description = createP(undefined, 'description');
    this.sliderSmall = createDiv(undefined, 'slider-small');
    this.imagesContainer = createDiv(undefined, 'images-container');
    this.pricesDiv = createDiv(undefined, 'prices-container');
    this.defaultPrice = createP(undefined, 'default-price');
    this.salePrice = createP(undefined, 'sale-price');
    this.buttonLeft = createButton(undefined, 'button-left');
    this.buttonRight = createButton(undefined, 'button-right');
    this.buttonBack = createButton(undefined, 'button-back');

    this.totalImages = 0;
    this.currentImage = 0;

    this.init();
  }

  protected renderComponent(): void {
    this.renderWrapper();
    this.renderBackButton();
  }

  protected renderWrapper(): void {
    this.renderSliderSmall();
    this.renderTextsContainer();
    this.wrapper.appendTo(this.getElement());
  }

  protected renderBackButton(): void {
    this.buttonBack.appendTo(this.getElement());
    this.buttonBack.setText('Back');
  }

  protected openModalSlider(): void {
    if (this.product) {
      PublishSubscriber().publish('openModalSlider', { product: this.product });
    }
  }

  protected addEventListeners(): void {
    this.addEventListenerLeftButton();
    this.addEventListenerRightButton();
    this.addEventListenerBackButton();
  }

  private renderHeading3(): void {
    this.h3.appendTo(this.textsContainer.getElement());
    if (this.product && this.product.name['en-US']) {
      this.h3.setText(this.product.name['en-US']);
    }
  }

  private renderDescription(): void {
    this.description.appendTo(this.textsContainer.getElement());
    if (this.product && this.product.description && this.product.description['en-US']) {
      this.description.setText(this.product.description['en-US']);
    }
  }

  private renderPrices(): void {
    this.pricesDiv.appendTo(this.textsContainer.getElement());
    this.defaultPrice.appendTo(this.pricesDiv.getElement());
    if (this.product && this.product.masterVariant && this.product.masterVariant.prices) {
      this.defaultPrice.setText(
        (this.product.masterVariant.prices[0].value.centAmount / 100 + '$').toString(),
      );
    }
    this.salePrice.appendTo(this.pricesDiv.getElement());
    if (
      this.product &&
      this.product.masterVariant &&
      this.product.masterVariant.prices &&
      this.product.masterVariant.prices[0].discounted
    ) {
      this.salePrice.setText(
        (this.product.masterVariant.prices[0].discounted.value.centAmount / 100 + '$').toString(),
      );
      this.defaultPrice.addClass('discounted');
    }
  }

  private renderTextsContainer(): void {
    this.renderHeading3();
    this.renderDescription();
    this.renderPrices();
    this.textsContainer.appendTo(this.wrapper.getElement());
  }

  private renderImages(): void {
    if (this.product && this.product.masterVariant && this.product.masterVariant.images) {
      this.totalImages = this.product.masterVariant.images.length;
      for (const image of this.product.masterVariant.images) {
        const picDiv = document.createElement('div');
        picDiv.classList.add('slider-small-div');
        picDiv.style.backgroundImage = `url(${image.url})`;
        picDiv.addEventListener('click', () => {
          this.openModalSlider();
        });
        this.imagesContainer.getElement().append(picDiv);
      }
      this.imagesContainer.appendTo(this.sliderSmall.getElement());
    }
  }

  private renderSliderSmall(): void {
    this.renderImages();
    this.buttonLeft.setAttribute('disabled', 'true');
    this.buttonLeft.appendTo(this.sliderSmall.getElement());
    this.buttonLeft.getElement().style.backgroundImage = 'url(./assets/icons/arrow-left.png)';
    this.buttonRight.appendTo(this.sliderSmall.getElement());
    this.buttonRight.getElement().style.backgroundImage = 'url(./assets/icons/arrow-left.png)';
    this.sliderSmall.appendTo(this.wrapper.getElement());
  }

  private addEventListenerLeftButton(): void {
    this.buttonLeft.addEventListener('click', () => {
      if (!this.buttonLeft.getElement().hasAttribute('disabled')) {
        if (this.currentImage === this.totalImages - 1) {
          this.buttonRight.getElement().removeAttribute('disabled');
        }
        this.currentImage -= 1;
        const sliderWidth: number = this.imagesContainer.getElement().offsetWidth;
        const offset: number = this.currentImage * sliderWidth;
        this.imagesContainer.getElement().style.transform = `translateX(-${offset}px)`;
        if (this.currentImage <= 0) {
          this.buttonLeft.getElement().setAttribute('disabled', 'true');
        }
      }
    });
  }

  private addEventListenerRightButton(): void {
    this.buttonRight.addEventListener('click', () => {
      if (!this.buttonRight.getElement().hasAttribute('disabled')) {
        if (this.currentImage === 0) {
          this.buttonLeft.getElement().removeAttribute('disabled');
        }
        this.currentImage += 1;
        const sliderWidth: number = this.imagesContainer.getElement().offsetWidth;
        const offset: number = this.currentImage * sliderWidth;
        this.imagesContainer.getElement().style.transform = `translateX(-${offset}px)`;
        if (this.currentImage >= this.totalImages - 1) {
          this.buttonRight.getElement().setAttribute('disabled', 'true');
        }
      }
    });
  }

  private addEventListenerBackButton(): void {
    this.buttonBack.addEventListener('click', () => {
      router.navigate('#/store');
    });
  }
}

export const ProductPage = (product?: ProductProjection): ProductPageComponent =>
  new ProductPageComponent(undefined, undefined, product);
