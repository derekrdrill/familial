import * as React from 'react';
import conn from '../../data/connection';
import { Event as EventData } from '../../data/models';

import GlobalContext from '../../context/GlobalContext';
import { EventsList } from '../../components/familial/Events';
import { Event } from '../../types';
import { GlobalReducerActionEnum } from '../../context/GlobalReducer';

type EventsIndexProps = {
  eventListData: Event[];
};

export default function EventsIndex({ eventListData }: EventsIndexProps) {
  const {
    dispatch,
    state: { eventList },
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if (!eventList) {
      dispatch({
        type: GlobalReducerActionEnum.SET_EVENT_LIST,
        payload: { eventList: eventListData },
      });
    }
  }, [eventListData]);

  return <EventsList />;
}

export const getServerSideProps = async () => {
  try {
    await conn();
    const events = await EventData.find().populate(
      'createdBy attendingUsers declinedUsers invitedUsers',
    );

    return {
      props: {
        eventListData: JSON.parse(JSON.stringify(events)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
