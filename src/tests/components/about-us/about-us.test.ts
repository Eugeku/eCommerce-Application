import { describe, it, expect, beforeEach } from 'vitest';
import { AboutUs } from '@/app/components/about-us/about-us';
import { Evgenii, Mariia, Tatiana } from '@/app/components/about-us/team-members-data';

describe('AboutUsComponent', () => {
  let component: ReturnType<typeof AboutUs>;

  beforeEach(() => {
    component = AboutUs();
  });

  it('should create the component root element as a DIV', () => {
    expect(component.getElement().tagName).toBe('DIV');
  });

  it('should render the RS School logo with correct href and target', () => {
    const link = component['a'].getElement();
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('https://rs.school/');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('should render the heading with correct text', () => {
    const heading = component['h2'].getElement();
    expect(heading.tagName).toBe('H2');
    expect(heading.textContent).toBe('Meet Our 404 Team');
  });

  it('should render three team member components', () => {
    const membersContainer = component['membersContainer'].getElement();
    const members = membersContainer.querySelectorAll('.team-member-component');
    expect(members.length).toBe(3);

    const expectedNames = [Evgenii.name, Tatiana.name, Mariia.name];
    for (const [index, member] of members.entries()) {
      expect(member.querySelector('.member-name')?.textContent).toBe(expectedNames[index]);
    }
  });

  it('should render the collaboration section with title and description', () => {
    const wrapper = component['collaborationWrapper'].getElement();
    const title = component['collaborationTitle'].getElement();
    const description = component['collaborationDescription'].getElement();

    expect(wrapper).toContain(title);
    expect(wrapper).toContain(description);

    expect(title.textContent).toBe('Team Collaboration');
    expect(description.textContent?.length).toBeGreaterThan(10);
  });
});
