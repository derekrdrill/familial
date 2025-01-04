import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import GlobalContext from '../../../../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../../../../context/GlobalReducer';
import { EventViewerRSVPButton } from '../EventViewerRSVPButton/EventViewerRSVPButton';
import { DrillyTypography } from '../../../../../../../styles/globals';

const EventViewerInviteBanner = () => {
  const {
    dispatch,
    state: { isDarkMode, selectedEvent, user },
  } = React.useContext(GlobalContext);

  const hasBeenInvited = selectedEvent?.invitedUsers?.find(
    invitedUser => invitedUser._id === user?._id,
  );

  const hasAcceptedInvitation = selectedEvent?.attendingUsers?.find(
    attendingUser => attendingUser._id === user?._id,
  );

  const hasDeclinedInvitation = selectedEvent?.declinedUsers?.find(
    declinedUser => declinedUser._id === user?._id,
  );

  const handleInviteAcceptOrDecline = async ({
    isAccepting,
    isDeclining,
    userId,
  }: {
    isAccepting?: boolean;
    isDeclining?: boolean;
    isUndecided?: boolean;
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

  return (
    selectedEvent?.createdBy.userID !== user?.userID && (
      <EventInviteBanner $hasRSVPd={!!(hasAcceptedInvitation || hasDeclinedInvitation)}>
        {hasBeenInvited && !hasAcceptedInvitation && !hasDeclinedInvitation && (
          <>
            <EventViewerRSVPButton
              handleClick={async () => {
                await handleInviteAcceptOrDecline({
                  isDeclining: true,
                  userId: user?._id,
                });
              }}
              isDecline
              variant='error'
            />
            <EventViewerRSVPButton
              handleClick={async () => {
                await handleInviteAcceptOrDecline({
                  isAccepting: true,
                  userId: user?._id,
                });
              }}
              isAccept
              variant='success'
            />
          </>
        )}
        {(hasAcceptedInvitation || hasDeclinedInvitation) && (
          <>
            <DrillyTypography
              variant='subtitle1'
              tw='content-center'
              $isDarkMode={isDarkMode}
            >{`You have ${hasAcceptedInvitation ? 'accepted' : 'declined'} the invitation`}</DrillyTypography>
            <button
              onClick={() => {
                dispatch({
                  type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                  payload: {
                    modalItem: {
                      isExitHidden: true,
                      isModalOpen: true,
                      modalBody: (
                        <>
                          <DrillyTypography component='h1' variant='h6'>
                            Change your RSVP to <span tw='font-bold'>{selectedEvent?.title}</span>
                          </DrillyTypography>
                          <div tw='flex flex-col gap-2 items-center justify-center mt-6'>
                            <EventViewerRSVPButton
                              handleClick={async () => {
                                await handleInviteAcceptOrDecline({
                                  userId: user?._id,
                                });

                                dispatch({
                                  type: GlobalReducerActionEnum.RESET_MODAL_ITEM,
                                  payload: {},
                                });
                              }}
                              isNeutral
                            />
                            {hasAcceptedInvitation && (
                              <EventViewerRSVPButton
                                handleClick={async () => {
                                  await handleInviteAcceptOrDecline({
                                    isDeclining: true,
                                    userId: user?._id,
                                  });

                                  dispatch({
                                    type: GlobalReducerActionEnum.RESET_MODAL_ITEM,
                                    payload: {},
                                  });
                                }}
                                isDecline
                              />
                            )}
                            {hasDeclinedInvitation && (
                              <EventViewerRSVPButton
                                handleClick={async () => {
                                  await handleInviteAcceptOrDecline({
                                    isAccepting: true,
                                    userId: user?._id,
                                  });

                                  dispatch({
                                    type: GlobalReducerActionEnum.RESET_MODAL_ITEM,
                                    payload: {},
                                  });
                                }}
                                isAccept
                              />
                            )}
                          </div>
                        </>
                      ),
                      modalTitle: '',
                    },
                  },
                });
              }}
              tw='text-blue-700 underline'
            >
              Change RSVP
            </button>
          </>
        )}
      </EventInviteBanner>
    )
  );
};

const EventInviteBanner = styled.div<{ $hasRSVPd?: boolean }>(({ $hasRSVPd }) => [
  !$hasRSVPd && tw`pt-5`,
  tw`bottom-0`,
  tw`fixed`,
  tw`flex`,
  tw`gap-2`,
  tw`h-16`,
  tw`px-6`,
  tw`w-full`,
  tw`lg:justify-end`,
  {
    boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
]);

export { EventViewerInviteBanner };
