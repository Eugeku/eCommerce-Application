import BaseComponent from '@common-components/base-component';
import { createH3, createImg } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './nav-item.scss';

class NavItemComponent extends BaseComponent<HTMLButtonElement> {
  private readonly navItemImg: BaseComponent<HTMLImageElement>;
  private readonly navItemH3: BaseComponent<HTMLHeadingElement>;
  private readonly sourceForImg: string;
  private readonly navItemText: string;

  constructor(id: string, className: string, sourceForImg: string, navItemText: string) {
    super(Tags.BUTTON, id, className);

    this.sourceForImg = sourceForImg;
    this.navItemText = navItemText;
    this.navItemImg = createImg(undefined, 'nav-icon');
    this.navItemH3 = createH3(undefined, 'heading-3');

    this.init();
  }

  protected renderComponent(): void {
    this.renderNavItemImg();
    this.renderNavItemH3();
  }

  protected addEventListeners(): void {
    return;
  }

  private renderNavItemImg(): void {
    this.navItemImg.appendTo(this.getElement());
    this.navItemImg.setAttribute('src', `./assets/icons/${this.sourceForImg}.png`);
    this.navItemImg.setAttribute('alt', this.navItemText);
  }

  private renderNavItemH3(): void {
    this.navItemH3.appendTo(this.getElement());
    this.navItemH3.setText(this.navItemText);
  }
}

export const NavItem = (
  id: string,
  className: string,
  sourceForImage: string,
  navItemText: string,
): NavItemComponent => new NavItemComponent(id, className, sourceForImage, navItemText);
