import { describe, it, expect, beforeEach } from 'vitest';
import type { TeamMemberData } from '@/app/components/about-us/about-us';
import { TeamMemberComponent } from '@/app/components/about-us/team-member';

/* eslint-disable max-lines-per-function */
describe('TeamMemberComponent', () => {
  let data: TeamMemberData;
  let component: TeamMemberComponent;

  beforeEach(() => {
    data = {
      name: 'John',
      role: 'Developer',
      description: 'Works on UI and UX.',
      avatarSource: '/assets/avatars/Avatar-John.png',
      avatarAlt: 'John avatar',
      contributions: ['Implemented feature X', 'Fixed bug Y'],
      githubLink: 'https://github.com/john',
    };

    component = new TeamMemberComponent('team-member-component', 'team-member-component', data);
  });

  it('should create the root element with correct tag and classes', () => {
    const element = component.getElement();
    expect(element.tagName).toBe('DIV');
    expect(element.classList.contains('team-member-component')).toBe(true);
    expect(element.id).toBe('team-member-component');
  });

  it('should render avatar with correct src and alt', () => {
    const img = component['avatar'].getElement();
    expect(img.tagName).toBe('IMG');
    expect(img.src).toContain(data.avatarSource);
    expect(img.alt).toBe(data.avatarAlt);
  });

  it('should render member name, role and description', () => {
    const name = component['memberName'].getElement();
    const role = component['memberRole'].getElement();
    const description = component['memberDescription'].getElement();

    expect(name.textContent).toBe(data.name);
    expect(role.textContent).toBe(data.role);
    expect(description.textContent).toBe(data.description);
  });

  it('should render contributions list correctly', () => {
    const ul = component['contributionsList'].getElement();
    const items = ul.querySelectorAll('li');
    expect(items.length).toBe(data.contributions.length);
    for (const [index, text] of data.contributions.entries()) {
      expect(items[index].textContent).toBe(text);
    }
  });

  it('should render github link with correct href and target', () => {
    const link = component['githubLink'].getElement();
    expect(link.tagName).toBe('A');
    expect(link.href).toBe(data.githubLink);
    expect(link.target).toBe('_blank');
  });
});
