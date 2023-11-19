import * as React from 'react';
import * as renderer from 'react-test-renderer';

import MenuIcon from './MenuIcon';

describe('MenuIcon unit tests', () => {
  it('renders as expected', () => {
    const result = renderer
      .create(<MenuIcon isMenuIconActive={false} setIsMenuIconActive={jest.fn()} />)
      .toJSON();
    expect(result).toMatchSnapshot();
  });
});
