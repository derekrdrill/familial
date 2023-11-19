jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import Sidebar from './Sidebar';

import { SidebarRoot } from './style';

describe('Sidebar unit tests', () => {
  it('renders as expected', () => {
    const result = renderer
      .create(<Sidebar isSidebarOpen={false} setIsSidebarOpen={jest.fn()} />)
      .toJSON();
    expect(result).toMatchSnapshot();
  });

  it('renders SidebarRoot styled component (open)', async () => {
    render(<SidebarRoot data-testid='menu-icon-container' $isSidebarOpen />);

    const sidebarRoot = await screen.findAllByTestId('menu-icon-container');
    expect(sidebarRoot[0]).toHaveClass('sc-gueYoa eNbQMd');
  });

  it('renders SidebarRoot styled component (not open)', async () => {
    render(<SidebarRoot data-testid='menu-icon-container' $isSidebarOpen={false} />);

    const sidebarRoot = await screen.findAllByTestId('menu-icon-container');
    expect(sidebarRoot[0]).toHaveClass('sc-gueYoa gGODpB');
  });
});
