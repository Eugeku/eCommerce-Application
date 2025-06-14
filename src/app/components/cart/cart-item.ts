import type { ProductProjection } from '@commercetools/platform-sdk';
import BaseComponent from '@common-components/base-component';
import {
  createButton,
  createDiv,
  createH3,
  createImg,
  createInput,
  createP,
} from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';

export class CartItemComponent extends BaseComponent<HTMLDivElement> {
  public readonly product: ProductProjection;

  private readonly itemImage: BaseComponent<HTMLImageElement>;
  private readonly itemDetails: BaseComponent<HTMLDivElement>;
  private readonly itemName: BaseComponent<HTMLHeadingElement>;
  private readonly quantityCounter: BaseComponent<HTMLDivElement>;
  private readonly decreaseButton: BaseComponent<HTMLButtonElement>;
  private readonly quantityInput: BaseComponent<HTMLInputElement>;
  private readonly increaseButton: BaseComponent<HTMLButtonElement>;
  private readonly itemPrice: BaseComponent<HTMLParagraphElement>;
  private readonly removeButton: BaseComponent<HTMLButtonElement>;

  constructor(
    id: string = '',
    className: string = 'cart-item-component',
    product: ProductProjection,
  ) {
    super(Tags.DIV, id, className);

    this.product = product;
    this.itemImage = createImg(undefined, 'item-image');
    this.itemDetails = createDiv(undefined, 'item-details');
    this.itemName = createH3(undefined, 'item-name');
    this.quantityCounter = createDiv(undefined, 'quantity-counter');
    this.decreaseButton = this.createDecreaseButton();
    this.quantityInput = createInput(undefined, 'quantity-input');
    this.increaseButton = this.createIncreaseButton();
    this.itemPrice = createP(undefined, 'item-price');
    this.removeButton = this.createRemoveButton();

    this.init();
  }

  protected renderComponent(): void {
    this.renderItemImage();
    this.itemDetails.appendTo(this.getElement());
    this.renderItemName();
    this.quantityCounter.appendTo(this.itemDetails.getElement());
    this.decreaseButton.appendTo(this.quantityCounter.getElement());
    this.renderQuantityInput();
    this.increaseButton.appendTo(this.quantityCounter.getElement());
    this.renderItemPrice();
    this.removeButton.appendTo(this.getElement());
  }

  protected addEventListeners(): void {}

  private renderItemImage(): void {
    this.itemImage.appendTo(this.getElement());
    if (this.product.masterVariant && this.product.masterVariant.images) {
      this.itemImage.setAttribute(
        'style',
        `background-image: url(${this.product.masterVariant.images[0].url})`,
      );
    }
  }

  private renderItemName(): void {
    if (this.product && this.product.name['en-US']) {
      this.itemName.setText(this.product.name['en-US']);
    }
    this.itemName.appendTo(this.itemDetails.getElement());
  }

  private createDecreaseButton(): BaseComponent<HTMLButtonElement> {
    const decreaseButton = createButton(undefined, 'button');
    decreaseButton.setText('-');
    decreaseButton.addClass('decrease-button');
    return decreaseButton;
  }

  private renderQuantityInput(): void {
    this.quantityInput.setAttribute('type', 'text');
    this.quantityInput.setAttribute('value', '1');
    this.quantityInput.setAttribute('readonly', 'true');
    this.quantityInput.appendTo(this.quantityCounter.getElement());
  }

  private createIncreaseButton(): BaseComponent<HTMLButtonElement> {
    const increaseButton = createButton(undefined, 'button');
    increaseButton.setText('+');
    increaseButton.addClass('increase-button');
    return increaseButton;
  }

  private renderItemPrice(): void {
    this.itemPrice.setText('$59.99 × 2 = $119.98');
    this.itemPrice.appendTo(this.itemDetails.getElement());
  }

  private createRemoveButton(): BaseComponent<HTMLButtonElement> {
    const removeButton = createButton(undefined, 'button');
    removeButton.addClass('remove-button');
    return removeButton;
  }
}

export const CartItem = (product: ProductProjection): CartItemComponent =>
  new CartItemComponent(undefined, undefined, product);
