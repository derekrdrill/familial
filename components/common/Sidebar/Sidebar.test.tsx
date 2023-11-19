import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Sidebar from './Sidebar';

import { SidebarRoot } from './style';

describe('Sidebar unit tests', () => {
  it('renders as expected', () => {
    const result = renderer
      .create(<Sidebar isSidebarOpen={false} setIsSidebarOpen={jest.fn()} />)
      .toJSON();
    expect(result).toMatchSnapshot();
  });

  it('renders SidebarRoot correctly', async () => {
    const sidebarRoot = renderer.create(<SidebarRoot />).toJSON();
    const sidebarRootOpen = renderer.create(<SidebarRoot $isSidebarOpen />).toJSON();

    expect(sidebarRoot).toHaveStyleRule('transform', 'translateX(-100%)');
    expect(sidebarRootOpen).toHaveStyleRule('transform', 'none');
  });
});
