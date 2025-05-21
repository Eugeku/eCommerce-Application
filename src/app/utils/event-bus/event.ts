export type AppEvents = {
  userLoggedIn: { userId: string };
  userLoggedOut: { userId: string };
  toggleBurger: object;
  hideBurger: object;
  stopScrollWrapper: object;
  addScrollWrapper: object;
};
