import styled from 'styled-components';
import { Button } from '@mui/material';

export const ActionButtonRoot = styled(Button)<{
  $borderRadius?: number;
  $buttonColor?: string;
  $buttonHoverColor?: string;
  $buttonWidth?: string | number;
  $marginTop?: number;
  disabled?: boolean;
  variant?: string;
}>(
  ({
    $borderRadius,
    $buttonColor,
    $buttonHoverColor,
    $buttonWidth,
    $marginTop,
    disabled,
    variant,
  }) => ({
    '&:hover': {
      backgroundColor: `${$buttonHoverColor} !important`,
      color: `#FFFFFF !important`,
    },
    backgroundColor: `${variant === 'contained' ? `${$buttonColor}` : 'inherit'} !important`,
    borderColor: disabled
      ? 'gainsboro'
      : `${variant === 'outlined' ? `${$buttonColor}` : 'inherit'} !important`,
    borderRadius: `${$borderRadius ?? 75}px !important`,
    boxShadow: 'none !important',
    color: disabled
      ? 'gainsboro'
      : `${variant === 'outlined' ? `${$buttonColor}` : '#FFFFFF'} !important`,
    fontFamily: `'Josefin Sans', sans-serif !important`,
    fontWeight: '600 !important',
    fontSize: '12px !important',
    marginTop: `${$marginTop ?? 4}px !important`,
    paddingBottom: '4px !important',
    paddingLeft: '20px !important',
    paddingRight: '20px !important',
    paddingTop: '6px !important',
    width: $buttonWidth
      ? `${typeof $buttonWidth === `number` ? `${$buttonWidth}px` : $buttonWidth} !important`
      : 'inherit',
  }),
);
