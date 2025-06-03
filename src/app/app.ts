import { PageWrapper } from '@app/page';
import { router } from '@app/router';
import type BaseComponent from '@common-components/base-component';
import { createDiv } from '@common-components/base-component-factory';
import { SdkApi } from './utils/api/commerce-sdk-api';
import { PublishSubscriber } from './utils/event-bus/event-bus';
import './app.scss';

class App {
  private readonly pageWrapper = PageWrapper();
  private readonly root: BaseComponent<HTMLDivElement>;

  constructor() {
    this.root = createDiv('app', 'app');
    this.root.appendTo(document.body);
  }

  public start(): void {
    this.pageWrapper.appendTo(this.root.getElement());
    this.setupRoutes();
    this.setAdditionalRoutes();
    router.handleInitialRoute();
  }

  public setupRoutes(): void {
    router.addRoute('#/', () => {
      router.navigate('#/main');
    });

    router.addRoute('#/main', () => {
      this.pageWrapper.openMain();
    });

    router.addRoute('#/not-found', () => {
      this.pageWrapper.openNotFound();
    });

    router.addRoute('#/store', () => {
      this.pageWrapper.openStore();
    });

    router.addRoute('#/about-us', () => {
      this.pageWrapper.openAboutUs();
    });

    router.addRoute('#/cart', () => {
      this.pageWrapper.openCart();
    });

    router.addRoute('#/login', () => {
      if (SdkApi().isLoggedIn()) {
        router.navigate('#/main');
      } else {
        this.pageWrapper.openLogin();
      }
    });

    router.addRoute('#/registration', () => {
      if (SdkApi().isLoggedIn()) {
        router.navigate('#/main');
      } else {
        this.pageWrapper.openRegistration();
      }
    });

    router.addRoute('#/profile', () => {
      this.pageWrapper.openProfile();
    });

    router.addRoute('*', () => {
      this.pageWrapper.openNotFound();
    });
  }

  public setAdditionalRoutes(): void {
    PublishSubscriber().subscribe('selectProduct', (payload) => {
      this.pageWrapper.openProduct(payload.product);
    });
  }
}

const app = new App();
app.start();
