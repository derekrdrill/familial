import React from 'react';
import { DrillyTypography } from '../../../../../../../styles/globals';
import GlobalContext from '../../../../../../../context/GlobalContext';

type Props = {};

const EventViewerTitleAndDesc = (props: Props) => {
  const {
    state: { isDarkMode, selectedEvent },
  } = React.useContext(GlobalContext);

  return (
    <>
      <DrillyTypography $isDarkMode={isDarkMode} tw='text-2xl text-center font-bold mb-2'>
        {selectedEvent?.title}
      </DrillyTypography>
      <DrillyTypography $isDarkMode={isDarkMode} tw='text-center text-gray-464646 mb-4'>
        {selectedEvent?.description}
      </DrillyTypography>
    </>
  );
};

export { EventViewerTitleAndDesc };
