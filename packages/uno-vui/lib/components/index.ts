import type { Plugin } from 'vue';
import { withInstall } from '../composables/with-install';

import Btn from './btn/btn.vue';
import Icon from './icon/icon.vue';
import Input from './input/input.vue';

export const UBtn = withInstall(Btn, "UBtn");
export const UIcon = withInstall(Icon, "UIcon");
export const UInput = withInstall(Input, "UInput");

export default [
  UBtn,
  UIcon,
  UInput
] as Plugin[];