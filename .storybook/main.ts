import type {StorybookConfig} from '@storybook/nextjs-vite';
import path from 'path';
import {fileURLToPath} from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding'
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(dirname, '../src'),
      assets: path.resolve(dirname, '../src/assets'),
      configs: path.resolve(dirname, '../src/configs'),
      components: path.resolve(dirname, '../src/components'),
      constants: path.resolve(dirname, '../src/constants'),
      containers: path.resolve(dirname, '../src/containers'),
      hooks: path.resolve(dirname, '../src/hooks'),
      layout: path.resolve(dirname, '../src/layout'),
      libs: path.resolve(dirname, '../src/libs'),
      messages: path.resolve(dirname, '../src/messages'),
      providers: path.resolve(dirname, '../src/providers'),
      services: path.resolve(dirname, '../src/services'),
      stores: path.resolve(dirname, '../src/stores'),
      types: path.resolve(dirname, '../src/types'),
      utils: path.resolve(dirname, '../src/utils'),
      validations: path.resolve(dirname, '../src/validations'),
      test: path.resolve(dirname, '../src/test')
    };

    return config;
  }
};

export default config;
