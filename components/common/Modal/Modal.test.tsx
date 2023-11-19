import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Modal from './Modal';

describe('Modal unit tests', () => {
  it('renders as expected', () => {
    const result = renderer.create(<Modal />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
