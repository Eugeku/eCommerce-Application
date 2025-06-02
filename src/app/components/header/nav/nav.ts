import { router } from '@app/router';
import BaseComponent from '@common-components/base-component';
import { Tags } from '@common-components/tags';
import { NavItem } from './nav-item/nav-item';
import './nav.scss';
import { SdkApi } from '@/app/utils/api/commerce-sdk-api';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';

class NavComponent extends BaseComponent<HTMLDivElement> {
  private readonly homeBtn: BaseComponent<HTMLButtonElement>;
  private readonly storeBtn: BaseComponent<HTMLButtonElement>;
  private readonly aboutUsBtn: BaseComponent<HTMLButtonElement>;
  private readonly cartBtn: BaseComponent<HTMLButtonElement>;
  private readonly loginBtn: BaseComponent<HTMLButtonElement>;
  private readonly registerBtn: BaseComponent<HTMLButtonElement>;
  private readonly profileBtn: BaseComponent<HTMLButtonElement>;
  private readonly logoutBtn: BaseComponent<HTMLButtonElement>;

  constructor(id: string = 'nav-component', className: string = 'nav-component') {
    super(Tags.DIV, id, className);
    this.homeBtn = NavItem('home', 'button nav-item', 'home', 'Home');
    this.storeBtn = NavItem('store', 'button nav-item', 'store', 'Store');
    this.aboutUsBtn = NavItem('about-us', 'button nav-item', 'about-us', 'About Us');
    this.cartBtn = NavItem('cart', 'button nav-item', 'cart', 'Cart');
    this.loginBtn = NavItem('login', 'button nav-item', 'profile', 'Login');
    this.registerBtn = NavItem('register', 'button nav-item', 'register', 'Register');
    this.profileBtn = NavItem('profile', 'button nav-item', 'profile', 'Profile');
    this.logoutBtn = NavItem('logout', 'button nav-item', 'logout', 'Logout');

    this.init();
  }

  protected renderComponent(): void {
    this.homeBtn.appendTo(this.getElement());
    this.storeBtn.appendTo(this.getElement());
    this.aboutUsBtn.appendTo(this.getElement());
    this.cartBtn.appendTo(this.getElement());
    this.renderLoginLogout(SdkApi().isLoggedIn());
  }

  protected addEventListeners(): void {
    this.homeBtn.addEventListener('click', () => {
      PublishSubscriber().publish('hideBurger', {});
      router.navigate('#/main');
    });
    this.storeBtn.addEventListener('click', () => {
      PublishSubscriber().publish('hideBurger', {});
      router.navigate('#/store');
    });
    this.aboutUsBtn.addEventListener('click', () => {
      PublishSubscriber().publish('hideBurger', {});
      router.navigate('#/about-us');
    });
    this.cartBtn.addEventListener('click', () => {
      PublishSubscriber().publish('hideBurger', {});
      router.navigate('#/cart');
    });
    this.loginBtn.addEventListener('click', () => {
      PublishSubscriber().publish('hideBurger', {});
      router.navigate('#/login');
    });
    this.registerBtn.addEventListener('click', () => {
      PublishSubscriber().publish('hideBurger', {});
      router.navigate('#/registration');
    });
    this.profileBtn.addEventListener('click', () => {
      PublishSubscriber().publish('hideBurger', {});
      router.navigate('#/profile');
    });
    this.logoutBtn.addEventListener('click', () => {
      SdkApi().logoutUser();
      this.renderLoginLogout(SdkApi().isLoggedIn());
      PublishSubscriber().publish('hideBurger', {});
      router.navigate('#/main');
    });

    this.addLoginEventListener();
  }

  private addLoginEventListener(): void {
    PublishSubscriber().subscribe('userLoggedIn', () => {
      this.renderLoginLogout(true);
    });
  }

  private renderLoginLogout(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      this.loginBtn.remove();
      this.registerBtn.remove();
      this.profileBtn.appendTo(this.getElement());
      this.logoutBtn.appendTo(this.getElement());
    } else {
      this.profileBtn.remove();
      this.logoutBtn.remove();
      this.loginBtn.appendTo(this.getElement());
      this.registerBtn.appendTo(this.getElement());
    }
  }
}

export const Nav = (): NavComponent => new NavComponent();
