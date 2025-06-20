import { NotFound } from '@components/404/404';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';

describe('NotFoundComponent', () => {
  let component: ReturnType<typeof NotFound>;

  beforeEach(() => {
    component = NotFound();
    document.body.append(component.getElement());
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render with correct ID and class', () => {
    const element = component.getElement();
    expect(element.tagName).toBe('DIV');
    expect(element.id).toBe('not-found-component');
    expect(element.classList.contains('not-found-component')).toBe(true);
  });

  it('should contain h1 with text "Error 404"', () => {
    const h1 = component.getElement().querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toBe('Error 404');
    expect(h1?.classList.contains('heading-1')).toBe(true);
  });

  it('should contain h2 with text "Page Not Found!"', () => {
    const h2 = component.getElement().querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2?.textContent).toBe('Page Not Found!');
    expect(h2?.classList.contains('heading-2')).toBe(true);
  });
});
