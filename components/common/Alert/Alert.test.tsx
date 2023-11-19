import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import Alert from './Alert';

import { AlertContainer } from './style';

describe('Alert unit tests', () => {
  it('renders as expected', () => {
    const result = renderer.create(<Alert />).toJSON();
    expect(result).toMatchSnapshot();
  });

  it('renders AlertContainer correctly (isAlertHidden)', async () => {
    render(<AlertContainer data-testid='alert-container' isAlertHidden />);

    const alertContainer = await screen.findAllByTestId('alert-container');

    expect(alertContainer[0]).toHaveClass('sc-beqWaB czspmq');
  });

  it('renders AlertContainer correctly (!isAlertHidden)', async () => {
    render(<AlertContainer data-testid='alert-container' />);

    const alertContainer = await screen.findAllByTestId('alert-container');

    expect(alertContainer[0]).toHaveClass('sc-beqWaB aIxVR');
  });
});
