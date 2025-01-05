import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';
import { Event } from '../../../../types';

const updateEventsList = async ({
  dispatch,
}: {
  dispatch: React.Dispatch<{ type: GlobalReducerActionEnum; payload: { eventList: Event[] } }>;
}) => {
  await fetch('/api/event/get')
    .then(res => res.json())
    .then(events => {
      dispatch({
        type: GlobalReducerActionEnum.SET_EVENT_LIST,
        payload: { eventList: events },
      });
    });
};

const updateSelectedEvent = async ({
  dispatch,
  isAccepting,
  isDeclining,
  selectedEvent,
  userId,
}: {
  dispatch: React.Dispatch<{ type: GlobalReducerActionEnum; payload: { selectedEvent: Event } }>;
  isAccepting?: boolean;
  isDeclining?: boolean;
  isUndecided?: boolean;
  selectedEvent?: Event;
  userId?: string;
}) => {
  const updatedEvent = {
    ...selectedEvent,
    ...{
      attendingUsers: isAccepting
        ? [...(selectedEvent?.attendingUsers?.map(user => user._id) || []), userId]
        : selectedEvent?.attendingUsers?.filter(user => user._id !== userId),
      declinedUsers: isDeclining
        ? [...(selectedEvent?.declinedUsers?.map(user => user._id) || []), userId]
        : selectedEvent?.declinedUsers?.filter(user => user._id !== userId),
    },
  };

  await fetch('/api/event/update', {
    method: 'PUT',
    body: JSON.stringify(updatedEvent),
  })
    .then(res => res.json())
    .then(event => {
      dispatch({
        type: GlobalReducerActionEnum.SET_SELECTED_EVENT,
        payload: { selectedEvent: event },
      });
    });
};

export { updateEventsList, updateSelectedEvent };
