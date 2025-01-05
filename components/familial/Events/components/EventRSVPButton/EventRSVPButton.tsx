import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { SvgIcon, SvgIconProps } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import GlobalContext from '../../../../../context/GlobalContext';
import { DrillyButton, DrillyTypography } from '../../../../../styles/globals';

type EventRSVPButtonProps = {
  handleClick?: (e) => void;
  isAccept?: boolean;
  isDecline?: boolean;
  isNeutral?: boolean;
  isTextWhite?: boolean;
};

const EventRSVPButton = React.forwardRef<HTMLButtonElement, EventRSVPButtonProps>(
  ({ handleClick, isAccept, isDecline, isNeutral, isTextWhite }, ref) => {
    const {
      state: { isDarkMode },
    } = React.useContext(GlobalContext);
    return (
      <DrillyButton
        onClick={handleClick}
        ref={ref}
        tw='flex gap-0.5 justify-around  w-32'
        $variant={isAccept ? 'success' : isDecline ? 'error' : undefined}
      >
        <EventRSVPText $isDarkMode={isDarkMode} $isTextWhite={isTextWhite}>
          {isAccept && 'Accept'}
          {isDecline && 'Decline'}
          {isNeutral && 'Undecided'}
        </EventRSVPText>
        {isAccept && (
          <EventRSVPButtonIcon
            component={CheckCircleIcon}
            $isAccept
            $isDarkMode={isDarkMode}
            $isTextWhite={isTextWhite}
          />
        )}
        {isDecline && (
          <EventRSVPButtonIcon
            component={CancelIcon}
            $isDarkMode={isDarkMode}
            $isDecline
            $isTextWhite={isTextWhite}
          />
        )}
        {isNeutral && (
          <EventRSVPButtonIcon
            component={DoNotDisturbOnIcon}
            $isDarkMode={isDarkMode}
            $isNeutral
            $isTextWhite={isTextWhite}
          />
        )}
      </DrillyButton>
    );
  },
);

const EventRSVPText = styled(DrillyTypography)<{ $isTextWhite?: boolean }>(({ $isTextWhite }) => [
  $isTextWhite && tw`text-white`,
]);

const EventRSVPButtonIcon = styled(SvgIcon)<
  {
    $isDarkMode?: boolean;
    $isAccept?: boolean;
    $isDecline?: boolean;
    $isNeutral?: boolean;
    $isTextWhite?: boolean;
  } & SvgIconProps
>(({ $isDarkMode, $isAccept, $isDecline, $isNeutral, $isTextWhite }) => [
  $isNeutral && tw`text-gray-696969`,
  $isAccept && tw`text-success`,
  $isDecline && tw`text-error`,
  ($isDarkMode || $isTextWhite) && tw`text-white`,
]);

export { EventRSVPButton };
