import { withInstall } from '../composables';

// components
import Icon from './icon/icon.vue';
import ThemePick from './theme-pick/theme-pick.vue';


// export
export const UIcon = withInstall(Icon, "UIcon");
export const UThemePick = withInstall(ThemePick, "UThemePick");