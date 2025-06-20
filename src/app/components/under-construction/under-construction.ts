import BaseComponent from '@common-components/base-component';
import { createH1, createH2 } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './under-construction.scss';

class UnderConstruction extends BaseComponent<HTMLDivElement> {
  private readonly h2: BaseComponent<HTMLHeadingElement>;
  private readonly h1: BaseComponent<HTMLHeadingElement>;

  constructor(id: string = 'under-construction', className: string = 'under-construction') {
    super(Tags.DIV, id, className);

    this.h2 = createH2(undefined, 'heading-2');
    this.h1 = createH1(undefined, 'heading-1');

    this.init();
  }

  protected renderComponent(): void {
    this.renderHeading2();
    this.renderHeading1();
  }

  protected addEventListeners(): void {
    return;
  }

  private renderHeading2(): void {
    this.h2.appendTo(this.getElement());
    this.h2.setText('This page is Under construction...');
  }

  private renderHeading1(): void {
    this.h1.appendTo(this.getElement());
    this.h1.setText('Stay tuned!');
  }
}

export const PlaceholderPage = (): UnderConstruction => new UnderConstruction();
