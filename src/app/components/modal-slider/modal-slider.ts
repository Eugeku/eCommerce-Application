import { type ProductProjection } from '@commercetools/platform-sdk';
import BaseComponent from '@common-components/base-component';
import { createDiv, createButton } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import './modal-slider.scss';

class ModalSliderComponent extends BaseComponent<HTMLDivElement> {
  private totalImages: number;
  private currentImage: number;
  private readonly product: ProductProjection | undefined;

  private readonly wrapperModal: BaseComponent<HTMLDivElement>;
  private readonly sliderBig: BaseComponent<HTMLDivElement>;
  private readonly imagesContainer: BaseComponent<HTMLDivElement>;
  private readonly buttonLeft: BaseComponent<HTMLButtonElement>;
  private readonly buttonRight: BaseComponent<HTMLButtonElement>;
  private readonly buttonClose: BaseComponent<HTMLButtonElement>;

  constructor(
    id: string = 'modal-slider-component',
    className: string = 'modal-slider-component',
    product?: ProductProjection,
  ) {
    super(Tags.DIV, id, className);

    this.product = product;
    this.wrapperModal = createDiv(undefined, 'modal-wrapper');
    this.sliderBig = createDiv(undefined, 'slider-big');
    this.imagesContainer = createDiv(undefined, 'images-container');
    this.buttonLeft = createButton(undefined, 'button-left');
    this.buttonRight = createButton(undefined, 'button-right');
    this.buttonClose = createButton(undefined, 'button-close');

    this.totalImages = 0;
    this.currentImage = 0;

    this.init();
  }

  protected renderComponent(): void {
    this.renderModalWrapper();
    this.renderCloseButton();
  }

  protected renderModalWrapper(): void {
    this.renderSliderBig();
    this.wrapperModal.appendTo(this.getElement());
  }

  protected renderCloseButton(): void {
    this.buttonClose.appendTo(this.getElement());
  }

  protected addEventListeners(): void {
    this.addEventListenerLeftButton();
    this.addEventListenerRightButton();
    this.addEventListenerCloseButton();
  }

  private renderImages(): void {
    if (this.product && this.product.masterVariant && this.product.masterVariant.images) {
      this.totalImages = this.product.masterVariant.images.length;
      for (const image of this.product.masterVariant.images) {
        const picDiv = document.createElement('div');
        picDiv.classList.add('slider-small-div');
        picDiv.style.backgroundImage = `url(${image.url})`;
        this.imagesContainer.getElement().append(picDiv);
      }
      this.imagesContainer.appendTo(this.sliderBig.getElement());
    }
  }

  private renderSliderBig(): void {
    this.renderImages();
    this.buttonLeft.setAttribute('disabled', 'true');
    this.buttonLeft.appendTo(this.sliderBig.getElement());
    this.buttonRight.appendTo(this.sliderBig.getElement());
    this.sliderBig.appendTo(this.wrapperModal.getElement());
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

  private addEventListenerCloseButton(): void {
    this.buttonClose.addEventListener('click', () => {
      PublishSubscriber().publish('closeModalSlider', {});
    });
  }
}

export const ModalSlider = (product?: ProductProjection): ModalSliderComponent =>
  new ModalSliderComponent(undefined, undefined, product);
