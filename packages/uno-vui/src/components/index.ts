import { withInstall } from '../composables';

// components
import Btn from './btn/btn.vue';
import Icon from './icon/icon.vue';
import ThemePick from './theme-pick/theme-pick.vue';

// export
export const UBtn = withInstall(Btn, "UBtn");
export const UIcon = withInstall(Icon, "UIcon");
export const UThemePick = withInstall(ThemePick, "UThemePick");