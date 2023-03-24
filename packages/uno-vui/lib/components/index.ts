import type { Plugin } from 'vue';
import { withInstall } from '../composables/with-install';

import Btn from './btn/btn.vue';

export const UvBtn = withInstall(Btn, "UvBtn");

export default [
  UvBtn
] as Plugin[];