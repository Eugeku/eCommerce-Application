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
import type { TeamMemberData } from './about-us';

export class TeamMemberComponent extends BaseComponent<HTMLDivElement> {
  private readonly data: TeamMemberData;

  private readonly avatarWrapper: BaseComponent<HTMLDivElement>;
  private readonly avatar: BaseComponent<HTMLImageElement>;
  private readonly descriptionWrapper: BaseComponent<HTMLDivElement>;
  private readonly memberName: BaseComponent<HTMLHeadingElement>;
  private readonly memberRole: BaseComponent<HTMLHeadingElement>;
  private readonly memberDescription: BaseComponent<HTMLParagraphElement>;
  private readonly contributionsList: BaseComponent<HTMLUListElement>;
  private readonly githubLink: BaseComponent<HTMLAnchorElement>;

  constructor(
    id: string = 'team-member-component',
    className: string = 'team-member-component',
    data: TeamMemberData,
  ) {
    super(Tags.DIV, id, className);

    this.data = data;
    this.avatarWrapper = createDiv(undefined, 'avatar-wrapper');
    this.avatar = createImg(undefined, 'avatar');
    this.descriptionWrapper = createDiv(undefined, 'description-wrapper');
    this.memberName = createH2(undefined, 'member-name');
    this.memberRole = createH3(undefined, 'member-role');
    this.memberDescription = createP(undefined, 'member-description');
    this.contributionsList = createUl(undefined, 'contributions-list');
    this.githubLink = createA(undefined, 'github-link');

    this.init();
  }

  protected renderComponent(): void {
    this.avatarWrapper.appendTo(this.getElement());
    this.renderAvatar();
    this.descriptionWrapper.appendTo(this.getElement());
    this.renderMemberName();
    this.renderMemberRole();
    this.renderMemberDescription();
    this.contributionsList.appendTo(this.descriptionWrapper.getElement());
    this.renderContributionsList();
    this.renderGithubLink();
  }

  protected addEventListeners(): void {}

  private renderAvatar(): void {
    this.avatar.setAttribute('src', this.data.avatarSource);
    this.avatar.setAttribute('alt', this.data.avatarAlt);
    this.avatar.appendTo(this.avatarWrapper.getElement());
  }

  private renderMemberName(): void {
    this.memberName.setText(this.data.name);
    this.memberName.appendTo(this.descriptionWrapper.getElement());
  }

  private renderMemberRole(): void {
    this.memberRole.setText(this.data.role);
    this.memberRole.appendTo(this.descriptionWrapper.getElement());
  }

  private renderMemberDescription(): void {
    this.memberDescription.setText(this.data.description);
    this.memberDescription.appendTo(this.descriptionWrapper.getElement());
  }

  private renderContributionsList(): void {
    const contributions = this.data.contributions;

    for (const text of contributions) {
      const li = createLi();
      li.setText(text);
      li.appendTo(this.contributionsList.getElement());
    }
  }

  private renderGithubLink(): void {
    this.githubLink.setAttribute('href', this.data.githubLink);
    this.githubLink.setAttribute('target', '_blank');
    this.githubLink.appendTo(this.descriptionWrapper.getElement());
  }
}

export const teamMemberComponent = (
  data: TeamMemberData,
  id: string = 'team-member-component',
  className: string = 'team-member-component',
): TeamMemberComponent => new TeamMemberComponent(id, className, data);
