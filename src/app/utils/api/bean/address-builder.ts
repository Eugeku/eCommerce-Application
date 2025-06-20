import type { BaseAddress } from '@commercetools/platform-sdk';

class AddressBuilderUtility {
  private address: Partial<BaseAddress> = {
    country: '',
  };

  public withId(id: string): this {
    this.address = { ...this.address, id };
    return this;
  }

  public withKey(key: string): this {
    this.address = { ...this.address, key };
    return this;
  }

  public withCountry(country: string): this {
    this.address = { ...this.address, country };
    return this;
  }

  public withTitle(title: string): this {
    this.address = { ...this.address, title };
    return this;
  }

  public withSalutation(salutation: string): this {
    this.address = { ...this.address, salutation };
    return this;
  }

  public withFirstName(firstName: string): this {
    this.address = { ...this.address, firstName };
    return this;
  }

  public withLastName(lastName: string): this {
    this.address = { ...this.address, lastName };
    return this;
  }

  public withStreetName(streetName: string): this {
    this.address = { ...this.address, streetName };
    return this;
  }

  public withStreetNumber(streetNumber: string): this {
    this.address = { ...this.address, streetNumber };
    return this;
  }

  public withAdditionalStreetInfo(info: string): this {
    this.address = { ...this.address, additionalStreetInfo: info };
    return this;
  }

  public withPostalCode(postalCode: string): this {
    this.address = { ...this.address, postalCode };
    return this;
  }

  public withCity(city: string): this {
    this.address = { ...this.address, city };
    return this;
  }

  public withRegion(region: string): this {
    this.address = { ...this.address, region };
    return this;
  }

  public withState(state: string): this {
    this.address = { ...this.address, state };
    return this;
  }

  public withCompany(company: string): this {
    this.address = { ...this.address, company };
    return this;
  }

  public withDepartment(department: string): this {
    this.address = { ...this.address, department };
    return this;
  }

  public withBuilding(building: string): this {
    this.address = { ...this.address, building };
    return this;
  }

  public withApartment(apartment: string): this {
    this.address = { ...this.address, apartment };
    return this;
  }

  public withPOBox(pOBox: string): this {
    this.address = { ...this.address, pOBox };
    return this;
  }

  public withPhone(phone: string): this {
    this.address = { ...this.address, phone };
    return this;
  }

  public withMobile(mobile: string): this {
    this.address = { ...this.address, mobile };
    return this;
  }

  public withEmail(email: string): this {
    this.address = { ...this.address, email };
    return this;
  }

  public withFax(fax: string): this {
    this.address = { ...this.address, fax };
    return this;
  }

  public withAdditionalAddressInfo(info: string): this {
    this.address = { ...this.address, additionalAddressInfo: info };
    return this;
  }

  public withExternalId(externalId: string): this {
    this.address = { ...this.address, externalId };
    return this;
  }

  public build(): BaseAddress {
    if (!this.address.country) {
      throw new Error('Field "country" is required for BaseAddress');
    }

    return this.address as BaseAddress;
  }
}

export const AddressBuilder = (): AddressBuilderUtility => new AddressBuilderUtility();
