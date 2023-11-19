jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header unit tests', () => {
  it('renders as expected', () => {
    const result = renderer
      .create(<Header isQuickMenuOpen={false} setIsQuickMenuOpen={jest.fn()} />)
      .toJSON();
    expect(result).toMatchSnapshot();
  });
});
