import React from 'react';
import GlobalContext from '../../../../../../../context/GlobalContext';
import { DrillyTypography } from '../../../../../../../styles/globals';
import { getDateString } from '../../../../helpers';

type EventCardTooltipContentProps = {
  eventIndex: string;
};

const EventCardTooltipContent = ({ eventIndex }: EventCardTooltipContentProps) => {
  const {
    state: { eventList, isDarkMode },
  } = React.useContext(GlobalContext);

  const event = eventList?.find(event => event._id === eventIndex);

  const attendingUsersCount = event?.attendingUsers?.length ?? 0;
  const invitedUsersCount = event?.invitedUsers?.length ?? 0;

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
        <DrillyTypography $isDarkMode={isDarkMode} tw='mb-1 text-xs'>
          {attendingUsersCount} attending
        </DrillyTypography>
      )}
    </>
  );
};

export { EventCardTooltipContent };
