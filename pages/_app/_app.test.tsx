import * as React from 'react';
import * as renderer from 'react-test-renderer';

import App from './index';

describe('App unit tests', () => {
  it('renders as expected', () => {
    const result = renderer.create(<App Component={'TEST'} pageProps={{}} />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
