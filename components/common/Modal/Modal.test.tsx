import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Modal from './Modal';

import { ModalRow } from './style';

describe('Modal unit tests', () => {
  it('renders as expected', () => {
    const result = renderer.create(<Modal />).toJSON();
    expect(result).toMatchSnapshot();
  });

  it('renders ModalRow correctly', async () => {
    const modalRow = renderer.create(<ModalRow />).toJSON();
    const modalRowIsBottom = renderer.create(<ModalRow isBottom />).toJSON();
    const modalRowIsBody = renderer.create(<ModalRow isBody />).toJSON();
    const modalRowIsBodyIsBottom = renderer.create(<ModalRow isBody isBottom />).toJSON();

    expect(modalRow).toHaveStyleRule('border-bottom', '1px gainsboro solid');
    expect(modalRow).toHaveStyleRule('margin', '10px 0');
    expect(modalRow).toHaveStyleRule('padding', '5px 0');

    expect(modalRowIsBottom).toHaveStyleRule('border-bottom', 'none');
    expect(modalRowIsBottom).toHaveStyleRule('margin', '0');
    expect(modalRowIsBottom).toHaveStyleRule('padding', '5px 0');

    expect(modalRowIsBody).toHaveStyleRule('border-bottom', '1px gainsboro solid');
    expect(modalRowIsBody).toHaveStyleRule('margin', '10px 0');
    expect(modalRowIsBody).toHaveStyleRule('padding', '20px 0');

    expect(modalRowIsBodyIsBottom).toHaveStyleRule('border-bottom', 'none');
    expect(modalRowIsBodyIsBottom).toHaveStyleRule('margin', '0');
    expect(modalRowIsBodyIsBottom).toHaveStyleRule('padding', '20px 0');
  });
});
