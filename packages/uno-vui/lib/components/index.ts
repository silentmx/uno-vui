import type { Plugin } from 'vue';
import { withInstall } from '../composables/with-install';

import Btn from './btn/btn.vue';
import Icon from './icon/icon.vue';

export const UvBtn = withInstall(Btn, "UvBtn");
export const UvIcon = withInstall(Icon, "UvIcon");

export default [
  UvBtn,
  UvIcon
] as Plugin[];