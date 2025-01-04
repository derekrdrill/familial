import * as React from 'react';
import GlobalContext from '../../../../../context/GlobalContext';
import {
  EventViewerInviteBanner,
  EventViewerInvited,
  EventViewerLogistics,
  EventViewerTitleAndDesc,
} from './components';
import { DrillyTypography } from '../../../../../styles/globals';

const EventViewer = () => {
  const {
    state: { isDarkMode, selectedEvent },
  } = React.useContext(GlobalContext);

  return (
    <>
      <EventViewerInviteBanner />
      <div tw='p-8 w-full'>
        <EventViewerTitleAndDesc />
        <EventViewerLogistics />
        <EventViewerInvited />
        <div tw='mb-4'>
          <DrillyTypography $isDarkMode={isDarkMode} tw='font-semibold'>
            Posts
          </DrillyTypography>
          <ul tw='list-disc list-inside'>
            {selectedEvent?.posts?.map(post => (
              <li key={post.id}>
                <strong>{post.author}:</strong> {post.content}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <DrillyTypography $isDarkMode={isDarkMode} tw='font-semibold'>
            Photos
          </DrillyTypography>
          <DrillyTypography $isDarkMode={isDarkMode}>
            {selectedEvent?.photoAlbum || 'No photos yet.'}
          </DrillyTypography>
        </div>
      </div>
    </>
  );
};

export { EventViewer };
