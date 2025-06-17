import BaseComponent from '@common-components/base-component';
import {
  createA,
  createButton,
  createDiv,
  createH2,
  createInput,
  createP,
} from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import { CartItem } from './cart-item';
import { SdkApi } from '@/app/utils/api/commerce-sdk-api';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import './cart.scss';

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
  private readonly emptyCartMessage: BaseComponent<HTMLDivElement>;

  private items: ReturnType<typeof CartItem>[] = [];

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
    this.emptyCartMessage = createDiv(undefined, 'empty-cart-message');

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

  protected addEventListeners(): void {
    this.addUserLoginEventListener();
    this.updateCartEventListener();
    this.addApplyButtonListener();
    this.addClearButtonListener();
  }

  private addClearButtonListener(): void {
    this.clearButton.addEventListener('click', async () => {
      const result = await SdkApi().removeLineItemFromCart(
        this.items.map((item) => item.lineItem.id),
      );
      if (result.body) {
        PublishSubscriber().publish('updateCart', { cart: result.body });
        this.items = [];
        this.setDynamicItems();
        this.setItems();
      }
    });
  }

  private addUserLoginEventListener(): void {
    PublishSubscriber().subscribe('userLoggedIn', (userId) => {
      this.setDynamicItems();
    });
  }

  private updateCartEventListener(): void {
    PublishSubscriber().subscribe('updateCart', (cart) => {
      this.setDynamicItems();
    });
  }

  private addApplyButtonListener(): void {
    this.applyButton.addEventListener('click', async () => {
      if (this.promoInput.getElement().value) {
        await SdkApi().applyDiscountCodeToCart(this.promoInput.getElement().value);
        this.setDynamicItems();
      }
    });
  }

  private setDynamicItems(): void {
    this.setItems();
    this.setTotalPrice();
    this.setOriginalPrice();
  }

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
    this.setOriginalPrice();
    this.originalPrice.appendTo(this.priceInfo.getElement());
  }

  private renderDiscountedPrice(): void {
    this.setTotalPrice();
    this.discountedPrice.appendTo(this.priceInfo.getElement());
  }

  private async setTotalPrice(): Promise<void> {
    const cart = await SdkApi().getCart();
    if (cart.body) {
      this.discountedPrice.setText(`Total price: $${cart.body.totalPrice.centAmount / 100}`);
    } else {
      this.discountedPrice.setText('Total price: $0');
    }
  }

  private async setOriginalPrice(): Promise<void> {
    const cart = await SdkApi().getCart();
    if (cart.body && cart.body.discountCodes.length > 0 && cart.body.discountOnTotalPrice) {
      const discountAmount = cart.body.discountOnTotalPrice.discountedAmount.centAmount / 100;
      const originalPrice = cart.body.totalPrice.centAmount / 100;
      this.originalPrice.setText(`Original price: $${discountAmount + originalPrice}`);
      this.originalPrice.removeClass('hidden');
      this.promoInput.setAttribute('disabled', 'true');
      this.applyButton.setAttribute('disabled', 'true');
    } else {
      this.originalPrice.addClass('hidden');
      this.promoInput.removeAttribute('disabled');
      this.applyButton.removeAttribute('disabled');
    }
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
      .getCart()
      .then((response) => {
        this.cartItems.removeChildren();
        this.items = [];
        const lineItems = response.body?.lineItems;

        if (lineItems && lineItems.length > 0) {
          for (const lineItem of lineItems) {
            const cartItem = CartItem(lineItem);
            this.items.push(cartItem);
            cartItem.appendTo(this.cartItems.getElement());
          }
        } else {
          this.renderEmptyCartMessage();
        }
      });
  }

  private renderEmptyCartMessage(): void {
    this.emptyCartMessage.removeChildren();
    const messageText = createP(undefined, 'message-text');
    const messageText2 = createP(undefined, 'message-text');
    messageText.setText('Your cart is currently empty.');
    messageText2.setText('Start your shopping journey in the ');

    const storeLink = createA(undefined, 'store-link');
    storeLink.setText('Store');
    storeLink.setAttribute('href', '/#/store');

    storeLink.appendTo(messageText2.getElement());
    messageText.appendTo(this.emptyCartMessage.getElement());
    messageText2.appendTo(this.emptyCartMessage.getElement());

    this.emptyCartMessage.appendTo(this.cartItems.getElement());
  }
}

export const Cart = (): CartComponent => new CartComponent();
