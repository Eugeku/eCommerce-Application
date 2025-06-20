import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ApiPopup } from '@/app/components/popups/api-popup/api-popup';

/* eslint-disable max-lines-per-function */
describe('ApiPopupComponent', () => {
  let popup: ReturnType<typeof ApiPopup>;

  beforeEach(() => {
    popup = ApiPopup('Test error');
    const element = popup.getElement();
    (element as unknown as HTMLDialogElement).showModal = vi.fn();
    (element as unknown as HTMLDialogElement).close = vi.fn();
    document.body.append(element);
  });

  it('should create a dialog with default structure', () => {
    const dialog = popup.getElement();
    expect(dialog.tagName).toBe('DIALOG');
    expect(dialog.querySelector('.container')).toBeTruthy();
    expect(dialog.querySelector('.message')).toBeTruthy();
    expect(dialog.querySelector('.close-button')).toBeTruthy();
  });

  it('should set error message correctly', () => {
    popup.setErrorMessage('New error!');
    expect(popup.getElement().querySelector('.message')?.textContent).toBe('New error!');
  });

  it('should call showModal when show is called', () => {
    const showModalSpy = vi.spyOn(popup.getElement(), 'showModal');
    popup.show();
    expect(showModalSpy).toHaveBeenCalled();
  });

  it('should call onClose callback when closed', () => {
    const callback = vi.fn();
    popup.onClose(callback);

    popup
      .getElement()
      .querySelector('.close-button')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(callback).toHaveBeenCalled();
  });

  it('should close when clicking outside dialog (backdrop)', () => {
    const callback = vi.fn();
    popup.onClose(callback);

    popup.getElement().dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
      }),
    );
    expect(callback).toHaveBeenCalled();
  });

  it('should close on Escape key press', () => {
    const callback = vi.fn();
    popup.onClose(callback);

    popup.getElement().dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      }),
    );
    expect(callback).toHaveBeenCalled();
  });
});
