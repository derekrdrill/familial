import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import Body from './Body';

describe('Body unit tests', () => {
  it('renders as expected', () => {
    const result = renderer
      .create(
        <Body>
          <div>TEST</div>
        </Body>,
      )
      .toJSON();
    expect(result).toMatchSnapshot();
  });
});
