import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Sidebar from './Sidebar';

describe('Sidebar unit tests', () => {
  it('renders as expected', () => {
    const result = renderer
      .create(<Sidebar isSidebarOpen={false} setIsSidebarOpen={jest.fn()} />)
      .toJSON();
    expect(result).toMatchSnapshot();
  });
});
