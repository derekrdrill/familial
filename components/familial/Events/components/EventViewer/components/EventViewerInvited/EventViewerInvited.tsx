import React from 'react';
import tw from 'twin.macro';

import GlobalContext from '../../../../../../../context/GlobalContext';
import { Avatar } from '../../../../../../common/Avatar/Avatar';
import { EventInviteChip } from '../../../EventInviteChip/EventInviteChip';
import { DrillyTypography } from '../../../../../../../styles/globals';

const EventViewerInvited = () => {
  const {
    state: { isDarkMode, selectedEvent },
  } = React.useContext(GlobalContext);

  return (
    <div tw='mb-4'>
      <div tw='flex flex-col gap-2 lg:flex-row lg:items-center'>
        <DrillyTypography $isDarkMode={isDarkMode} tw='font-semibold'>
          Invited
        </DrillyTypography>
      </div>
      <div tw='flex gap-0'>
        {selectedEvent?.invitedUsers?.map(user => (
          <div key={user._id} tw='inline-flex'>
            <Avatar avatarURL={user.avatarURL} user={user} />
            <EventInviteChip
              attendingUsers={selectedEvent?.attendingUsers}
              declinedUsers={selectedEvent?.declinedUsers}
              invitedUser={user}
              styles={tw`-translate-x-3 translate-y-4`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { EventViewerInvited };
