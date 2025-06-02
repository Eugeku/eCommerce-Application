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
import './modal-slider.scss';

class ModalSliderComponent extends BaseComponent<HTMLDivElement> {
  protected arrImages: object[];
  private currentImageBig: number;

  private readonly wrapperModal: BaseComponent<HTMLDivElement>;
  private readonly sliderBig: BaseComponent<HTMLDivElement>;
  private readonly imagesContainer: BaseComponent<HTMLDivElement>;
  private readonly buttonLeft: BaseComponent<HTMLButtonElement>;
  private readonly buttonRight: BaseComponent<HTMLButtonElement>;
  private readonly buttonClose: BaseComponent<HTMLButtonElement>;

  constructor(id: string = 'modal-slider-component', className: string = 'modal-slider-component') {
    super(Tags.DIV, id, className);

    this.wrapperModal = createDiv(undefined, 'modal-wrapper');
    this.sliderBig = createDiv(undefined, 'slider-big');
    this.imagesContainer = createDiv(undefined, 'images-container');
    this.buttonLeft = createButton(undefined, 'button-left');
    this.buttonRight = createButton(undefined, 'button-right');
    this.buttonClose = createButton(undefined, 'button-close');

    this.arrImages = [{ placeholder: 1 }, { placeholder: 2 }, { placeholder: 3 }];
    this.currentImageBig = 0;

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
    for (const image of this.arrImages) {
      const picDiv = document.createElement('div');
      picDiv.classList.add('slider-small-div');
      picDiv.style.backgroundImage = 'url(https://placecats.com/bella/300/200)';
      this.imagesContainer.getElement().append(picDiv);
    }
    this.imagesContainer.appendTo(this.sliderBig.getElement());
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
        if (this.currentImageBig === this.arrImages.length - 1) {
          this.buttonRight.getElement().removeAttribute('disabled');
        }
        this.currentImageBig -= 1;
        const sliderWidth: number = this.imagesContainer.getElement().offsetWidth;
        const offset: number = this.currentImageBig * sliderWidth;
        this.imagesContainer.getElement().style.transform = `translateX(-${offset}px)`;
        if (this.currentImageBig <= 0) {
          this.buttonLeft.getElement().setAttribute('disabled', 'true');
        }
      }
    });
  }

  private addEventListenerRightButton(): void {
    this.buttonRight.addEventListener('click', () => {
      if (!this.buttonRight.getElement().hasAttribute('disabled')) {
        if (this.currentImageBig === 0) {
          this.buttonLeft.getElement().removeAttribute('disabled');
        }
        this.currentImageBig += 1;
        const sliderWidth: number = this.imagesContainer.getElement().offsetWidth;
        const offset: number = this.currentImageBig * sliderWidth;
        this.imagesContainer.getElement().style.transform = `translateX(-${offset}px)`;
        if (this.currentImageBig >= this.arrImages.length - 1) {
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

export const ModalSlider = (): ModalSliderComponent => new ModalSliderComponent();
