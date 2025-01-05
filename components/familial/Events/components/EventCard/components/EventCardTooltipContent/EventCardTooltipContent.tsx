import React from 'react';
import GlobalContext from '../../../../../../../context/GlobalContext';
import { EventRSVPButton } from '../../../../';
import { DrillyTypography } from '../../../../../../../styles/globals';
import { updateEventsList, updateSelectedEvent } from '../../../../actions';
import {
  getDateString,
  hasUserAcceptedEvent,
  hasUserBeenInvitedAndNotResponded,
  hasUserDeclinedEvent,
} from '../../../../helpers';

type EventCardTooltipContentProps = {
  eventIndex: string;
  setIsTooltipOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tooltipButtonRefAccepting: React.RefObject<HTMLButtonElement>;
  tooltipButtonRefDeclining: React.RefObject<HTMLButtonElement>;
  toolTipButtonRefUndecided: React.RefObject<HTMLButtonElement>;
};

const EventCardTooltipContent = ({
  eventIndex,
  setIsTooltipOpen,
  tooltipButtonRefAccepting,
  tooltipButtonRefDeclining,
  toolTipButtonRefUndecided,
}: EventCardTooltipContentProps) => {
  const {
    dispatch,
    state: { eventList, isDarkMode, user },
  } = React.useContext(GlobalContext);

  const event = eventList?.find(event => event._id === eventIndex);

  const attendingUsersCount = event?.attendingUsers?.length ?? 0;
  const declinedUsersCount = event?.declinedUsers?.length ?? 0;
  const invitedUsersCount = event?.invitedUsers?.length ?? 0;
  const hasUserBeenInvited = hasUserBeenInvitedAndNotResponded({
    attendingUsers: event?.attendingUsers,
    declinedUsers: event?.declinedUsers,
    invitedUser: user,
    invitedUsers: event?.invitedUsers,
  });

  const hasUserAccepted = hasUserAcceptedEvent({
    attendingUsers: event?.attendingUsers,
    invitedUser: user,
  });

  const hasUserDeclined = hasUserDeclinedEvent({
    declinedUsers: event?.declinedUsers,
    invitedUser: user,
  });

  const handleRSVPButtonClick = async ({
    e,
    isAccepting,
    isDeclining,
  }: {
    e: React.MouseEvent<HTMLButtonElement>;
    isAccepting?: boolean;
    isDeclining?: boolean;
  }) => {
    e.preventDefault();

    await updateSelectedEvent({
      dispatch,
      selectedEvent: event,
      userId: user?._id,
      ...(isAccepting && { isAccepting }),
      ...(isDeclining && { isDeclining }),
    });

    await updateEventsList({
      dispatch,
    });

    setIsTooltipOpen(false);
  };

  return (
    <>
      <DrillyTypography $isDarkMode={isDarkMode} tw='font-bold text-lg'>
        {event?.title}
      </DrillyTypography>
      <DrillyTypography $isDarkMode={isDarkMode} tw='mb-1 text-sm w-full'>
        {event?.description}
      </DrillyTypography>
      <DrillyTypography $isDarkMode={isDarkMode} tw='mb-1 text-xs'>
        <strong>Date:</strong> {getDateString({ date: event?.date })}
      </DrillyTypography>
      {!!event?.time?.length && (
        <DrillyTypography $isDarkMode={isDarkMode} tw='mb-1 text-xs'>
          <strong>Time:</strong> {event.time[0]} - {event.time[1]}
        </DrillyTypography>
      )}
      <DrillyTypography $isDarkMode={isDarkMode} tw='mb-1 text-xs'>
        {invitedUsersCount} invited
      </DrillyTypography>
      {invitedUsersCount > 0 && (
        <>
          <DrillyTypography $isDarkMode={isDarkMode} tw='mb-1 text-xs'>
            {attendingUsersCount} attending
          </DrillyTypography>
          <DrillyTypography $isDarkMode={isDarkMode} tw='mb-1 text-xs'>
            {declinedUsersCount} declined
          </DrillyTypography>
        </>
      )}
      {(hasUserBeenInvited || hasUserAccepted || hasUserDeclined) && (
        <DrillyTypography $isDarkMode={isDarkMode} tw='mt-2 mb-1 text-xs'>
          Change your RSVP to:
        </DrillyTypography>
      )}
      <div tw='flex gap-1 justify-around w-full'>
        {(hasUserDeclined || hasUserAccepted) && (
          <EventRSVPButton
            handleClick={async e => handleRSVPButtonClick({ e })}
            isNeutral
            isTextWhite
            ref={toolTipButtonRefUndecided}
          />
        )}
        {(hasUserDeclined || hasUserBeenInvited) && (
          <EventRSVPButton
            handleClick={async e => handleRSVPButtonClick({ e, isAccepting: true })}
            isAccept
            isTextWhite
            ref={tooltipButtonRefAccepting}
          />
        )}
        {(hasUserAccepted || hasUserBeenInvited) && (
          <EventRSVPButton
            handleClick={async e => handleRSVPButtonClick({ e, isDeclining: true })}
            isDecline
            isTextWhite
            ref={tooltipButtonRefDeclining}
          />
        )}
      </div>
    </>
  );
};

export { EventCardTooltipContent };
