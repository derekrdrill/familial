import * as React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import Image from 'next/image';
import Link from 'next/link';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

import GlobalContext from '../../../../../context/GlobalContext';
import Tooltip from '../../../../common/Tooltip/Tooltip';
import { DrillyTypography } from '../../../../../styles/globals';

import { EventCardTooltipContent } from './components/EventCardTooltipContent';
import { getDateString } from '../../helpers';

type EventCardProps = {
  eventIndex: string;
};

const EventCard = ({ eventIndex }: EventCardProps) => {
  const {
    state: { eventList, isDarkMode, selectedEvent },
  } = React.useContext(GlobalContext);

  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);

  const eventTooltipRef = React.useRef<HTMLButtonElement>(null);
  const event = eventList?.find(event => event._id === eventIndex);

  const eventCreatedByFirstName = event?.createdBy.firstName;
  const eventCreatedByImageURL = event?.createdBy.avatarURL;
  const eventDate = event?.date;
  const eventDescription = event?.description;
  const eventTime = event?.time;
  const eventTitle = event?.title;

  React.useEffect(() => {
    const handleClickOutside = event => {
      if (eventTooltipRef.current && !eventTooltipRef.current.contains(event.target)) {
        setIsTooltipOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [eventTooltipRef]);

  return (
    <EventCardRoot key={eventIndex} href={`/events/${eventIndex}`} $isDarkMode={isDarkMode}>
      <div tw='flex items-center justify-between mb-2'>
        <DrillyTypography $isDarkMode={isDarkMode} tw='text-xl font-semibold'>
          {eventTitle}
        </DrillyTypography>
        <Tooltip
          isOpen={isTooltipOpen}
          shouldOpenOnClick
          tooltipTitle={<EventCardTooltipContent eventIndex={eventIndex} />}
        >
          <button
            onClick={e => {
              e.preventDefault();
              setIsTooltipOpen(!isTooltipOpen);
            }}
            ref={eventTooltipRef}
          >
            <InfoTwoToneIcon tw='h-5 w-5 text-gray-777777' />
          </button>
        </Tooltip>
      </div>
      <DrillyTypography $isDarkMode={isDarkMode} tw='mb-2 truncate w-full'>
        {eventDescription}
      </DrillyTypography>
      <DrillyTypography $isDarkMode={isDarkMode} tw='text-sm mb-2'>
        <strong>Date:</strong> {getDateString({ date: eventDate ?? [] })}
      </DrillyTypography>
      {!!eventTime?.length && (
        <DrillyTypography $isDarkMode={isDarkMode} tw='text-sm mb-2'>
          <strong>Time:</strong> {eventTime[0]} - {eventTime[1]}
        </DrillyTypography>
      )}
      <div tw='flex gap-1'>
        <DrillyTypography $isDarkMode={isDarkMode} tw='text-sm'>
          <strong>Created By:</strong> {eventCreatedByFirstName}
        </DrillyTypography>
        {eventCreatedByImageURL && (
          <Image
            alt=''
            height={0}
            src={eventCreatedByImageURL}
            width={0}
            sizes='100vw'
            tw='rounded-3xl h-5 object-cover w-5'
          />
        )}
      </div>
    </EventCardRoot>
  );
};

const EventCardRoot = styled(Link)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  $isDarkMode && tw`border-gray-696969`,
  $isDarkMode && tw`hover:border-gray-DADADA`,
  !$isDarkMode && tw`border-gray-B6B6B6`,
  !$isDarkMode && tw`hover:shadow-lg`,
  tw`border`,
  tw`cursor-pointer`,
  tw`p-4`,
  tw`rounded-lg`,
  tw`shadow-md`,
  tw`transition`,
]);

export { EventCard };
