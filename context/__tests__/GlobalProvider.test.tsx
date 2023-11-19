import * as React from 'react';
import * as renderer from 'react-test-renderer';

import GlobalProvider from '../GlobalProvider';

describe('GlobalProvider unit tests', () => {
  it('renders as expected', () => {
    const result = renderer.create(<GlobalProvider>{<h1>TEST</h1>}</GlobalProvider>).toJSON();
    expect(result).toMatchSnapshot();
  });
});
