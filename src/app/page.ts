import { NotFound } from './components/404/404';
import BaseComponent from './components/common/base-component';
import { Tags } from './components/common/tags';
import './page.scss';

// TODO: Clean up comments in this component
export class PageWrapperComponent extends BaseComponent<HTMLDivElement> {
  private readonly notFound = NotFound();

  constructor(id: string = 'page-wrapper-component', className: string = 'page-wrapper-component') {
    super(Tags.DIV, id, className);
    
    this.init();
  }

  protected renderComponent(): void {
    // If we need by default load component during rendering PageWrapperComponent
    this.renderNotFoundComponent();
  }

  protected addEventListeners(): void {
    return;
  }

  private renderNotFoundComponent(): void {
    console.log('openNotFound');
    console.log(this.notFound);
    this.notFound.appendTo(this.getElement());
  }

  /**
   * On-demand open for routings in App.ts.
   * Adds the notFound component to the page wrapper container.
   */
  public openNotFound(): void {
    this.notFound.appendTo(this.getElement());
  }
}

export const PageWrapper = (): PageWrapperComponent => new PageWrapperComponent();
