import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import ActionButton from './ActionButton';

describe('ActionButton unit tests', () => {
  it('renders as expected', () => {
    const result = renderer.create(<ActionButton />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
