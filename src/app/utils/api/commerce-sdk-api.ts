import {
  type ByProjectKeyRequestBuilder,
  type Cart,
  type CategoryPagedQueryResponse,
  createApiBuilderFromCtpClient,
  type Customer,
  type LineItem,
  type MyCartUpdateAction,
  type MyCustomerUpdateAction,
  type ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import type { QueryParam, ClientResponse } from '@commercetools/ts-client';
import { CustomerBuilder } from '@utils/api/bean/customer-builder';
import { ApiClient } from '@utils/api/build-client';
import { clearTokens, UserCache } from '@utils/api/token-cache';
import type { AddressData, PersonalInfoData } from '@/app/components/profile/profile';

export type SearchOptions = {
  filter?: string[];
  sort?: string[];
  limit: number;
  offset: number;
  searchText?: string;
};

class CommerceSdkApi {
  private static instance: CommerceSdkApi;
  private apiRoot: ByProjectKeyRequestBuilder;

  private readonly projectKeyObject = {
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  };

  constructor() {
    this.apiRoot = this.withAnonymousSessionFlow().apiRoot;
  }

  public static getInstance(): CommerceSdkApi {
    if (!CommerceSdkApi.instance) {
      CommerceSdkApi.instance = new CommerceSdkApi();
      CommerceSdkApi.instance.initializeSession();
    }
    return CommerceSdkApi.instance;
  }

  // Login
  public getProject(): Promise<ClientResponse> {
    return this.apiRoot.get().execute();
  }

  public createCustomer(customer: Customer = CustomerBuilder().build()): Promise<ClientResponse> {
    return this.apiRoot
      .customers()
      .post({
        body: {
          email: customer.email,
          password: customer.password,
          firstName: customer.firstName,
          lastName: customer.lastName,
          dateOfBirth: customer.dateOfBirth,
          addresses: customer.addresses,
          defaultShippingAddress: customer.defaultShippingAddressId ? 0 : undefined,
          defaultBillingAddress: customer.defaultBillingAddressId
            ? customer.addresses.length > 1
              ? 1
              : 0
            : undefined,
        },
      })
      .execute();
  }

  public async updateCustomer(data: PersonalInfoData): Promise<ClientResponse> {
    const me = await this.apiRoot.me().get().execute();

    return this.apiRoot
      .me()
      .post({
        body: {
          version: me.body.version,
          actions: [
            {
              action: 'changeEmail',
              email: data.email,
            },
            {
              action: 'setFirstName',
              firstName: data.firstName,
            },
            {
              action: 'setLastName',
              lastName: data.lastName,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: data.dateOfBirth,
            },
          ],
        },
      })
      .execute();
  }

  public async addAddress(data: AddressData): Promise<ClientResponse> {
    const me = await this.apiRoot.me().get().execute();

    const actions: MyCustomerUpdateAction[] = [
      {
        action: 'addAddress',
        address: {
          key: data.key,
          streetName: data.street,
          city: data.city,
          country: data.country,
          postalCode: data.postalCode,
        },
      },
    ];

    if (data.isDefaultShipping) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressKey: data.key,
      });
    }

    if (data.isDefaultBilling) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressKey: data.key,
      });
    }

    return this.apiRoot
      .me()
      .post({
        body: {
          version: me.body.version,
          actions: actions,
        },
      })
      .execute();
  }

  public async deleteAddress(id: string): Promise<ClientResponse> {
    const me = await this.apiRoot.me().get().execute();

    return this.apiRoot
      .me()
      .post({
        body: {
          version: me.body.version,
          actions: [
            {
              action: 'removeAddress',
              addressId: id,
            },
          ],
        },
      })
      .execute();
  }

  public async updatePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<ClientResponse> {
    const me = await this.apiRoot.me().get().execute();

    return this.apiRoot
      .customers()
      .password()
      .post({
        body: {
          id: me.body.id,
          version: me.body.version,
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
      })
      .execute();
  }

  public async loginUser(email: string, password: string): Promise<ClientResponse> {
    const anonymousId = UserCache.getOrCreateAnonymousId();
    const response = await this.apiRoot
      .login()
      .post({
        body: { email, password, anonymousId: anonymousId ?? undefined },
      })
      .execute();
    UserCache.clearAnonymousId();
    return response;
  }

  public logoutUser(): void {
    clearTokens();
    UserCache.clearUser();
    UserCache.clearAnonymousId();
    this.withAnonymousSessionFlow();
  }

  public getMe(): Promise<ClientResponse> {
    return this.apiRoot.me().get().execute();
  }

  // Store
  public getProducts(): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    return this.apiRoot.productProjections().search().get().execute();
  }

  public getProductsBySearchOptions(
    options: SearchOptions,
  ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    const { filter = [], sort = [], limit = 10, offset = 0, searchText = '' } = options;

    const queryArgs: { [key: string]: QueryParam } = {
      filter,
      sort,
      limit,
      offset,
    };
    if (searchText) {
      queryArgs['text.en-US'] = searchText;
    }
    return this.apiRoot.productProjections().search().get({ queryArgs }).execute();
  }

  public getCategories(): Promise<ClientResponse<CategoryPagedQueryResponse>> {
    return this.apiRoot.categories().get().execute();
  }

  public async getCart(): Promise<ClientResponse<Cart>> {
    const cart = await this.apiRoot
      .me()
      .activeCart()
      .get()
      .execute()
      .catch(() =>
        this.apiRoot
          .me()
          .carts()
          .post({ body: { currency: 'USD', country: 'US' } })
          .execute(),
      );

    return cart;
  }

  public async getProductQuantityInCart(productId: string, variantId?: number): Promise<number> {
    const lineItem: LineItem | undefined = await this.getLineItemByProductId(productId, variantId);
    return lineItem?.quantity ?? 0;
  }

  public async getLineItemByProductId(
    productId: string,
    variantId?: number,
  ): Promise<LineItem | undefined> {
    const cartResponse = await this.getCart();
    const cart = cartResponse.body;

    if (!cart || !cart.lineItems) return undefined;

    const lineItem: LineItem | undefined = cart.lineItems.find(
      (item) =>
        item.productId === productId && (variantId === undefined || item.variant.id === variantId),
    );

    return lineItem;
  }

  public async getLineItemByLineItemId(lineItemId: string): Promise<LineItem | undefined> {
    const cartResponse = await this.getCart();
    const cart = cartResponse.body;
    if (!cart || !cart.lineItems) return undefined;
    const lineItem: LineItem | undefined = cart.lineItems.find((item) => item.id === lineItemId);
    return lineItem;
  }

  public async addLineItemToCart(
    productId: string,
    variantId: number,
    quantity = 1,
  ): Promise<ClientResponse<Cart>> {
    const cart = await this.getCart();

    if (cart.body) {
      return this.apiRoot
        .me()
        .carts()
        .withId({ ID: cart.body.id })
        .post({
          body: {
            version: cart.body.version,
            actions: [
              {
                action: 'addLineItem',
                productId,
                variantId,
                quantity,
              },
            ],
          },
        })
        .execute();
    }
    return cart;
  }

  public async changeLineItemCart(lineItemId: string, quantity = 1): Promise<ClientResponse<Cart>> {
    const cart = await this.getCart();

    if (cart.body) {
      return this.apiRoot
        .me()
        .carts()
        .withId({ ID: cart.body.id })
        .post({
          body: {
            version: cart.body.version,
            actions: [
              {
                action: 'changeLineItemQuantity',
                lineItemId: lineItemId,
                quantity,
              },
            ],
          },
        })
        .execute();
    }
    return cart;
  }

  public async removeLineItemFromCart(lineItemIds: string[]): Promise<ClientResponse<Cart>> {
    const cart = await this.getCart();

    const removeActions: MyCartUpdateAction[] = lineItemIds.map((lineItemId) => ({
      action: 'removeLineItem',
      lineItemId,
    }));

    if (cart.body) {
      return this.apiRoot
        .me()
        .carts()
        .withId({ ID: cart.body.id })
        .post({
          body: {
            version: cart.body.version,
            actions: removeActions,
          },
        })
        .execute();
    }
    return cart;
  }

  public async applyDiscountCodeToCart(code: string): Promise<ClientResponse<Cart>> {
    const cart = await this.getCart();
    if (cart.body) {
      return this.apiRoot
        .me()
        .carts()
        .withId({ ID: cart.body.id })
        .post({
          body: {
            version: cart.body.version,
            actions: [
              {
                action: 'addDiscountCode',
                code,
              },
            ],
          },
        })
        .execute();
    }
    return cart;
  }

  public withAnonymousSessionFlow(): CommerceSdkApi {
    const anonymousId = UserCache.getOrCreateAnonymousId();
    this.apiRoot = createApiBuilderFromCtpClient(
      ApiClient().anonymousClient(anonymousId),
    ).withProjectKey(this.projectKeyObject);
    return this;
  }

  public withPasswordFlow(login: string, password: string): CommerceSdkApi {
    this.apiRoot = createApiBuilderFromCtpClient(
      ApiClient().clientWithPassword(login, password),
    ).withProjectKey(this.projectKeyObject);
    return this;
  }

  public withExistingToken(): CommerceSdkApi {
    const token = ApiClient().getTokenCache().get().token;
    this.apiRoot = createApiBuilderFromCtpClient(
      ApiClient().getTokenCacheClient(token),
    ).withProjectKey(this.projectKeyObject);

    return this;
  }

  public isLoggedIn(): boolean {
    const token = ApiClient().getTokenCache().get();
    const now = Math.floor(Date.now() / 1000);
    const user = UserCache.get();

    return token && token.expirationTime > now && user !== undefined;
  }

  public async changeAddress(data: AddressData): Promise<ClientResponse> {
    const me = await this.apiRoot.me().get().execute();
    const defaultShippingId = me.body.defaultShippingAddressId;
    const defualtBillingId = me.body.defaultBillingAddressId;

    const actions: MyCustomerUpdateAction[] = this.getChangeAddressActions(
      data,
      defaultShippingId,
      defualtBillingId,
    );

    return this.apiRoot
      .me()
      .post({
        body: {
          version: me.body.version,
          actions: actions,
        },
      })
      .execute();
  }

  private getChangeAddressActions(
    data: AddressData,
    defaultShippingId: string | undefined,
    defualtBillingId: string | undefined,
  ): MyCustomerUpdateAction[] {
    const actions: MyCustomerUpdateAction[] = [
      {
        action: 'changeAddress',
        addressId: data.id,
        address: {
          streetName: data.street,
          city: data.city,
          country: data.country,
          postalCode: data.postalCode,
        },
      },
    ];

    this.pushSetDefaultShippingActionForChangeAddress(actions, defaultShippingId, data);
    this.pushSetDefaultBillingActionForChangeAddress(actions, defualtBillingId, data);

    return actions;
  }

  private pushSetDefaultShippingActionForChangeAddress(
    actions: MyCustomerUpdateAction[],
    defaultShippingId: string | undefined,
    data: AddressData,
  ): void {
    if (data.isDefaultShipping && defaultShippingId !== data.id) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: data.id,
      });
    } else if (!data.isDefaultShipping && defaultShippingId === data.id) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: undefined,
      });
    }
  }

  private pushSetDefaultBillingActionForChangeAddress(
    actions: MyCustomerUpdateAction[],
    defualtBillingId: string | undefined,
    data: AddressData,
  ): void {
    if (data.isDefaultBilling && defualtBillingId !== data.id) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: data.id,
      });
    } else if (!data.isDefaultBilling && defualtBillingId === data.id) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: undefined,
      });
    }
  }

  private initializeSession(): void {
    if (this.isLoggedIn()) {
      this.withExistingToken();
    } else {
      this.logoutUser();
    }
  }
}

export const SdkApi = (): CommerceSdkApi => CommerceSdkApi.getInstance();
