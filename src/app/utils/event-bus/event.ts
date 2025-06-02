export type AppEvents = {
  userLoggedIn: { userId: string };
  userLoggedOut: { userId: string };
  userUpdated: { userId: string };
  toggleBurger: object;
  hideBurger: object;
};
