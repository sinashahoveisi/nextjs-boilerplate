import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {ErrorPage} from './error-page';

describe('ErrorPage', () => {
  it('renders code, title, and description', () => {
    render(
      <ErrorPage
        code={404}
        title='Page not found.'
        description='Sorry, we could not find that page.'
        resetText='Reload'
      />
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found.')).toBeInTheDocument();
    expect(screen.getByText('Sorry, we could not find that page.')).toBeInTheDocument();
  });
});
