import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { DarkModeProvider, useDarkMode } from '../contexts/DarkModeContext';

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove('dark');
  localStorage.clear();
});

function DarkModeConsumer() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button type="button" onClick={toggleDarkMode}>
      {darkMode ? 'Dark' : 'Light'}
    </button>
  );
}

describe('DarkModeProvider', () => {
  it('toggles dark mode class on documentElement', () => {
    render(
      <DarkModeProvider>
        <DarkModeConsumer />
      </DarkModeProvider>,
    );

    const toggleButton = screen.getByRole('button', { name: /Light/i });
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    fireEvent.click(toggleButton);
    expect(screen.getByRole('button', { name: /Dark/i })).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: /Dark/i }));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
