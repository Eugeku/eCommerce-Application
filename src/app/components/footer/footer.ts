// import { PlaceholderPage } from '@app/components/under-construction/under-construction';
import BaseComponent from '@common-components/base-component';
import { createA, createP } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './footer.scss';

class FooterComponent extends BaseComponent<HTMLDivElement> {
  private readonly link: BaseComponent<HTMLAnchorElement>;
  private readonly paragraph: BaseComponent<HTMLParagraphElement>;

  constructor(id: string = 'footer-component', className: string = 'footer-component') {
    super(Tags.DIV, id, className);

    this.link = createA(undefined, 'link');
    this.paragraph = createP(undefined, 'paragraph');

    this.init();
  }

  protected renderComponent(): void {
    this.renderLink();
    this.renderParagraph();
  }

  protected addEventListeners(): void {
    return;
  }

  private renderParagraph(): void {
    this.paragraph.appendTo(this.getElement());
    this.paragraph.setText(
      '2025 \u00A9 All graphic materials and texts on this site were used for non-commercial and educational purposes only and the authorship belongs to their legal owners.',
    );
  }

  private renderLink(): void {
    this.link.appendTo(this.getElement());
    this.link.setText('Made in The Rolling Scopes School');
    this.link.getElement().setAttribute('href', 'https://rs.school/courses/javascript');
  }
}

export const Footer = (): FooterComponent => new FooterComponent();
