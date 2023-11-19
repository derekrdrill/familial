import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import Overlay, { getOverlayDisplay, getZIndexSmall, getZIndexLarge } from './Overlay';

describe('Overlay unit tests', () => {
  it('renders as expected', () => {
    const result = renderer
      .create(<Overlay isSidebarOpen={false} isQuickViewOpen={true} />)
      .toJSON();
    expect(result).toMatchSnapshot();
  });

  it('runs getOverlayDisplay correctly', () => {
    expect(getOverlayDisplay(true)).toEqual('block');
    expect(getOverlayDisplay(false)).toEqual('none');
  });

  it('runs getZIndexSmall correctly', () => {
    expect(getZIndexSmall(true)).toEqual(4);
    expect(getZIndexSmall(false)).toEqual(1);
  });

  it('runs getZIndexLarge correctly', () => {
    expect(getZIndexLarge(true)).toEqual(1);
    expect(getZIndexLarge(false)).toEqual(4);
  });
});
