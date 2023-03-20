import type { Plugin } from 'vue';
import { withInstallDirective, withInstallFunction } from '../composables/with-install';

import { PopupDirective, popupFn } from './popup';

export const usePopup = withInstallFunction(popupFn, "popup");
export const vPopup = withInstallDirective(PopupDirective, "popup");

export default [
  usePopup
] as Plugin[];