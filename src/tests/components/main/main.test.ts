import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Main } from '@/app/components/main/main';

describe('MainComponent', () => {
  let main: ReturnType<typeof Main>;

  beforeEach(() => {
    main = Main();
    document.body.append(main.getElement());
  });

  it('should render hero section with correct headings', () => {
    const h1 = main.getElement().querySelector('.heading-1');
    const h2 = main.getElement().querySelector('.heading-2');

    expect(h1).toBeTruthy();
    expect(h1?.textContent).toBe('Welcome (^\u00A0\u03C9\u00A0^)/');

    expect(h2).toBeTruthy();
    expect(h2?.textContent).toBe('Explore the collection of Fantasy Equipment~');
  });

  it('should render promo section with promocode', () => {
    const promoCode = main.getElement().querySelector('.promo-code');

    expect(promoCode).toBeTruthy();
    expect(promoCode?.textContent).toBe('FANTASY_SALE');
  });

  it('should copy promocode to clipboard when clicked', async () => {
    const writeTextMock = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
    });

    const promoCode = main.getElement().querySelector('.promo-code');

    if (!promoCode || !(promoCode instanceof HTMLElement)) {
      throw new Error('Promo code element not found or not an HTMLElement');
    }

    promoCode.click();

    expect(writeTextMock).toHaveBeenCalledOnce();
    expect(writeTextMock).toHaveBeenCalledWith('FANTASY_SALE');
  });
});
