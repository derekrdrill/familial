import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Index from '../../../pages/index/index';

describe('Index unit tests', () => {
  it('renders as expected', () => {
    const result = renderer.create(<Index />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
