import React from 'react';
import {TextInput} from './text-input';
import type {Meta, StoryObj} from '@storybook/nextjs-vite';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  render: (args) => <TextInput {...args} />,
  args: {
    label: 'input',
    placeholder: 'please type your name'
  }
};
