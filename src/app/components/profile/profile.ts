import { Tags } from '@app/components/common/tags';
import type { Customer } from '@commercetools/platform-sdk';
import BaseComponent from '@components/common/base-component';
import {
  createButton,
  createDiv,
  createH2,
  createH3,
} from '@components/common/base-component-factory';
import type { PersonalInfoComponent, PersonalInfoData } from './personal-info-component';
import { PersonalInfo } from './personal-info-component';
import type { ProfileAddressComponent } from './profile-address-component';
import { profileAddressComponent } from './profile-address-component';
import './profile.scss';
import { ApiPopup } from '../popups/api-popup/api-popup';
import { ChangePasswordPopup } from '../popups/change-password-popup/change-password-popup';
import { SdkApi } from '@/app/utils/api/commerce-sdk-api';
import { UserCache } from '@/app/utils/api/token-cache';
import { PublishSubscriber } from '@/app/utils/event-bus/event-bus';

class ProfileComponent extends BaseComponent<HTMLDivElement> {
  private readonly apiPopup = ApiPopup();
  private readonly changePasswordPopup = ChangePasswordPopup(this.onPasswordChanged.bind(this));

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
    this.personalInfo = PersonalInfo(
      this.savePersonalInfo.bind(this),
      this.startChangePassword.bind(this),
    );
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

  private async savePersonalInfo(data: PersonalInfoData): Promise<void> {
    this.personalInfo.setUneditable();

    if (!dataChanged(data)) return;

    await SdkApi()
      .updateCustomer(data)
      .then(() => {
        this.renderPopupMessage('Personal Info updated', () => void 0);
      })
      .then(() => {
        return SdkApi().getMe();
      })
      .then((response) => {
        UserCache.set(response.body);
        this.setData();
        PublishSubscriber().publish('userUpdated', { userId: data.email });
      })
      .catch((error) => {
        this.renderPopupMessage(error.body.message, () => void 0);
      });

    function dataChanged(data: PersonalInfoData): boolean {
      const customer = UserCache.get();
      if (!customer) return false;

      return (
        data.email !== customer.email ||
        data.firstName !== customer.firstName ||
        data.lastName !== customer.lastName ||
        data.dateOfBirth !== customer.dateOfBirth
      );
    }
  }

  private startChangePassword(): void {
    this.changePasswordPopup.appendTo(this.getElement());
    this.changePasswordPopup.show();
  }

  private async onPasswordChanged(currentPassword: string, newPassword: string): Promise<void> {
    if (currentPassword === newPassword) {
      this.renderPopupMessage('The same password', () => void 0);
      return;
    }

    const me = await SdkApi().getMe();
    await SdkApi()
      .updatePassword(currentPassword, newPassword)
      .then(() => {
        this.renderPopupMessage('Password updated', () => void 0);
      })
      .then(() => {
        return SdkApi().withPasswordFlow(me.body.email, newPassword).getMe();
      })
      .then((response) => {
        UserCache.set(response.body);
      })
      .catch((error) => {
        this.renderPopupMessage(error.body.message, () => void 0);
      });
  }

  private renderPopupMessage(message: string, callback?: () => void): void {
    this.apiPopup.appendTo(this.getElement());
    this.apiPopup.setErrorMessage(message);
    if (callback) this.apiPopup.onClose(callback);
    this.apiPopup.show();
  }
}

export const Profile = (): ProfileComponent => new ProfileComponent();
