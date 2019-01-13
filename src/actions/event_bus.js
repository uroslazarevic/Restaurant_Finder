
export const SHOW_FORM_MODAL = 'SHOW_FORM_MODAL';
export const HIDE_FORM_MODAL = 'HIDE_FORM_MODAL';

export function setVisibleFM() {
  return {
    type: SHOW_FORM_MODAL,
  }
}

export function setHiddenFM() {
  return {
    type: HIDE_FORM_MODAL,
  }
}