import React from 'react';
import tw from 'twin.macro';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

import { DrillyButton, DrillyTypography } from '../../../../../../../styles/globals';

type EventViewerRSVPButtonProps = {
  handleClick?: () => void;
  isAccept?: boolean;
  isDecline?: boolean;
  isNeutral?: boolean;
  variant?: 'success' | 'error';
};

const EventViewerRSVPButton = ({
  handleClick,
  isAccept,
  isDecline,
  isNeutral,
  variant,
}: EventViewerRSVPButtonProps) => {
  return (
    <DrillyButton onClick={handleClick} tw='flex justify-around pt-0.5 w-32' $variant={variant}>
      <DrillyTypography>
        {isAccept && 'Accept'}
        {isDecline && 'Decline'}
        {isNeutral && 'Undecided'}
      </DrillyTypography>
      {isAccept && <CheckCircleIcon tw='text-success' />}
      {isDecline && <CancelIcon tw='text-error' />}
      {isNeutral && <DoNotDisturbOnIcon tw='text-gray-696969' />}
    </DrillyButton>
  );
};

export { EventViewerRSVPButton };
