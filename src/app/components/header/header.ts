import { router } from '@app/router';
import BaseComponent from '@common-components/base-component';
import { createDiv, createH2, createImg } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import { Burger } from './burger-button/burger-button';
import { Nav } from './nav/nav';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';
import './header.scss';

class HeaderComponent extends BaseComponent<HTMLDivElement> {
  private readonly h2: BaseComponent<HTMLHeadingElement>;
  private readonly logoDiv: BaseComponent<HTMLDivElement>;
  private readonly logoImg: BaseComponent<HTMLImageElement>;
  private readonly navContainer = Nav();
  private readonly burgerButton = Burger();

  constructor(id: string = 'header-component', className: string = 'header-component') {
    super(Tags.DIV, id, className);

    this.logoDiv = createDiv(undefined, 'logo-div');
    this.logoImg = createImg(undefined, 'logo-icon');
    this.h2 = createH2(undefined, 'heading-2');

    this.init();
  }

  public toggleBurgerMenu(): void {
    this.navContainer.getElement().classList.toggle('side-menu');
    this.burgerButton.getElement().classList.toggle('crossed');
  }

  public hideBurgerMenu(): void {
    this.navContainer.removeClass('side-menu');
    this.burgerButton.removeClass('crossed');
  }

  protected renderComponent(): void {
    this.renderLogoDiv();
    this.renderNav();
    this.renderBurger();
  }

  protected addEventListeners(): void {
    this.addEventListenerLogoDiv();
    this.addEventListenerBurgerMenu();
    this.addEventListenerNav();
  }

  private renderLogoDiv(): void {
    this.logoDiv.appendTo(this.getElement());
    this.logoImg.appendTo(this.logoDiv.getElement());
    this.logoImg.setAttribute('src', './assets/favicon/favicon.ico');
    this.logoImg.setAttribute('alt', 'Logo');
    this.h2.appendTo(this.logoDiv.getElement());
    this.h2.setText('Fantasy Store');
  }

  private renderNav(): void {
    this.navContainer.appendTo(this.getElement());
  }

  private renderBurger(): void {
    this.burgerButton.appendTo(this.getElement());
  }

  private addEventListenerLogoDiv(): void {
    this.logoDiv.addEventListener('click', () => {
      router.navigate('#/main');
    });
  }

  private addEventListenerBurgerMenu(): void {
    PublishSubscriber().subscribe('toggleBurger', () => {
      this.toggleBurgerMenu();
    });
    PublishSubscriber().subscribe('hideBurger', () => {
      this.hideBurgerMenu();
    });
  }

  private addEventListenerNav(): void {
    this.navContainer.addEventListener('click', () => {
      PublishSubscriber().publish('hideBurger', {});
    });
  }
}

export const Header = (): HeaderComponent => new HeaderComponent();
