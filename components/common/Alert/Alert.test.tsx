import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import Alert from './Alert';

import { AlertContainer } from './style';

describe('Alert unit tests', () => {
  it('renders as expected', () => {
    const result = renderer.create(<Alert />).toJSON();
    expect(result).toMatchSnapshot();
  });

  it('renders AlertContainer correctly (!isAlertHidden)', async () => {
    const alertContainer = renderer.create(<AlertContainer />).toJSON();
    const alertContainerAlertHidden = renderer.create(<AlertContainer $isAlertHidden />).toJSON();
    const alertContainerAlertFading = renderer.create(<AlertContainer $isAlertFading />).toJSON();

    expect(alertContainer).toHaveStyleRule('display', 'inline-flex!important');
    expect(alertContainer).toHaveStyleRule('opacity', '1');

    expect(alertContainerAlertHidden).toHaveStyleRule('display', 'none!important');
    expect(alertContainerAlertHidden).toHaveStyleRule('opacity', '0');

    expect(alertContainerAlertFading).toHaveStyleRule('display', 'inline-flex!important');
    expect(alertContainerAlertFading).toHaveStyleRule('opacity', '0');
  });
});
