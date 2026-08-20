import path from 'node:path';
import {fileURLToPath} from 'node:url';
import react from '@vitejs/plugin-react';
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
import {playwright} from '@vitest/browser-playwright';
import {defineConfig} from 'vitest/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info:
// - https://storybook.js.org/docs/writing-tests
// - https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    })
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@': path.resolve(dirname, './src'),
      assets: path.resolve(dirname, './src/assets'),
      configs: path.resolve(dirname, './src/configs'),
      components: path.resolve(dirname, './src/components'),
      constants: path.resolve(dirname, './src/constants'),
      containers: path.resolve(dirname, './src/containers'),
      hooks: path.resolve(dirname, './src/hooks'),
      layout: path.resolve(dirname, './src/layout'),
      libs: path.resolve(dirname, './src/libs'),
      messages: path.resolve(dirname, './src/messages'),
      providers: path.resolve(dirname, './src/providers'),
      services: path.resolve(dirname, './src/services'),
      stores: path.resolve(dirname, './src/stores'),
      types: path.resolve(dirname, './src/types'),
      utils: path.resolve(dirname, './src/utils'),
      validations: path.resolve(dirname, './src/validations'),
      test: path.resolve(dirname, './src/test')
    }
  },
  test: {
    globals: true,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['@testing-library/jest-dom/vitest', './vitest.setup.unit.ts'],
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          exclude: ['src/**/*.stories.{ts,tsx}', 'src/**/*.mdx']
        }
      },
      {
        plugins: [storybookTest({configDir: path.join(dirname, '.storybook')})],
        test: {
          name: 'storybook',
          setupFiles: ['.storybook/vitest.setup.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{browser: 'chromium'}]
          }
        }
      }
    ]
  }
});
