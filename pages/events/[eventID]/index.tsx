import * as React from 'react';
import conn from '../../../data/connection';
import mongoose from 'mongoose';
import { Event as EventData } from '../../../data/models';

import GlobalContext from '../../../context/GlobalContext';
import { EventViewer } from '../../../components/familial/Events';
import { Event } from '../../../types';
import { GlobalReducerActionEnum } from '../../../context/GlobalReducer';

type EventIndexProps = {
  event: Event;
};

export default function EventIndex({ event }: EventIndexProps) {
  const { dispatch } = React.useContext(GlobalContext);

  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_SELECTED_EVENT,
      payload: { selectedEvent: event },
    });
  }, [event]);

  return <EventViewer />;
}

export const getServerSideProps = async context => {
  try {
    await conn();

    const event = await EventData.findOne({
      _id: new mongoose.Types.ObjectId(context.params.eventID),
    }).populate('createdBy attendingUsers declinedUsers invitedUsers');

    return {
      props: {
        event: JSON.parse(JSON.stringify(event)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
