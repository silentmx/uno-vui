import type { Plugin } from 'vue';
import { withInstall } from '../composables/with-install';

import Btn from './btn/btn.vue';

export const UnoBtn = withInstall(Btn, "UnoBtn");

export default [
  UnoBtn
] as Plugin[];