import * as React from 'react';
import tw from 'twin.macro';

import GlobalContext from '../../../../../../../context/GlobalContext';
import {
  hasUserAcceptedEvent,
  hasUserBeenInvitedAndNotResponded,
  hasUserDeclinedEvent,
} from '../../../../helpers';
import { DrillyTypography } from '../../../../../../../styles/globals';
import { EventInviteChip } from '../../../EventInviteChip/EventInviteChip';

type EventCardRSVPProps = { eventIndex: string };

const EventCardRSVP = ({ eventIndex }: EventCardRSVPProps) => {
  const {
    state: { eventList, isDarkMode, user },
  } = React.useContext(GlobalContext);

  const event = eventList?.find(event => event._id === eventIndex);

  const hasLoggedInUserAcceptedEvent = hasUserAcceptedEvent({
    attendingUsers: event?.attendingUsers,
    invitedUser: user,
  });

  const hasLoggedInUserDeclinedEvent = hasUserDeclinedEvent({
    declinedUsers: event?.declinedUsers,
    invitedUser: user,
  });

  const hasLoggedInUserNotResponded = hasUserBeenInvitedAndNotResponded({
    attendingUsers: event?.attendingUsers,
    declinedUsers: event?.declinedUsers,
    invitedUser: user,
    invitedUsers: event?.invitedUsers,
  });

  return (
    (hasLoggedInUserAcceptedEvent ||
      hasLoggedInUserDeclinedEvent ||
      hasLoggedInUserNotResponded) && (
      <DrillyTypography $isDarkMode={isDarkMode} tw='flex gap-0.5 text-xs mt-2'>
        <span tw='flex items-center gap-0.5'>
          You have
          <span tw='font-semibold'>
            {hasLoggedInUserNotResponded && 'not responded'}
            {hasLoggedInUserAcceptedEvent && 'accepted'}
            {hasLoggedInUserDeclinedEvent && 'declined'}
          </span>
        </span>
        <EventInviteChip
          hasUserAccepted={hasLoggedInUserAcceptedEvent}
          hasUserDeclined={hasLoggedInUserDeclinedEvent}
          size='sm'
        />
      </DrillyTypography>
    )
  );
};

export { EventCardRSVP };
