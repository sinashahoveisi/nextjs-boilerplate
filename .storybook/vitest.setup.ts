import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import {setProjectAnnotations} from '@storybook/nextjs-vite';
import * as projectAnnotations from './preview';

// Apply Storybook preview/config when running stories as Vitest tests.
// https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
