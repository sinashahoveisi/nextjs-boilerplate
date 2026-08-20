import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {ErrorMessage} from './error-message';

describe('ErrorMessage', () => {
  it('renders nothing when text is empty', () => {
    const {container} = render(<ErrorMessage text={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the error text', () => {
    render(<ErrorMessage text='Phone number is required' />);
    expect(screen.getByText('Phone number is required')).toBeInTheDocument();
  });
});
