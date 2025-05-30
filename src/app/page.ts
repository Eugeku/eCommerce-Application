import BaseComponent from '@common-components/base-component';
import { Tags } from '@common-components/tags';
import { NotFound } from '@components/404/404';
import { Header } from './components/header/header';
import { Login } from './components/login/login';
import { Main } from './components/main/main';
import { Profile } from './components/profile/profile';
import { Registration } from './components/registration/registration';
import { PlaceholderPage } from './components/under-construction/under-construction';
import './page.scss';

export class PageWrapperComponent extends BaseComponent<HTMLDivElement> {
  private readonly notFound = NotFound();
  private readonly main = Main();
  private readonly header = Header();
  private readonly login = Login();
  private readonly registration = Registration();
  private readonly placeholder = PlaceholderPage();
  private readonly profile = Profile();

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
    this.renderAllComponentsExcept(this.placeholder);
  }

  public openAboutUs(): void {
    this.renderAllComponentsExcept(this.placeholder);
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

  protected renderComponent(): void {
    this.openMain();
  }

  protected addEventListeners(): void {
    return;
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
    component.appendTo(this.getElement());
    // append footer
  }
}

export const PageWrapper = (): PageWrapperComponent => new PageWrapperComponent();
