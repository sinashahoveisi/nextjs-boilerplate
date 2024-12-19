import React from 'react';
import {MainProvider} from '../src/providers/main';
import type {Preview} from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

const Provider = (Story: any) => (
  <MainProvider>
    <Story />
  </MainProvider>
);

export default preview;
export const decorators = [Provider];
