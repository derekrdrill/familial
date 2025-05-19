import * as React from 'react';
import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';
import { SvgIcon, SvgIconProps } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

import { hasUserAcceptedEvent, hasUserDeclinedEvent } from '../../helpers';
import { User } from '../../../../../types';

type EventInviteChipProps = {
  attendingUsers?: User[];
  declinedUsers?: User[];
  hasUserAccepted?: boolean;
  hasUserDeclined?: boolean;
  invitedUser?: User;
  size?: 'sm' | 'md' | 'lg';
  styles?: TwStyle;
};

const EventInviteChip = ({
  attendingUsers,
  declinedUsers,
  hasUserAccepted,
  hasUserDeclined,
  invitedUser,
  size = 'md',
  styles,
}: EventInviteChipProps) => {
  const shouldRenderAsAccepted =
    hasUserAccepted ?? hasUserAcceptedEvent({ attendingUsers, invitedUser });
  const shouldRenderAsDeclined =
    hasUserDeclined ?? hasUserDeclinedEvent({ declinedUsers, invitedUser });

  return (
    <EventInviteChipRoot $styles={styles}>
      <EventInviteChipIcon
        component={
          shouldRenderAsAccepted
            ? CheckCircleIcon
            : shouldRenderAsDeclined
              ? CancelIcon
              : DoNotDisturbOnIcon
        }
        $shouldRenderAsAccepted={shouldRenderAsAccepted}
        $shouldRenderAsDeclined={shouldRenderAsDeclined}
        $size={size}
      />
    </EventInviteChipRoot>
  );
};

export { EventInviteChip };

const EventInviteChipRoot = styled.div<{ $styles?: TwStyle }>(({ $styles }) => [$styles]);
const EventInviteChipIcon = styled(SvgIcon)<
  {
    $shouldRenderAsAccepted?: boolean;
    $shouldRenderAsDeclined?: boolean;
    $size?: 'sm' | 'md' | 'lg';
  } & SvgIconProps
>(({ $shouldRenderAsAccepted, $shouldRenderAsDeclined, $size = 'md' }) => [
  $size === 'sm' && tw`h-4 w-4`,
  $size === 'md' && tw`h-6 w-6`,
  $size === 'lg' && tw`h-8 w-8`,
  $shouldRenderAsAccepted && tw`!text-success`,
  $shouldRenderAsDeclined && tw`!text-error`,
  tw`text-gray-696969`,
]);
