import { Tags } from '@app/components/common/tags';
import type { Customer } from '@commercetools/platform-sdk';
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
import { UserCache } from '@/app/utils/api/token-cache';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';

class ProfileComponent extends BaseComponent<HTMLDivElement> {
  private readonly h2: BaseComponent<HTMLHeadingElement>;
  private readonly container: BaseComponent<HTMLDivElement>;
  private readonly personalInfo: PersonalInfoComponent;
  private readonly addressContainer: BaseComponent<HTMLDivElement>;
  private readonly addressInfoTitle: BaseComponent<HTMLHeadingElement>;
  private readonly addressWrapper: BaseComponent<HTMLDivElement>;
  private readonly addAddressButton: BaseComponent<HTMLButtonElement>;

  private addresses: ProfileAddressComponent[] = [];

  constructor(id: string = 'profile-component', className: string = 'profile-component') {
    super(Tags.DIV, id, className);

    this.h2 = createH2(undefined, 'heading-2');
    this.container = createDiv(undefined, 'profile-container');
    this.personalInfo = PersonalInfo();
    this.addressContainer = createDiv(undefined, 'address-info');
    this.addressInfoTitle = createH3(undefined, 'heading-3');
    this.addressWrapper = createDiv(undefined, 'address-wrapper');
    this.addAddressButton = this.createAddAddressButton();

    this.init();

    this.setData();
  }

  protected addEventListeners(): void {
    PublishSubscriber().subscribe('userLoggedIn', () => {
      this.setData();
    });
  }

  protected renderComponent(): void {
    this.renderH2();
    this.renderContainer();
    this.personalInfo.appendTo(this.container.getElement());
    this.addressContainer.appendTo(this.container.getElement());
    this.renderAddressInfoTitle();
    this.addressWrapper.appendTo(this.addressContainer.getElement());
    this.addAddressButton.appendTo(this.addressContainer.getElement());
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

  private async setData(): Promise<void> {
    const customer = UserCache.get();

    if (customer) {
      this.setPersonalInfo(customer);
      this.setAddresses(customer);
    }
  }

  private setPersonalInfo(customer: Customer): void {
    this.personalInfo.setData({
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      dateOfBirth: customer.dateOfBirth || '',
      email: customer.email,
    });
    this.personalInfo.setUneditable();
  }

  private setAddresses(customer: Customer): void {
    for (const address of this.addresses) {
      address.remove();
    }
    this.addresses = [];

    const defaultShippingAddressId = customer.defaultShippingAddressId || '';
    const defaultBillingAddressId = customer.defaultBillingAddressId || '';
    for (const addressData of customer.addresses) {
      const address = profileAddressComponent(undefined, 'profile-address-component', 'Address');
      address.appendTo(this.addressWrapper.getElement());

      const isDefaultShipping =
        addressData.id !== undefined && addressData.id === defaultShippingAddressId;
      const isDefaultBilling =
        addressData.id !== undefined && addressData.id === defaultBillingAddressId;
      address.setData({
        street: addressData.streetName || '',
        city: addressData.city || '',
        postalCode: addressData.postalCode || '',
        country: addressData.country,
        isDefaultShipping: isDefaultShipping,
        isDefaultBilling: isDefaultBilling,
      });
      address.setUneditable();

      this.addresses.push(address);
    }
  }
}

export const Profile = (): ProfileComponent => new ProfileComponent();
