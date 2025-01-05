import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';
import { Event, User } from '../../../../types';

const getDateString = ({ date }: { date?: string[] }) => {
  switch (date?.length) {
    case 1:
      return new Date(date[0]).toLocaleDateString();
    case 2:
      return `${new Date(date[0]).toLocaleDateString()} - ${new Date(date[1]).toLocaleDateString()}`;
    default:
      return;
  }
};

const getFilteredEventsList = ({
  eventList,
  eventsToShow,
  userId,
}: {
  eventList?: Event[];
  eventsToShow: string;
  userId: string;
}) => {
  switch (eventsToShow) {
    case 'All':
      return eventList;
    case 'Yours':
      return eventList?.filter(event => event.createdBy.userID === userId);
    case 'Invited':
      return eventList?.filter(event =>
        event.invitedUsers?.map(invitedUser => invitedUser.userID).includes(userId),
      );
    case 'Attending':
      return eventList?.filter(event =>
        event.attendingUsers?.map(attendingUser => attendingUser.userID).includes(userId),
      );
    case 'Declined':
      return eventList?.filter(event =>
        event.declinedUsers?.map(declinedUser => declinedUser.userID).includes(userId),
      );
    default:
      return eventList;
  }
};

const getTimeString = ({ time }: { time: string[] }) => {
  switch (time.length) {
    case 1:
      return time[0];
    case 2:
      return `${time[0]} - ${time[1]}`;
    default:
      return;
  }
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
  getFilteredEventsList,
  getTimeString,
  hasUserAcceptedEvent,
  hasUserBeenInvitedAndNotResponded,
  hasUserDeclinedEvent,
};
