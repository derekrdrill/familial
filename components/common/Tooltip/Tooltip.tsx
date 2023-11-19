import * as React from 'react';
import { Tooltip as TooltipComponent } from '@mui/material';

type TooltipProps = {
  children: React.ReactElement;
  tooltipTitle: React.ReactNode | string;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
};

const Tooltip = ({ children, tooltipTitle, tooltipPlacement }: TooltipProps) => (
  <TooltipComponent arrow placement={tooltipPlacement ?? 'bottom'} title={tooltipTitle}>
    {children}
  </TooltipComponent>
);

export default Tooltip;
