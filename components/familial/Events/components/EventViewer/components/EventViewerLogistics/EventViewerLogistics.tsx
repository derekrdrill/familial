import React from 'react';
import Image from 'next/image';
import { DrillyTypography } from '../../../../../../../styles/globals';
import GlobalContext from '../../../../../../../context/GlobalContext';
import { getDateString, getTimeString } from '../../../../helpers';

const EventViewerLogistics = () => {
  const {
    state: { isDarkMode, selectedEvent },
  } = React.useContext(GlobalContext);

  return (
    <div tw='mb-4'>
      <DrillyTypography $isDarkMode={isDarkMode} tw='text-center'>
        <strong>Date:</strong> {getDateString({ date: selectedEvent?.date ?? [] })}
      </DrillyTypography>
      {!!selectedEvent?.time?.length && (
        <DrillyTypography $isDarkMode={isDarkMode} tw='text-center'>
          <strong>Time:</strong> {getTimeString({ time: selectedEvent?.time })}
        </DrillyTypography>
      )}
      <DrillyTypography $isDarkMode={isDarkMode} tw='text-center'>
        <strong>Location:</strong> {selectedEvent?.location}
      </DrillyTypography>
      <div tw='flex items-center justify-center gap-2'>
        <DrillyTypography $isDarkMode={isDarkMode} tw='text-center'>
          <strong>Created By: </strong>
          {selectedEvent?.createdBy.firstName}
        </DrillyTypography>
        {selectedEvent?.createdBy.avatarURL && (
          <Image
            alt=''
            height={0}
            src={selectedEvent?.createdBy.avatarURL ?? ''}
            width={0}
            sizes='100vw'
            tw='rounded-3xl h-7 object-cover w-7'
          />
        )}
      </div>
    </div>
  );
};

export { EventViewerLogistics };
