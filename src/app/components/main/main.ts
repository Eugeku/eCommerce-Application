// import { PlaceholderPage } from '@app/components/under-construction/under-construction';
import BaseComponent from '@common-components/base-component';
import {
  createH1,
  createH2,
  createH3,
  createH4,
  createP,
  createDiv,
  createSection,
  createSpan,
} from '@common-components/base-component-factory';
import { Tags } from '@common-components/tags';
import './main.scss';

class MainComponent extends BaseComponent<HTMLDivElement> {
  private readonly heroSection: BaseComponent<HTMLDivElement>;
  private readonly h1: BaseComponent<HTMLHeadingElement>;
  private readonly h2: BaseComponent<HTMLHeadingElement>;
  private readonly promoSection: BaseComponent<HTMLDivElement>;
  private readonly h3promo: BaseComponent<HTMLHeadingElement>;
  private readonly h4promo: BaseComponent<HTMLHeadingElement>;
  private readonly spanPromoText: BaseComponent<HTMLSpanElement>;
  private readonly spanPromoCode: BaseComponent<HTMLSpanElement>;
  private readonly promoHappy: BaseComponent<HTMLParagraphElement>;
  private readonly promoHappyEmoji: BaseComponent<HTMLSpanElement>;
  private readonly promocode: string = 'FANTASY_SALE';

  constructor(id: string = 'main-component', className: string = 'main-component') {
    super(Tags.DIV, id, className);

    this.heroSection = createSection('hero', 'hero-section');
    this.h1 = createH1(undefined, 'heading-1');
    this.h2 = createH2(undefined, 'heading-2');

    this.promoSection = createSection('promo', 'promo-section');
    this.h3promo = createH3(undefined, 'heading-3');
    this.h4promo = createH4(undefined, 'heading-4');
    this.spanPromoText = createSpan(undefined, 'promo-text');
    this.spanPromoCode = createSpan(undefined, 'promo-code');
    this.promoHappy = createP(undefined, 'promo-happy');
    this.promoHappyEmoji = createSpan(undefined, 'promo-happy-emoji');

    this.init();
  }

  protected renderComponent(): void {
    this.renderHeroSection();
    this.renderPromoSection();
  }

  protected addEventListenerPromocodeCopy(): void {
    this.spanPromoCode.addEventListener('click', () => {
      navigator.clipboard.writeText(this.promocode);
    });
  }

  protected addEventListeners(): void {
    this.addEventListenerPromocodeCopy();
  }

  private renderHeroSection(): void {
    this.heroSection.appendTo(this.getElement());
    this.h1.appendTo(this.heroSection.getElement());
    this.h1.setText('Welcome (^\u00A0\u03C9\u00A0^)/');
    this.h2.appendTo(this.heroSection.getElement());
    this.h2.setText('Explore the collection of Fantasy Equipment~');
  }

  private renderPromoSection(): void {
    this.promoSection.appendTo(this.getElement());
    this.h3promo.appendTo(this.promoSection.getElement());
    this.h3promo.setText('A newbie in the gaming world?');
    this.h4promo.appendTo(this.promoSection.getElement());
    this.spanPromoText.appendTo(this.h4promo.getElement());
    this.spanPromoText.setText('Grab a marvelous discount by promocode: ');
    this.spanPromoCode.appendTo(this.h4promo.getElement());
    this.spanPromoCode.setText(this.promocode);
    this.promoHappy.appendTo(this.promoSection.getElement());
    this.promoHappy.setText('Happy Shopping!');
    this.promoHappyEmoji.appendTo(this.promoHappy.getElement());
    this.promoHappyEmoji.setText('\u30FE(\u00A0\u0302\u00A0\u1401\u00A0\u0302\u00A0)');
  }
}

export const Main = (): MainComponent => new MainComponent();
