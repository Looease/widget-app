import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Widget from './Widget';

describe('Widget', () => {
    test('should set widget content', async () => {
        render(<Widget/>);

        const input = screen.getByRole('textbox', {name: 'Create'});

        await userEvent.type(input, 'Enquiry');

        expect(input).toHaveValue('Enquiry')
    });
})