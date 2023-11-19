import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import QuickMenu from './QuickMenu';

import { QuickMenuRoot } from './style';

describe('QuickMenu unit tests', () => {
  it('renders as expected', () => {
    const result = renderer
      .create(
        <QuickMenu isQuickMenuOpen>
          <div>TEST</div>
        </QuickMenu>,
      )
      .toJSON();
    expect(result).toMatchSnapshot();
  });

  it('renders QuickMenuRoot styled component (open)', async () => {
    render(<QuickMenuRoot data-testid='quick-menu' $isQuickMenuOpen />);

    const quickMenuRoot = await screen.findAllByTestId('quick-menu');
    expect(quickMenuRoot[0]).toHaveClass('sc-beqWaB ffbzSg');
  });

  it('renders QuickMenuRoot styled component (closed)', async () => {
    render(<QuickMenuRoot data-testid='quick-menu' />);

    const quickMenuRoot = await screen.findAllByTestId('quick-menu');
    expect(quickMenuRoot[0]).toHaveClass('sc-beqWaB hBiIWU');
  });
});
