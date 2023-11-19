import * as React from 'react';
import { ButtonProps } from '@mui/material';
import { ActionButtonRoot } from './style';

type ActionButtonProps = ButtonProps & {
  borderRadius?: number;
  buttonColor?: string;
  buttonHoverColor?: string;
  buttonWidth?: string | number;
  marginTop?: number;
};

const ActionButton = ({
  borderRadius,
  buttonColor,
  buttonHoverColor,
  buttonWidth,
  children,
  disabled,
  fullWidth,
  marginTop,
  onClick,
  startIcon,
  variant,
}: ActionButtonProps) => (
  <ActionButtonRoot
    disabled={disabled}
    fullWidth={fullWidth}
    onClick={onClick}
    variant={variant}
    startIcon={startIcon}
    $borderRadius={borderRadius}
    $buttonColor={buttonColor}
    $buttonHoverColor={buttonHoverColor}
    $buttonWidth={buttonWidth}
    $marginTop={marginTop}
  >
    {children}
  </ActionButtonRoot>
);

export default ActionButton;
