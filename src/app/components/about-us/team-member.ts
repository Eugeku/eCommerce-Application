import BaseComponent from '@common-components/base-component';
import {
  createA,
  createDiv,
  createH2,
  createH3,
  createImg,
  createP,
  createUl,
  createLi,
} from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';

export class TeamMemberComponent extends BaseComponent<HTMLDivElement> {
  private readonly avatarWrapper: BaseComponent<HTMLDivElement>;
  private readonly avatar1: BaseComponent<HTMLImageElement>;
  private readonly descriptionWrapper: BaseComponent<HTMLDivElement>;
  private readonly member1Name: BaseComponent<HTMLHeadingElement>;
  private readonly member1Role: BaseComponent<HTMLHeadingElement>;
  private readonly member1Description: BaseComponent<HTMLParagraphElement>;
  private readonly contributionsList1: BaseComponent<HTMLUListElement>;
  private readonly githubLink1: BaseComponent<HTMLAnchorElement>;

  constructor(id: string = 'team-member-component', className: string = 'team-member-component') {
    super(Tags.DIV, id, className);

    this.avatarWrapper = createDiv(undefined, 'avatar-wrapper');
    this.avatar1 = createImg(undefined, 'avatar');
    this.descriptionWrapper = createDiv(undefined, 'description-wrapper');
    this.member1Name = createH2(undefined, 'member-name');
    this.member1Role = createH3(undefined, 'member-role');
    this.member1Description = createP(undefined, 'member-description');
    this.contributionsList1 = createUl(undefined, 'contributions-list');
    this.githubLink1 = createA(undefined, 'github-link');

    this.init();
  }

  protected renderComponent(): void {
    this.avatarWrapper.appendTo(this.getElement());
    this.renderAvatar1();
    this.descriptionWrapper.appendTo(this.getElement());
    this.renderMember1Name();
    this.renderMember1Role();
    this.renderMember1Description();
    this.contributionsList1.appendTo(this.descriptionWrapper.getElement());
    this.renderContributionsList1();
    this.renderGithubLink1();
  }

  protected addEventListeners(): void {}

  private renderAvatar1(): void {
    this.avatar1.setAttribute('src', '/assets/avatars/Avatar-Evgenii.png');
    this.avatar1.setAttribute('alt', 'Evgenii avatar');
    this.avatar1.appendTo(this.avatarWrapper.getElement());
  }

  private renderMember1Name(): void {
    this.member1Name.setText('Yauhen');
    this.member1Name.appendTo(this.descriptionWrapper.getElement());
  }

  private renderMember1Role(): void {
    this.member1Role.setText('Team Lead / Developer');
    this.member1Role.appendTo(this.descriptionWrapper.getElement());
  }

  private renderMember1Description(): void {
    this.member1Description.setText(
      'Yauhen is the backbone of Team 404. With deep expertise in TypeScript and backend integration, he led the team through technical challenges and setup complexities.He streamlined the foundation for the project and empowered the team with solid architecture.',
    );
    this.member1Description.appendTo(this.descriptionWrapper.getElement());
  }

  private renderContributionsList1(): void {
    const contributions = [
      'Project configuration & initial setup',
      'Products search, Catalog & Filtering, Basket',
      'Pop-up notifications system',
      'Server-side Login & Registration',
      'SDK, Jira, GitHub repository setup',
    ];

    for (const text of contributions) {
      const li = createLi();
      li.setText(text);
      li.appendTo(this.contributionsList1.getElement());
    }
  }

  private renderGithubLink1(): void {
    this.githubLink1.setAttribute('href', 'https://github.com/eugeku');
    this.githubLink1.setAttribute('target', '_blank');
    this.githubLink1.appendTo(this.descriptionWrapper.getElement());
  }
}

export const teamMemberComponent = (): TeamMemberComponent => new TeamMemberComponent();
