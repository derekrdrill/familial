import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Header from './Header';

describe('Header unit tests', () => {
  it('renders as expected', () => {
    const result = renderer.create(<Header />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
