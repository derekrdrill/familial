import * as React from 'react';
import GlobalContext from '../../../../../context/GlobalContext';

import { EventCard } from '../../../Events';
import { Event } from '../../../../../types';
import { DrillyTypography } from '../../../../../styles/globals';

const EventsList = () => {
  const {
    state: { eventList, isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <div tw='p-4 w-full'>
      <DrillyTypography $isDarkMode={isDarkMode} tw='text-2xl font-bold mb-4'>
        All Events
      </DrillyTypography>
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
