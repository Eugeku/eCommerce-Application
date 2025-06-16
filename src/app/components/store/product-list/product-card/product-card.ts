import type { Product, ProductProjection } from '@commercetools/platform-sdk';
import BaseComponent from '@common-components/base-component';
import {
  createButton,
  createDiv,
  createH2,
  createP,
} from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './product-card.scss';

class ProductCardComponent extends BaseComponent<HTMLDivElement> {
  public readonly product: ProductProjection;
  private readonly cardWrapper: BaseComponent<HTMLDivElement>;
  private readonly productImage: BaseComponent<HTMLDivElement>;
  private readonly productCardControls: BaseComponent<HTMLDivElement>;
  private readonly productCardPriceWrapper: BaseComponent<HTMLDivElement>;
  private readonly productPrice: BaseComponent<HTMLDivElement>;
  private readonly productSalesPrice: BaseComponent<HTMLDivElement>;
  private readonly productTextWrapper: BaseComponent<HTMLDivElement>;
  private readonly productText: BaseComponent<HTMLHeadingElement>;
  private readonly productDescription: BaseComponent<HTMLParagraphElement>;
  private readonly addToCartButton: BaseComponent<HTMLButtonElement>;
  private readonly quantityControls: BaseComponent<HTMLDivElement>;
  private readonly plusButton: BaseComponent<HTMLButtonElement>;
  private readonly counter: BaseComponent<HTMLDivElement>;
  private readonly minusButton: BaseComponent<HTMLButtonElement>;

  constructor(
    id: string = '',
    className: string = 'product-card-component',
    product: ProductProjection,
  ) {
    super(Tags.DIV, id, className);
    this.product = product;
    this.cardWrapper = createDiv(undefined, 'product-card-wrapper');

    this.productImage = createDiv(undefined, 'product-card-image');
    this.productCardControls = createDiv(undefined, 'product-card-controls');

    this.productCardPriceWrapper = createDiv(undefined, 'product-card-price-wrapper');
    this.productPrice = createDiv(undefined, 'product-card-price');
    this.productSalesPrice = createDiv(undefined, 'product-card-sales-price');

    this.addToCartButton = createButton(undefined, 'add-to-cart-button');

    this.quantityControls = createDiv(undefined, 'quantity-controls hidden');
    this.plusButton = createButton(undefined, 'quantity-button');
    this.counter = createDiv(undefined, 'counter');
    this.minusButton = createButton(undefined, 'quantity-button');

    this.productTextWrapper = createDiv(undefined, 'product-card-text-wrapper');
    this.productText = createH2(undefined, 'product-card-text');
    this.productDescription = createP(undefined, 'product-card-description');

    this.init();
  }

  protected renderComponent(): void {
    this.renderCardWrapper();
    this.renderProductImage();

    this.renderProductCardControls();
    this.renderProductPriceWrapper();
    this.renderProductPrice();
    this.renderAddToCartButton();
    this.renderQuantityControls();

    this.renderProductTextWrapper();
    this.renderProductText();
    this.renderProductDescription();
  }

  protected addEventListeners(): void {
    this.addEventListenerAddToCartButton();
    this.addEventListenerMinusButton();
    this.addEventListenerPlusButton();
  }

  protected addEventListenerAddToCartButton(): void {
    this.addToCartButton.addEventListener('click', () => {
      console.log(
        'Added Item to Cart for the first time: ' + this.productText.getElement().textContent,
      );
      // add item to cart
      // change counter
      this.addToCartButton.addClass('hidden');
      this.quantityControls.removeClass('hidden');
    });
    this.addToCartButton.stopPropagation();
  }

  protected addEventListenerMinusButton(): void {
    this.minusButton.addEventListener('click', () => {
      console.log('Removed Item: ' + this.productText.getElement().textContent);
      // remove item from cart
      // change counter
      // check for (quantity <= 0), if true show addToCartButton and hide quantityControls
    });
    this.minusButton.stopPropagation();
  }

  protected addEventListenerPlusButton(): void {
    this.plusButton.addEventListener('click', () => {
      console.log('Added Item: ' + this.productText.getElement().textContent);
      // check available amount of products, if true
      //then
      // add item to cart
      // change counter
      //else
      // show error
    });
    this.plusButton.stopPropagation();
  }

  private renderCardWrapper(): void {
    this.cardWrapper.appendTo(this.getElement());
  }

  private renderProductImage(): void {
    this.productImage.appendTo(this.cardWrapper.getElement());
    if (this.product.masterVariant && this.product.masterVariant.images) {
      this.productImage.setAttribute(
        'style',
        `background-image: url(${this.product.masterVariant.images[0].url})`,
      );
    }
  }

  private renderProductCardControls(): void {
    this.productCardControls.appendTo(this.cardWrapper.getElement());
  }

  private renderProductPriceWrapper(): void {
    this.productCardPriceWrapper.appendTo(this.productCardControls.getElement());
  }

  private renderProductPrice(): void {
    this.productPrice.appendTo(this.productCardPriceWrapper.getElement());
    if (this.product.masterVariant && this.product.masterVariant.prices) {
      this.productPrice.setText(
        ('$' + this.product.masterVariant.prices[0].value.centAmount / 100).toString(),
      );
      if (
        this.product.masterVariant &&
        this.product.masterVariant.prices[0].discounted &&
        this.product.masterVariant.prices[0].discounted.value.centAmount
      ) {
        this.productPrice.addClass('discounted');
        this.productSalesPrice.setText(
          ('$' + this.product.masterVariant.prices[0].discounted.value.centAmount / 100).toString(),
        );
        this.productSalesPrice.appendTo(this.productCardPriceWrapper.getElement());
      }
    }
  }

  private renderAddToCartButton(): void {
    this.addToCartButton.setText('Add to cart');
    this.addToCartButton.appendTo(this.productCardControls.getElement());
  }

  private renderQuantityControls(): void {
    this.quantityControls.appendTo(this.productCardControls.getElement());
    this.minusButton.appendTo(this.quantityControls.getElement());
    this.minusButton.setText('-');
    this.counter.appendTo(this.quantityControls.getElement());
    this.counter.setText('0');
    this.plusButton.appendTo(this.quantityControls.getElement());
    this.plusButton.setText('+');
  }

  private renderProductTextWrapper(): void {
    this.productTextWrapper.appendTo(this.productCardControls.getElement());
  }

  private renderProductText(): void {
    if (this.product && this.product.name['en-US']) {
      this.productText.setText(this.product.name['en-US']);
    }
    this.productText.appendTo(this.productTextWrapper.getElement());
  }

  private renderProductDescription(): void {
    if (this.product && this.product.description && this.product.description['en-US']) {
      this.productDescription.setText(this.product.description['en-US']);
    }
    this.productDescription.appendTo(this.productTextWrapper.getElement());
  }
}

export const ProductCard = (product: ProductProjection): ProductCardComponent =>
  new ProductCardComponent(undefined, undefined, product);
