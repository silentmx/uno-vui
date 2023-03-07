import type { Plugin } from 'vue';
import { withInstallDirective } from '../composables/install';

import popup from './popup';

export const VPopup = withInstallDirective(popup, "popup");

export default [
  VPopup
] as Plugin[];