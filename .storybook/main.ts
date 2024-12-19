import type {StorybookConfig} from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  staticDirs: ['../public'],
  webpackFinal: async (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src/'),
      assets: path.resolve(__dirname, '../src/assets'),
      configs: path.resolve(__dirname, '../src/configs'),
      components: path.resolve(__dirname, '../src/components'),
      constants: path.resolve(__dirname, '../src/constants'),
      containers: path.resolve(__dirname, '../src/containers'),
      hooks: path.resolve(__dirname, '../src/hooks'),
      layout: path.resolve(__dirname, '../src/layout'),
      libs: path.resolve(__dirname, '../src/libs'),
      messages: path.resolve(__dirname, '../src/messages'),
      providers: path.resolve(__dirname, '../src/providers'),
      services: path.resolve(__dirname, '../src/services'),
      types: path.resolve(__dirname, '../src/types'),
      utils: path.resolve(__dirname, '../src/utils'),
      validations: path.resolve(__dirname, '../src/validations')
    };
    return config;
  }
};
export default config;
