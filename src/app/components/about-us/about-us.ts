import BaseComponent from '@common-components/base-component';
import { createA, createDiv, createH2 } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './about-us.scss';
import { teamMemberComponent, type TeamMemberComponent } from './team-member';

class AboutUsComponent extends BaseComponent<HTMLDivElement> {
  private readonly a: BaseComponent<HTMLAnchorElement>;
  private readonly h2: BaseComponent<HTMLHeadingElement>;
  private readonly membersContainer: BaseComponent<HTMLDivElement>;

  private readonly teamMemberComponent: TeamMemberComponent;

  constructor(id: string = 'about-us-component', className: string = 'about-us-component') {
    super(Tags.DIV, id, className);

    this.a = createA(undefined, 'school-logo');
    this.h2 = createH2(undefined, 'heading-2');
    this.membersContainer = createDiv(undefined, 'team-members');

    this.teamMemberComponent = teamMemberComponent();

    this.init();
  }

  protected renderComponent(): void {
    this.renderA();
    this.renderH2();
    this.membersContainer.appendTo(this.getElement());

    this.teamMemberComponent.appendTo(this.membersContainer.getElement());
  }

  protected addEventListeners(): void {}

  private renderA(): void {
    this.a.setAttribute('href', 'https://rs.school/');
    this.a.setAttribute('target', '_blank');
    this.a.appendTo(this.getElement());
  }

  private renderH2(): void {
    this.h2.setText('Meet Our 404 Team');
    this.h2.appendTo(this.getElement());
  }
}

export const AboutUs = (): AboutUsComponent => new AboutUsComponent();
