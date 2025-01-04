import * as React from 'react';
import { User } from '../../../../../types';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

type EventInviteChipProps = {
  attendingUsers?: User[];
  declinedUsers?: User[];
  invitedUser: User;
};

const EventInviteChip = ({ attendingUsers, declinedUsers, invitedUser }: EventInviteChipProps) => {
  const hasAccepted = attendingUsers?.some(user => user.userID === invitedUser.userID);
  const hasDeclined = declinedUsers?.some(user => user.userID === invitedUser.userID);

  return (
    <div tw='-translate-x-3 translate-y-4'>
      {hasAccepted ? (
        <CheckCircleIcon tw='h-6 text-green-500 w-6' />
      ) : hasDeclined ? (
        <CancelIcon tw='h-6 text-red-500 w-6' />
      ) : (
        <DoNotDisturbOnIcon tw='h-6 text-gray-696969 w-6' />
      )}
    </div>
  );
};

export { EventInviteChip };
