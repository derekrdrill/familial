import { User } from '../../../../types';

const getDateString = ({ date }: { date?: string[] }) => {
  if (date?.length === 1) {
    return new Date(date[0]).toLocaleDateString();
  } else if (date?.length === 2) {
    return `${new Date(date[0]).toLocaleDateString()} - ${new Date(date[1]).toLocaleDateString()}`;
  }

  return '';
};

const getTimeString = ({ time }: { time: string[] }) => {
  if (time.length === 1) {
    return time[0];
  } else if (time.length === 2) {
    return `${time[0]} - ${time[1]}`;
  }

  return;
};

const hasUserAcceptedEvent = ({
  attendingUsers,
  invitedUser,
}: {
  attendingUsers?: User[];
  invitedUser?: User;
}) => {
  return attendingUsers?.some(user => user.userID === invitedUser?.userID);
};

const hasUserDeclinedEvent = ({
  declinedUsers,
  invitedUser,
}: {
  declinedUsers?: User[];
  invitedUser?: User;
}) => {
  return declinedUsers?.some(user => user.userID === invitedUser?.userID);
};

const hasUserBeenInvitedAndNotResponded = ({
  attendingUsers,
  declinedUsers,
  invitedUser,
  invitedUsers,
}: {
  attendingUsers?: User[];
  declinedUsers?: User[];
  invitedUser?: User;
  invitedUsers?: User[];
}) => {
  return (
    !attendingUsers?.some(user => user.userID === invitedUser?.userID) &&
    !declinedUsers?.some(user => user.userID === invitedUser?.userID) &&
    invitedUsers?.some(user => user.userID === invitedUser?.userID)
  );
};

export {
  getDateString,
  getTimeString,
  hasUserAcceptedEvent,
  hasUserBeenInvitedAndNotResponded,
  hasUserDeclinedEvent,
};
