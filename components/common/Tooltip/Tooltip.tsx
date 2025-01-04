import * as React from 'react';
import { Tooltip as TooltipComponent } from '@mui/material';

type TooltipProps = {
  children: React.ReactElement;
  isOpen?: boolean;
  ref?: React.RefObject<HTMLButtonElement>;
  shouldOpenOnClick?: boolean;
  tooltipTitle: React.ReactNode | string;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
};

const Tooltip = ({
  children,
  isOpen,
  ref,
  shouldOpenOnClick,
  tooltipTitle,
  tooltipPlacement,
}: TooltipProps) => (
  <TooltipComponent
    arrow
    placement={tooltipPlacement ?? 'bottom'}
    ref={ref}
    title={tooltipTitle}
    {...(shouldOpenOnClick && { open: isOpen })}
  >
    {children}
  </TooltipComponent>
);

export default Tooltip;
