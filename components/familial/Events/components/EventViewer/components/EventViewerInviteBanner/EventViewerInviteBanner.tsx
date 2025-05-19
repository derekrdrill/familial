import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import GlobalContext from '../../../../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../../../../context/GlobalReducer';
import { EventRSVPButton } from '../../../../index';
import { DrillyTypography } from '../../../../../../../styles/globals';
import { updateSelectedEvent } from '../../../../actions';

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

  return (
    selectedEvent?.createdBy.userID !== user?.userID && (
      <EventInviteBanner $hasRSVPd={!!(hasAcceptedInvitation || hasDeclinedInvitation)}>
        {hasBeenInvited && !hasAcceptedInvitation && !hasDeclinedInvitation && (
          <>
            <EventRSVPButton
              handleClick={async () => {
                await updateSelectedEvent({
                  dispatch,
                  isDeclining: true,
                  selectedEvent,
                  userId: user?._id,
                });
              }}
              isDecline
            />
            <EventRSVPButton
              handleClick={async () => {
                await updateSelectedEvent({
                  dispatch,
                  isAccepting: true,
                  selectedEvent,
                  userId: user?._id,
                });
              }}
              isAccept
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
                            <EventRSVPButton
                              handleClick={async () => {
                                await updateSelectedEvent({
                                  dispatch,
                                  selectedEvent,
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
                              <EventRSVPButton
                                handleClick={async () => {
                                  await updateSelectedEvent({
                                    dispatch,
                                    isDeclining: true,
                                    selectedEvent,
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
                              <EventRSVPButton
                                handleClick={async () => {
                                  await updateSelectedEvent({
                                    dispatch,
                                    isAccepting: true,
                                    selectedEvent,
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
