import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TextInput} from './text-input';

describe('TextInput', () => {
  it('renders label and placeholder', () => {
    render(<TextInput name='name' label='input' placeholder='please type your name' />);

    expect(screen.getByText('input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('please type your name')).toBeInTheDocument();
  });

  it('accepts typed input', async () => {
    const user = userEvent.setup();
    render(<TextInput name='name' label='input' placeholder='please type your name' />);

    const input = screen.getByPlaceholderText('please type your name');
    await user.type(input, 'Sina');

    expect(input).toHaveValue('Sina');
  });

  it('shows an error message', () => {
    render(<TextInput name='name' label='input' error={{message: 'Phone number is required'}} placeholder='phone' />);

    expect(screen.getByText('Phone number is required')).toBeInTheDocument();
  });
});
