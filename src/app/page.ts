import { type ProductProjection } from '@commercetools/platform-sdk';
import BaseComponent from '@common-components/base-component';
import { Tags } from '@common-components/tags';
import { NotFound } from '@components/404/404';
import { Footer } from './components/footer/footer';
import { AboutUs } from './components/about-us/about-us';
import { Header } from './components/header/header';
import { Login } from './components/login/login';
import { Main } from './components/main/main';
import { ModalSlider } from './components/modal-slider/modal-slider';
import { ProductPage } from './components/product-page/product-page';
import { Profile } from './components/profile/profile';
import { Registration } from './components/registration/registration';
import { Store } from './components/store/store';
import { PlaceholderPage } from './components/under-construction/under-construction';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import './page.scss';

export class PageWrapperComponent extends BaseComponent<HTMLDivElement> {
  private readonly notFound = NotFound();
  private readonly main = Main();
  private readonly header = Header();
  private readonly login = Login();
  private readonly registration = Registration();
  private readonly placeholder = PlaceholderPage();
  private readonly store = Store();
  private readonly profile = Profile();
  private modalSlider = ModalSlider();
  private product = ProductPage();
  private readonly footer = Footer();
  private readonly aboutUs = AboutUs();

  constructor(id: string = 'page-wrapper-component', className: string = 'page-wrapper-component') {
    super(Tags.DIV, id, className);

    this.init();
  }

  public openNotFound(): void {
    this.renderAllComponentsExcept(this.notFound);
  }

  public openMain(): void {
    this.renderAllComponentsExcept(this.main);
  }

  public openStore(): void {
    this.renderAllComponentsExcept(this.store);
  }

  public openAboutUs(): void {
    this.renderAllComponentsExcept(this.aboutUs);
  }

  public openCart(): void {
    this.renderAllComponentsExcept(this.placeholder);
  }

  public openLogin(): void {
    this.renderAllComponentsExcept(this.login);
  }

  public openRegistration(): void {
    this.renderAllComponentsExcept(this.registration);
  }

  public openProfile(): void {
    this.renderAllComponentsExcept(this.profile);
  }

  public openProduct(productProjection: ProductProjection): void {
    this.product = ProductPage(productProjection);
    this.renderAllComponentsExcept(this.product);
  }

  public openSliderEventListener(): void {
    PublishSubscriber().subscribe('openModalSlider', (payload) => {
      this.modalSlider = ModalSlider(payload.product);
      this.renderModalSlider();
    });
  }

  protected closeSliderEventListener(): void {
    PublishSubscriber().subscribe('closeModalSlider', (payload) => {
      this.modalSlider.remove();
    });
  }

  protected renderComponent(): void {
    this.openMain();
  }

  protected addEventListeners(): void {
    this.openSliderEventListener();
    this.closeSliderEventListener();
  }

  private renderModalSlider(): void {
    this.modalSlider.appendTo(this.getElement());
  }

  private renderAllComponentsExcept(component: BaseComponent<HTMLDivElement>): void {
    this.header.appendTo(this.getElement());
    this.main.remove();
    this.registration.remove();
    this.notFound.remove();
    this.login.remove();
    this.registration.remove();
    this.placeholder.remove();
    this.profile.remove();
    this.product.remove();
    this.store.remove();
    this.aboutUs.remove();
    this.modalSlider.remove();
    component.appendTo(this.getElement());
    this.footer.appendTo(this.getElement());
  }
}

export const PageWrapper = (): PageWrapperComponent => new PageWrapperComponent();
