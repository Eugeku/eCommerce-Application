import BaseComponent from '@common-components/base-component';
import {
  createButton,
  createDiv,
  createH2,
  createInput,
  createP,
} from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './cart.scss';
import type { CartItemComponent } from './cart-item';
import { CartItem } from './cart-item';
import { SdkApi } from '@/app/utils/api/commerce-sdk-api';

class CartComponent extends BaseComponent<HTMLDivElement> {
  private readonly cartTitle: BaseComponent<HTMLHeadingElement>;
  private readonly cartContainer: BaseComponent<HTMLDivElement>;
  private readonly cartItems: BaseComponent<HTMLDivElement>;
  private readonly cartSummary: BaseComponent<HTMLDivElement>;
  private readonly promoSection: BaseComponent<HTMLDivElement>;
  private readonly promoInput: BaseComponent<HTMLInputElement>;
  private readonly applyButton: BaseComponent<HTMLButtonElement>;
  private readonly priceInfo: BaseComponent<HTMLDivElement>;
  private readonly originalPrice: BaseComponent<HTMLParagraphElement>;
  private readonly discountedPrice: BaseComponent<HTMLParagraphElement>;
  private readonly cartButtons: BaseComponent<HTMLDivElement>;
  private readonly clearButton: BaseComponent<HTMLButtonElement>;
  private readonly checkoutButton: BaseComponent<HTMLButtonElement>;

  private items: CartItemComponent[] = [];

  constructor(id: string = 'cart-component', className: string = 'cart-component') {
    super(Tags.DIV, id, className);
    this.cartTitle = createH2(undefined, 'cart-title');
    this.cartContainer = createDiv(undefined, 'cart-container');
    this.cartItems = createDiv(undefined, 'cart-items');
    this.cartSummary = createDiv(undefined, 'cart-summary');
    this.promoSection = createDiv(undefined, 'promo-section');
    this.promoInput = createInput(undefined, 'promo-input');
    this.applyButton = this.createApplyButton();
    this.priceInfo = createDiv(undefined, 'price-info');
    this.originalPrice = createP(undefined, 'original-price');
    this.discountedPrice = createP(undefined, 'discounted-price');
    this.cartButtons = createDiv(undefined, 'cart-buttons');
    this.clearButton = this.createClearButton();
    this.checkoutButton = this.createCheckoutButton();

    this.init();

    this.setItems();
  }

  protected renderComponent(): void {
    this.renderCartTitle();
    this.cartContainer.appendTo(this.getElement());
    this.cartItems.appendTo(this.cartContainer.getElement());
    this.cartSummary.appendTo(this.cartContainer.getElement());
    this.promoSection.appendTo(this.cartSummary.getElement());
    this.renderPromoInput();
    this.applyButton.appendTo(this.promoSection.getElement());
    this.priceInfo.appendTo(this.cartSummary.getElement());
    this.renderOriginalPrice();
    this.renderDiscountedPrice();
    this.cartButtons.appendTo(this.cartSummary.getElement());
    this.clearButton.appendTo(this.cartButtons.getElement());
    this.checkoutButton.appendTo(this.cartButtons.getElement());
  }

  protected addEventListeners(): void {}

  private renderCartTitle(): void {
    this.cartTitle.setText('Your Shopping Cart');
    this.cartTitle.appendTo(this.getElement());
  }

  private renderPromoInput(): void {
    this.promoInput.setAttribute('type', 'text');
    this.promoInput.setAttribute('placeholder', 'Enter promo code');
    this.promoInput.appendTo(this.promoSection.getElement());
  }

  private createApplyButton(): BaseComponent<HTMLButtonElement> {
    const applyButton = createButton(undefined, 'button');
    applyButton.setText('Apply');
    applyButton.addClass('apply-button');
    return applyButton;
  }

  private renderOriginalPrice(): void {
    this.originalPrice.setText('Original price: $159.97');
    this.originalPrice.appendTo(this.priceInfo.getElement());
  }

  private renderDiscountedPrice(): void {
    this.discountedPrice.setText('Total price: $143.97');
    this.discountedPrice.appendTo(this.priceInfo.getElement());
  }

  private createClearButton(): BaseComponent<HTMLButtonElement> {
    const clearButton = createButton(undefined, 'button');
    clearButton.setText('Clear Cart');
    clearButton.addClass('clear-button');
    return clearButton;
  }

  private createCheckoutButton(): BaseComponent<HTMLButtonElement> {
    const checkoutButton = createButton(undefined, 'button');
    checkoutButton.setText('Continue to Checkout');
    checkoutButton.addClass('checkout-button');
    return checkoutButton;
  }

  private async setItems(): Promise<void> {
    await SdkApi()
      .getProducts()
      .then((response) => {
        this.cartItems.removeChildren();
        this.items = [];

        const product = response.body?.results[0];

        for (let index = 0; index < 4; index++) {
          if (product) {
            const productCard = CartItem(product);
            this.items.push(productCard);
            productCard.appendTo(this.cartItems.getElement());
          }
        }
      });
  }
}

export const Cart = (): CartComponent => new CartComponent();
