import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import WidgetPage from './WidgetPage';

describe('Widget page', () => {
  test('should render add widget button', () => {
    render(<WidgetPage/>);

    const button = screen.getByRole('button', { name: 'Add widget'})

    expect(button).toBeTruthy()
  });
  test('should add a widget on button click', async () => {
    render(<WidgetPage/>);

    expect(screen.queryByRole('textarea')).not.toBeTruthy();
    expect(screen.queryByRole('input')).not.toBeTruthy();
    // expect(screen.queryByRole('border attribute')).not.toBeTruthy();
    const button = screen.getByRole('button', {name: 'Add widget'})

    await userEvent.click(button);

    expect(screen.getByRole('textarea')).toBeTruthy();
    expect(screen.getByRole('input')).toBeTruthy();
  });
  test('should add a widget on button click', () => {
    render(<WidgetPage/>);

  });
  test('When a user is done typing, the text from that widget should be sent to the backend to be stored.', () => {
    render(<WidgetPage/>);

  });
  test('If the page is refreshed, the same widgets should be populated with the same text as entered before the page refresh.', () => {
    render(<WidgetPage/>);
  });
  test('should handle server errors', () => {
    render(<WidgetPage/>);
  });
});
