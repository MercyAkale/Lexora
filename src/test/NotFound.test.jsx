import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';

describe('NotFound page', () => {
  it('renders lost in translation messaging', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Lost in translation/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore lessons/i })).toBeInTheDocument();
  });
});
