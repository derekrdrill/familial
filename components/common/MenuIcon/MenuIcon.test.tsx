import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import MenuIcon from './MenuIcon';

import { MenuIconContainer } from './style';

describe('MenuIcon unit tests', () => {
  it('renders as expected', () => {
    const result = renderer
      .create(<MenuIcon isMenuIconActive={false} setIsMenuIconActive={jest.fn()} />)
      .toJSON();
    expect(result).toMatchSnapshot();
  });

  it('renders MenuIconContainer styled component (active)', async () => {
    render(<MenuIconContainer data-testid='menu-icon-container' $isMenuIconActive />);

    const menuIconContainer = await screen.findAllByTestId('menu-icon-container');
    expect(menuIconContainer[0]).toHaveClass('sc-beqWaB fvMzyY');
  });

  it('renders MenuIconContainer styled component (not active)', async () => {
    render(<MenuIconContainer data-testid='menu-icon-container' $isMenuIconActive={false} />);

    const menuIconContainer = await screen.findAllByTestId('menu-icon-container');
    expect(menuIconContainer[0]).toHaveClass('sc-beqWaB hqNeBg');
  });
});
