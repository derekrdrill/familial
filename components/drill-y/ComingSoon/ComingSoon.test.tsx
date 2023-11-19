import * as React from 'react';
import * as renderer from 'react-test-renderer';

import ComingSoon from './index';

describe('ComingSoon unit tests', () => {
  it('renders as expected', () => {
    const result = renderer.create(<ComingSoon />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
