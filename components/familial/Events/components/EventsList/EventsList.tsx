import * as React from 'react';
import tw from 'twin.macro';

import GlobalContext from '../../../../../context/GlobalContext';
import { Dropdown } from '../../../../common/Dropdown/Dropdown';
import { EventCard } from '../../../Events';
import { DrillyTypography } from '../../../../../styles/globals';
import { Event } from '../../../../../types';
import { EVENTS_TO_SHOW_OPTIONS } from './constants';

const EventsList = () => {
  const {
    state: { eventList, isDarkMode },
  } = React.useContext(GlobalContext);

  const [eventsToShow, setEventsToShow] = React.useState<string>('All');

  return (
    <div tw='mt-4 p-4 w-full'>
      <div tw='flex flex-col items-center md:flex-row md:justify-between mb-4'>
        <DrillyTypography $isDarkMode={isDarkMode} tw='text-2xl font-bold mb-4'>
          Events
        </DrillyTypography>
        <Dropdown
          backgroundColorDark={tw`bg-gray-464646`}
          id='events-to-show-dropdown'
          options={EVENTS_TO_SHOW_OPTIONS}
          setValue={setEventsToShow}
          styles={tw`w-full md:w-1/2 lg:w-1/4`}
          title='Events to show'
          value={eventsToShow}
        />
      </div>
      <div tw='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {eventList?.length ? (
          eventList.map((event: Event) => <EventCard eventIndex={event._id} />)
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export { EventsList };
