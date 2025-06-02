import { router } from '@app/router';
import BaseComponent from '@common-components/base-component';
import {
  createH3,
  createP,
  createDiv,
  createImg,
  createButton,
} from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import { SdkApi } from '@/app/utils/api/commerce-sdk-api';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import './product-page.scss';

class ProductPageComponent extends BaseComponent<HTMLDivElement> {
  protected arrImages: object[];
  protected currentImage: number;
  protected salePriceApi: string;

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

  constructor(id: string = 'product-page-component', className: string = 'product-page-component') {
    super(Tags.DIV, id, className);

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

    this.arrImages = [{ placeholder: 1 }, { placeholder: 2 }, { placeholder: 3 }];
    this.currentImage = 0;
    this.salePriceApi = /* TODO: Sdk.salePrice || */ '0';

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
    PublishSubscriber().publish('openModalSlider', {});
  }

  protected addEventListeners(): void {
    this.addEventListenerLeftButton();
    this.addEventListenerRightButton();
    this.addEventListenerBackButton();
  }

  private renderHeading3(): void {
    this.h3.appendTo(this.textsContainer.getElement());
    this.h3.setText('Product Name');
  }

  private renderDescription(): void {
    this.description.appendTo(this.textsContainer.getElement());
    this.description.setText('Description of the Product');
  }

  private renderPrices(): void {
    this.pricesDiv.appendTo(this.textsContainer.getElement());
    this.defaultPrice.appendTo(this.pricesDiv.getElement());
    this.defaultPrice.setText('$20.00');
    this.salePrice.appendTo(this.pricesDiv.getElement());
    this.salePrice.setText('$10.00');
  }

  private renderTextsContainer(): void {
    this.renderHeading3();
    this.renderDescription();
    this.renderPrices();
    this.textsContainer.appendTo(this.wrapper.getElement());
  }

  private renderImages(): void {
    for (const image of this.arrImages) {
      const picDiv = document.createElement('div');
      picDiv.classList.add('slider-small-div');
      picDiv.style.backgroundImage = 'url(https://placecats.com/bella/300/200)';
      picDiv.addEventListener('click', () => {
        this.openModalSlider();
      });
      this.imagesContainer.getElement().append(picDiv);
    }
    this.imagesContainer.appendTo(this.sliderSmall.getElement());
  }

  private renderSliderSmall(): void {
    this.renderImages();
    this.buttonLeft.setAttribute('disabled', 'true');
    this.buttonLeft.appendTo(this.sliderSmall.getElement());
    this.buttonRight.appendTo(this.sliderSmall.getElement());
    this.sliderSmall.appendTo(this.wrapper.getElement());
  }

  private addEventListenerLeftButton(): void {
    this.buttonLeft.addEventListener('click', () => {
      if (!this.buttonLeft.getElement().hasAttribute('disabled')) {
        if (this.currentImage === this.arrImages.length - 1) {
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
        if (this.currentImage >= this.arrImages.length - 1) {
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

  private async onLoad(): Promise<void> {
    /*
    await SdkApi()
      .getProductData(name, description, images, price, salePrice)
      .then(() => {
        return SdkApi().withPasswordFlow(email, password).getMe();
      })
      .then((response) => {
        UserCache.set(response.body);
        PublishSubscriber().publish('userLoggedIn', { userId: email });
        router.navigate('#/main');
      })
      .catch((error) => {
        console.log(error.body.message);
      });
    */
  }
}

export const ProductPage = (): ProductPageComponent => new ProductPageComponent();
