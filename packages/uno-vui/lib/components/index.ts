import type { Plugin } from 'vue';
import { withInstall } from '../composables/with-install';

import Btn from './btn/btn.vue';
import Icon from './icon/icon.vue';

export const UBtn = withInstall(Btn, "UBtn");
export const UIcon = withInstall(Icon, "UIcon");

export default [
  UBtn,
  UIcon
] as Plugin[];