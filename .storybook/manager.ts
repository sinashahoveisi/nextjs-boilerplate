import {addons} from '@storybook/manager-api';
import Theme from './theme/storybook-theme';

addons.setConfig({
  theme: Theme,
  isFullscreen: false,
  showNav: true,
  showPanel: false,
  showRoots: true,
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
  selectedPanel: 'storybook/controls/panel',
  initialActive: 'sidebar'
});
