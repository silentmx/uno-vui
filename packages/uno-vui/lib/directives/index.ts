import type { Plugin } from 'vue';
import { withInstallFunction } from '../composables/with-install';

import { unoPopup } from './popup';

export const useUnoPopup = withInstallFunction(unoPopup, "unoPopup");

export default [
  useUnoPopup
] as Plugin[];