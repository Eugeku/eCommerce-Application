import type {
  Address,
  AuthenticationMode,
  Customer,
  CustomFields,
  StoreKeyReference,
} from '@commercetools/platform-sdk';

class CustomerBuilderUtility {
  private customer: Partial<Customer> = {
    addresses: [],
    stores: [],
    isEmailVerified: false,
    authenticationMode: 'Password',
    createdAt: new Date().toISOString(),
    lastModifiedAt: new Date().toISOString(),
    version: 1,
    id: '',
    email: '',
  };

  public withId(id: string): this {
    this.customer = { ...this.customer, id };
    return this;
  }

  public withPassword(password: string): this {
    this.customer = { ...this.customer, password };
    return this;
  }

  public withVersion(version: number): this {
    this.customer = { ...this.customer, version };
    return this;
  }

  public withEmail(email: string): this {
    this.customer = { ...this.customer, email };
    return this;
  }

  public withFirstName(firstName: string): this {
    this.customer = { ...this.customer, firstName };
    return this;
  }

  public withLastName(lastName: string): this {
    this.customer = { ...this.customer, lastName };
    return this;
  }

  public withAddress(address: Address): this {
    this.customer.addresses?.push(address);
    return this;
  }

  public withDateOfBirth(date: string): this {
    this.customer = { ...this.customer, dateOfBirth: date };
    return this;
  }

  public withAddresses(addresses: Address[]): this {
    this.customer = { ...this.customer, addresses };
    return this;
  }

  public withStore(store: StoreKeyReference): this {
    this.customer.stores?.push(store);
    return this;
  }

  public withIsEmailVerified(isVerified: boolean): this {
    this.customer = { ...this.customer, isEmailVerified: isVerified };
    return this;
  }

  public withAuthenticationMode(mode: AuthenticationMode): this {
    this.customer = { ...this.customer, authenticationMode: mode };
    return this;
  }

  public withCustomFields(custom: CustomFields): this {
    this.customer = { ...this.customer, custom };
    return this;
  }

  public withDefaultShippingAddressId(id: string | undefined): this {
    if (id) {
      this.customer = { ...this.customer, defaultShippingAddressId: id };
    }
    return this;
  }

  public withDefaultBillingAddressId(id: string | undefined): this {
    if (id) {
      this.customer = { ...this.customer, defaultBillingAddressId: id };
    }
    return this;
  }

  public build(): Customer {
    if (!this.customer.id || !this.customer.email) {
      throw new Error('Required fields "id" and "email" must be provided');
    }

    return this.customer as Customer;
  }
}

export const CustomerBuilder = (): CustomerBuilderUtility => new CustomerBuilderUtility();
