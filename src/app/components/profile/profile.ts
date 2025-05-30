import { Tags } from '@app/components/common/tags';
import BaseComponent from '@components/common/base-component';
import {
  createButton,
  createDiv,
  createH2,
  createH3,
} from '@components/common/base-component-factory';
import type { PersonalInfoComponent } from './personal-info-component';
import { PersonalInfo } from './personal-info-component';
import type { ProfileAddressComponent } from './profile-address-component';
import { profileAddressComponent } from './profile-address-component';
import './profile.scss';

class ProfileComponent extends BaseComponent<HTMLDivElement> {
  private readonly h2: BaseComponent<HTMLHeadingElement>;
  private readonly container: BaseComponent<HTMLDivElement>;
  private readonly personalInfo: PersonalInfoComponent;
  private readonly addressContainer: BaseComponent<HTMLDivElement>;
  private readonly addressInfoTitle: BaseComponent<HTMLHeadingElement>;
  private readonly addressWrapper: BaseComponent<HTMLDivElement>;
  private readonly addAddressButton: BaseComponent<HTMLButtonElement>;

  private address1: ProfileAddressComponent;
  private address2: ProfileAddressComponent;

  constructor(id: string = 'profile-component', className: string = 'profile-component') {
    super(Tags.DIV, id, className);

    this.h2 = createH2(undefined, 'heading-2');
    this.container = createDiv(undefined, 'profile-container');
    this.personalInfo = PersonalInfo();
    this.addressContainer = createDiv(undefined, 'address-info');
    this.addressInfoTitle = createH3(undefined, 'heading-3');
    this.addressWrapper = createDiv(undefined, 'address-wrapper');
    this.addAddressButton = this.createAddAddressButton();

    this.address1 = profileAddressComponent(undefined, 'profile-address-component', 'Address');
    this.address2 = profileAddressComponent(undefined, 'profile-address-component', 'Address');

    this.setAddresses();

    this.init();
  }

  protected addEventListeners(): void {}

  protected renderComponent(): void {
    this.renderH2();
    this.renderContainer();
    this.personalInfo.appendTo(this.container.getElement());
    this.addressContainer.appendTo(this.container.getElement());
    this.renderAddressInfoTitle();
    this.addressWrapper.appendTo(this.addressContainer.getElement());
    this.addAddressButton.appendTo(this.addressContainer.getElement());

    this.address1.appendTo(this.addressWrapper.getElement());
    this.address2.appendTo(this.addressWrapper.getElement());
  }

  private renderH2(): void {
    this.h2.setText('User Profile');
    this.h2.appendTo(this.getElement());
  }

  private renderContainer(): void {
    this.container.appendTo(this.getElement());
  }

  private renderAddressInfoTitle(): void {
    this.addressInfoTitle.setText('Addresses');
    this.addressInfoTitle.appendTo(this.addressContainer.getElement());
  }

  private createAddAddressButton(): BaseComponent<HTMLButtonElement> {
    const addAddressButton = createButton(undefined, 'button');
    addAddressButton.setText('+ Add Address');
    addAddressButton.addClass('add-address-button');
    return addAddressButton;
  }

  private setAddresses(): void {
    this.address1.setData();
    this.address2.setData();

    this.address1.setUneditable();
    this.address2.setUneditable();
  }
}

export const Profile = (): ProfileComponent => new ProfileComponent();
