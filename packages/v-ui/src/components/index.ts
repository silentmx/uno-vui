/**
 * Auto genrator
 */
import type { Plugin } from 'vue';
import { withInstall } from '../composables/install';

import Btn from './btn/index.vue';
import ThemePick from './theme-pick/index.vue';

export const VBtn = withInstall(Btn, "VBtn");
export const VThemePick = withInstall(ThemePick, "VThemePick");

export default [
  VBtn,
  VThemePick,
] as Plugin[];
