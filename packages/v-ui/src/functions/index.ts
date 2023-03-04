/**
* Auto genrator
*/
import type { Plugin } from 'vue';
import { withInstallFunction } from '../composables/install';

import Message from './message';

export const VMessage = withInstallFunction(Message, "$VMessage");

export default [
  VMessage,
] as Plugin[];
