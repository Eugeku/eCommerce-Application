type RouteHandler = () => void;

class Router {
  private routes: Map<string, RouteHandler> = new Map();
  private flag: boolean = false;

  constructor() {
    globalThis.addEventListener('hashchange', () => {
      if (this.flag) {
        this.handleRoute();
      }
      this.flag = true;
    });
  }

  public addRoute(path: string, handler: RouteHandler): void {
    this.routes.set(path, handler);
  }

  public navigate(path: string): void {
    this.flag = true;
    globalThis.location.hash = path;
    if (this.flag) {
      this.handleRoute();
    }
    this.flag = false;
  }

  public handleInitialRoute(initialRoute: string = '#/'): void {
    const currentHash = globalThis.location.hash
      ? globalThis.location.hash.replace('#', '')
      : initialRoute;
    this.navigate(currentHash);
  }

  private handleRoute(): void {
    const path = globalThis.location.hash || '';
    const handler = this.routes.get(path) || this.routes.get('*');
    if (handler) {
      handler();
    }
  }
}

export const router = new Router();
