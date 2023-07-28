import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import QuestForm from '.';

jest.mock('next/router', () => require('next-router-mock'));

describe('QuestForm', () => {
  it('renders', () => {
    render(
      <ChakraProvider>
        <QuestForm />
      </ChakraProvider>
    );
    expect(screen.getByRole('button')).toHaveText('The current route is: "/initial-path"');
    // Click the button:
    user.click(screen.getByRole('button'));
  });
});
