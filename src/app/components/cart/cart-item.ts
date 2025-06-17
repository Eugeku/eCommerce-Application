import type { LineItem } from '@commercetools/platform-sdk';
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
import { SdkApi } from '@/app/utils/api/commerce-sdk-api';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';

class CartItemComponent extends BaseComponent<HTMLDivElement> {
  public lineItem: LineItem;
  private readonly itemImage: BaseComponent<HTMLImageElement>;
  private readonly itemDetails: BaseComponent<HTMLDivElement>;
  private readonly itemName: BaseComponent<HTMLHeadingElement>;
  private readonly quantityCounter: BaseComponent<HTMLDivElement>;
  private readonly decreaseButton: BaseComponent<HTMLButtonElement>;
  private readonly quantityInput: BaseComponent<HTMLInputElement>;
  private readonly increaseButton: BaseComponent<HTMLButtonElement>;
  private readonly itemPrice: BaseComponent<HTMLParagraphElement>;
  private readonly removeButton: BaseComponent<HTMLButtonElement>;

  constructor(id: string = '', className: string = 'cart-item-component', lineItem: LineItem) {
    super(Tags.DIV, id, className);

    this.lineItem = lineItem;
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

  protected addEventListeners(): void {
    this.addIncreaseButtonListener();
    this.addDecreaseButtonListener();
    this.addRemoveButtonListener();
  }

  private addIncreaseButtonListener(): void {
    this.increaseButton.addEventListener('click', async () => {
      const result = await SdkApi().changeLineItemCart(
        this.lineItem.id,
        this.lineItem.quantity + 1,
      );
      if (result.body) {
        PublishSubscriber().publish('updateCart', { cart: result.body });
      }
      this.lineItem = (await SdkApi().getLineItemByLineItemId(this.lineItem.id)) || this.lineItem;
      this.setQuantity();
      this.setPrice();
    });
  }

  private addDecreaseButtonListener(): void {
    this.decreaseButton.addEventListener('click', async () => {
      const result = await SdkApi().changeLineItemCart(
        this.lineItem.id,
        this.lineItem.quantity - 1,
      );
      if (result.body) {
        PublishSubscriber().publish('updateCart', { cart: result.body });
      }
      this.lineItem = (await SdkApi().getLineItemByLineItemId(this.lineItem.id)) || this.lineItem;
      this.setQuantity();
      this.setPrice();
    });
  }

  private addRemoveButtonListener(): void {
    this.removeButton.addEventListener('click', async () => {
      const result = await SdkApi().removeLineItemFromCart([this.lineItem.id]);
      if (result.body) {
        PublishSubscriber().publish('updateCart', { cart: result.body });
      }
    });
  }

  private renderItemImage(): void {
    this.itemImage.appendTo(this.getElement());
    if (this.lineItem.variant.images) {
      this.itemImage.setAttribute(
        'style',
        `background-image: url(${this.lineItem.variant.images[0].url})`,
      );
    }
  }

  private renderItemName(): void {
    if (this.lineItem && this.lineItem.name['en-US']) {
      this.itemName.setText(this.lineItem.name['en-US']);
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
    this.setQuantity();
    this.quantityInput.setAttribute('readonly', 'true');
    this.quantityInput.appendTo(this.quantityCounter.getElement());
  }

  private setQuantity(): void {
    this.quantityInput.setAttribute('value', this.lineItem.quantity.toString());
  }

  private createIncreaseButton(): BaseComponent<HTMLButtonElement> {
    const increaseButton = createButton(undefined, 'button');
    increaseButton.setText('+');
    increaseButton.addClass('increase-button');
    return increaseButton;
  }

  private renderItemPrice(): void {
    this.setPrice();
    this.itemPrice.appendTo(this.itemDetails.getElement());
  }

  private setPrice(): void {
    const price = this.lineItem.price.discounted?.value || this.lineItem.price.value;
    this.itemPrice.setText(
      `$${price.centAmount / 100} × ${this.lineItem.quantity} = $${(price.centAmount * this.lineItem.quantity) / 100}`,
    );
  }

  private createRemoveButton(): BaseComponent<HTMLButtonElement> {
    const removeButton = createButton(undefined, 'button');
    removeButton.addClass('remove-button');
    return removeButton;
  }
}

export const CartItem = (lineItem: LineItem): CartItemComponent =>
  new CartItemComponent(undefined, undefined, lineItem);
