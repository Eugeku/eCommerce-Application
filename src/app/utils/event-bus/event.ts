export type AppEvents = {
  userLoggedIn: { userId: string };
  userLoggedOut: { userId: string };
  userUpdated: { userId: string };
  toggleBurger: object;
  hideBurger: object;
  selectCategoryId: { categoryId: string };
  searchText: { text: string };
  sort: { text: string };
  pagination: { page: number };
};
