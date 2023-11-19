import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import QuickMenu from './QuickMenu';

import { QuickMenuRoot } from './style';

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

  it('renders QuickMenuRoot correctly', async () => {
    const quickMenuRoot = renderer.create(<QuickMenuRoot />).toJSON();
    const quickMenuRootOpen = renderer.create(<QuickMenuRoot $isQuickMenuOpen />).toJSON();

    expect(quickMenuRoot).toHaveStyleRule('transform', 'translateY(-105%)');
    expect(quickMenuRootOpen).toHaveStyleRule('transform', 'none');
  });
});
