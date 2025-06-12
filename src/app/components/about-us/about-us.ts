import BaseComponent from '@common-components/base-component';
import { createA, createDiv, createH2, createP } from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './about-us.scss';
import { teamMemberComponent, type TeamMemberComponent } from './team-member';
import { Evgenii, Mariia, Tatiana } from './team-members-data';

export type TeamMemberData = {
  avatarSource: string;
  avatarAlt: string;
  name: string;
  role: string;
  description: string;
  contributions: Array<string>;
  githubLink: string;
};

class AboutUsComponent extends BaseComponent<HTMLDivElement> {
  private readonly a: BaseComponent<HTMLAnchorElement>;
  private readonly h2: BaseComponent<HTMLHeadingElement>;
  private readonly membersContainer: BaseComponent<HTMLDivElement>;

  private readonly teamMemberComponent1: TeamMemberComponent;
  private readonly teamMemberComponent2: TeamMemberComponent;
  private readonly teamMemberComponent3: TeamMemberComponent;

  private readonly collaborationWrapper: BaseComponent<HTMLDivElement>;
  private readonly collaborationTitle: BaseComponent<HTMLHeadingElement>;
  private readonly collaborationDescription: BaseComponent<HTMLParagraphElement>;

  constructor(id: string = 'about-us-component', className: string = 'about-us-component') {
    super(Tags.DIV, id, className);

    this.a = createA(undefined, 'school-logo');
    this.h2 = createH2(undefined, 'heading-2');
    this.membersContainer = createDiv(undefined, 'team-members');

    this.teamMemberComponent1 = teamMemberComponent(Evgenii);
    this.teamMemberComponent2 = teamMemberComponent(Tatiana);
    this.teamMemberComponent3 = teamMemberComponent(Mariia);

    this.collaborationWrapper = createDiv(undefined, 'collaboration');
    this.collaborationTitle = createH2(undefined, 'heading-2');
    this.collaborationDescription = createP(undefined, 'collaboration-description');

    this.init();
  }

  protected renderComponent(): void {
    this.renderA();
    this.renderH2();
    this.membersContainer.appendTo(this.getElement());

    this.teamMemberComponent1.appendTo(this.membersContainer.getElement());
    this.teamMemberComponent2.appendTo(this.membersContainer.getElement());
    this.teamMemberComponent3.appendTo(this.membersContainer.getElement());

    this.collaborationWrapper.appendTo(this.getElement());
    this.renderCollaborationTitle();
    this.renderCollaborationDescription();
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

  private renderCollaborationTitle(): void {
    this.collaborationTitle.setText('Team Collaboration');
    this.collaborationTitle.appendTo(this.collaborationWrapper.getElement());
  }

  private renderCollaborationDescription(): void {
    this.collaborationDescription.setText(
      'Our team embraced agile collaboration, structured communication through Jira, and continuous peer support. Each member brought complementary strengths that, together, delivered a cohesive and fully functional SPA. From planning and design to integration and testing, we shared tasks, reviewed each other code, and maintained a common vision. The result – a robust, beautiful, and user-friendly application we’re proud of!',
    );
    this.collaborationDescription.appendTo(this.collaborationWrapper.getElement());
  }
}

export const AboutUs = (): AboutUsComponent => new AboutUsComponent();
