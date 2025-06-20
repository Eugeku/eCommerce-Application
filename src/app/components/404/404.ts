import BaseComponent from '@common-components/base-component';
import { createH1, createH2 } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './404.scss';

class NotFoundComponent extends BaseComponent<HTMLDivElement> {
  private readonly h1: BaseComponent<HTMLHeadingElement>;
  private readonly h2: BaseComponent<HTMLHeadingElement>;

  constructor(id: string = 'not-found-component', className: string = 'not-found-component') {
    super(Tags.DIV, id, className);

    this.h1 = createH1(undefined, 'heading-1');
    this.h2 = createH2(undefined, 'heading-2');

    this.init();
  }

  protected renderComponent(): void {
    this.renderHeading1();
    this.renderHeading2();
  }

  protected addEventListeners(): void {
    return;
  }

  private renderHeading1(): void {
    this.h1.appendTo(this.getElement());
    this.h1.setText('Error 404');
  }

  private renderHeading2(): void {
    this.h2.appendTo(this.getElement());
    this.h2.setText('Page Not Found!');
  }
}

export const NotFound = (): NotFoundComponent => new NotFoundComponent();
