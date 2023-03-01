/**
 * Auto genrator
 */
import type { Plugin } from 'vue';
import { withInstall } from '../composables/install';

import BtnGroup from './btn/group.vue';
import Btn from './btn/index.vue';

export const VBtnGroup = withInstall(BtnGroup, "VBtnGroup");
export const VBtn = withInstall(Btn, "VBtn");

export default [
  VBtnGroup,
  VBtn,
] as Plugin[];
