import BaseComponent from '@common-components/base-component';
import { Tags } from '@common-components/tags';

class FactoryComponent<T extends HTMLElement> extends BaseComponent<T> {
  protected renderComponent(): void {
    return;
  }

  protected addEventListeners(): void {
    return;
  }
}

function createElement<T extends HTMLElement>(
  tag: Tags,
  id = '',
  className = '',
): BaseComponent<T> {
  return new FactoryComponent<T>(tag, id, className);
}

export const createDiv = (id = '', className: string = Tags.DIV): BaseComponent<HTMLDivElement> =>
  createElement<HTMLDivElement>(Tags.DIV, id, className);
export const createSection = (
  id = '',
  className: string = Tags.SECTION,
): BaseComponent<HTMLDivElement> => createElement<HTMLDivElement>(Tags.SECTION, id, className);
export const createButton = (
  id = '',
  className: string = Tags.BUTTON,
): BaseComponent<HTMLButtonElement> => createElement<HTMLButtonElement>(Tags.BUTTON, id, className);
export const createInput = (
  id = '',
  className: string = Tags.INPUT,
): BaseComponent<HTMLInputElement> => createElement<HTMLInputElement>(Tags.INPUT, id, className);
export const createSpan = (
  id = '',
  className: string = Tags.SPAN,
): BaseComponent<HTMLSpanElement> => createElement<HTMLSpanElement>(Tags.SPAN, id, className);
export const createH1 = (id = '', className: string = Tags.H1): BaseComponent<HTMLHeadingElement> =>
  createElement<HTMLHeadingElement>(Tags.H1, id, className);
export const createH2 = (id = '', className: string = Tags.H2): BaseComponent<HTMLHeadingElement> =>
  createElement<HTMLHeadingElement>(Tags.H2, id, className);
export const createH3 = (id = '', className: string = Tags.H3): BaseComponent<HTMLHeadingElement> =>
  createElement<HTMLHeadingElement>(Tags.H3, id, className);
export const createH4 = (id = '', className: string = Tags.H4): BaseComponent<HTMLHeadingElement> =>
  createElement<HTMLHeadingElement>(Tags.H4, id, className);
export const createH5 = (id = '', className: string = Tags.H5): BaseComponent<HTMLHeadingElement> =>
  createElement<HTMLHeadingElement>(Tags.H5, id, className);
export const createH6 = (id = '', className: string = Tags.H6): BaseComponent<HTMLHeadingElement> =>
  createElement<HTMLHeadingElement>(Tags.H6, id, className);
export const createLabel = (
  id = '',
  className: string = Tags.LABEL,
): BaseComponent<HTMLLabelElement> => createElement<HTMLLabelElement>(Tags.LABEL, id, className);
export const createSelect = (
  id = '',
  className: string = Tags.SELECT,
): BaseComponent<HTMLSelectElement> => createElement<HTMLSelectElement>(Tags.SELECT, id, className);
export const createUl = (id = '', className: string = Tags.UL): BaseComponent<HTMLUListElement> =>
  createElement<HTMLUListElement>(Tags.UL, id, className);
export const createLi = (id = '', className: string = Tags.LI): BaseComponent<HTMLLIElement> =>
  createElement<HTMLLIElement>(Tags.LI, id, className);
export const createTextarea = (
  id = '',
  className: string = Tags.TEXTAREA,
): BaseComponent<HTMLTextAreaElement> =>
  createElement<HTMLTextAreaElement>(Tags.TEXTAREA, id, className);
export const createP = (id = '', className: string = Tags.P): BaseComponent<HTMLParagraphElement> =>
  createElement<HTMLParagraphElement>(Tags.P, id, className);
export const createA = (id = '', className: string = Tags.A): BaseComponent<HTMLAnchorElement> =>
  createElement<HTMLAnchorElement>(Tags.A, id, className);
export const createOption = (
  id = '',
  className: string = Tags.OPTION,
): BaseComponent<HTMLOptionElement> => createElement<HTMLOptionElement>(Tags.OPTION, id, className);
export const createImg = (id = '', className: string = Tags.IMG): BaseComponent<HTMLImageElement> =>
  createElement<HTMLImageElement>(Tags.IMG, id, className);
export const createTable = (
  id = '',
  className: string = Tags.TABLE,
): BaseComponent<HTMLTableElement> => createElement<HTMLTableElement>(Tags.TABLE, id, className);
export const createTr = (
  id = '',
  className: string = Tags.TR,
): BaseComponent<HTMLTableRowElement> => createElement<HTMLTableRowElement>(Tags.TR, id, className);
export const createTd = (
  id = '',
  className: string = Tags.TD,
): BaseComponent<HTMLTableCellElement> =>
  createElement<HTMLTableCellElement>(Tags.TD, id, className);
export const createTh = (
  id = '',
  className: string = Tags.TH,
): BaseComponent<HTMLTableCellElement> =>
  createElement<HTMLTableCellElement>(Tags.TH, id, className);
export const createThead = (
  id = '',
  className: string = Tags.THEAD,
): BaseComponent<HTMLTableSectionElement> =>
  createElement<HTMLTableSectionElement>(Tags.THEAD, id, className);
export const createTbody = (
  id = '',
  className: string = Tags.TBODY,
): BaseComponent<HTMLTableSectionElement> =>
  createElement<HTMLTableSectionElement>(Tags.TBODY, id, className);
export const createDialog = (
  id = '',
  className: string = Tags.DIALOG,
): BaseComponent<HTMLDialogElement> => createElement<HTMLDialogElement>(Tags.DIALOG, id, className);
export const createForm = (
  id = '',
  className: string = Tags.FORM,
): BaseComponent<HTMLFormElement> => createElement<HTMLFormElement>(Tags.FORM, id, className);
export const createCanvas = (
  id = '',
  className: string = Tags.CANVAS,
): BaseComponent<HTMLCanvasElement> => createElement<HTMLCanvasElement>(Tags.CANVAS, id, className);
