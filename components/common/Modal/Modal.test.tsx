import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import Modal from './Modal';

import { ModalRow } from './style';

describe('Modal unit tests', () => {
  it('renders as expected', () => {
    const result = renderer.create(<Modal />).toJSON();
    expect(result).toMatchSnapshot();
  });

  it('renders ModalRow correctly (isBottom)', async () => {
    render(<ModalRow data-testid='modal-row' isBottom />);

    const modalRow = await screen.findAllByTestId('modal-row');

    expect(modalRow[0]).toHaveClass('sc-dmqHEX eOaCfP');
  });

  it('renders ModalRow correctly (isBody)', async () => {
    render(<ModalRow data-testid='modal-row' isBody />);

    const modalRow = await screen.findAllByTestId('modal-row');

    expect(modalRow[0]).toHaveClass('sc-dmqHEX kDoKht');
  });
});
