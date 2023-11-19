import * as React from 'react';
import * as renderer from 'react-test-renderer';

import QuickMenu from './QuickMenu';

describe('QuickMenu unit tests', () => {
  it('renders as expected', () => {
    const result = renderer
      .create(
        <QuickMenu isQuickMenuOpen>
          <div>TEST</div>
        </QuickMenu>,
      )
      .toJSON();
    expect(result).toMatchSnapshot();
  });
});
