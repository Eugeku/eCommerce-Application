import BaseComponent from '../common/base-component';
import { createH3 } from '../common/base-component-factory';
import { Tags } from '../common/tags';
import './404.scss';

// TODO: Clean up comments in this component
class NotFoundComponent extends BaseComponent<HTMLDivElement> {
  
  /**
   * Inner components for the NotFoundComponent.
   */
  private readonly h3: BaseComponent<HTMLHeadingElement>;
  
  /**
   * Constructor for the NotFoundComponent.
   *
   * @param id the id of the component
   * @param className the class name of the component
   */
  constructor(id: string = 'not-found-component', className: string = 'not-found-component') {
    super(Tags.DIV, id, className);

    this.h3 = createH3(undefined, 'heading-3');
    
    this.init();
  }

  /**
   * Renders the component.
   */
  protected renderComponent() {
    this.renderHeading3();
  }

  /**
   * Adds event listeners to the component.
   */
  protected addEventListeners() {
    this.addEventListenerHeading3();
  }

  /**
   * Appends the h3 element to the current component and sets its attributes to display
   * '404 - Page Not Found'.
   */
  private renderHeading3() {
    this.h3.appendTo(this.getElement());
    this.h3.setText('404 - Page Not Found');
  }

  /**
   * Adds a click event listener to the h3 element.
   */
  private addEventListenerHeading3() {
    this.h3.addEventListener('click', () => {
      console.log('clicked');
    });
  }
}

/**
 * Creates a new instance of the NotFoundComponent.
 */
export const NotFound = (): NotFoundComponent => new NotFoundComponent();
