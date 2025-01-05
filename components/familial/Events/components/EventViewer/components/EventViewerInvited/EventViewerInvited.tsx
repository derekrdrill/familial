import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import GlobalContext from '../../../../../../../context/GlobalContext';
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
            {user.avatarURL ? (
              <Image
                key={user._id}
                alt=''
                height={0}
                src={user.avatarURL ?? ''}
                width={0}
                sizes='100vw'
                tw='rounded-3xl h-8 object-cover w-8'
              />
            ) : (
              <EventViewerInvitedInitialChip
                key={user._id}
              >{`${user.firstName[0]}${user.lastName[0]}`}</EventViewerInvitedInitialChip>
            )}
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

const EventViewerInvitedInitialChip = styled(DrillyTypography)([
  tw`bg-secondary`,
  tw`h-8`,
  tw`pl-1`,
  tw`pt-1`,
  tw`rounded-2xl`,
  tw`w-8`,
]);

export { EventViewerInvited };
