import * as React from 'react';
import tw from 'twin.macro';
import { CircularProgress, Grid, Modal as ModalComponent, Typography } from '@mui/material';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../context/GlobalReducer';

import { setModalItem } from './actions/ModalActions';

import { ModalButton, ModalContainer, ModalRootContainer, ModalRow } from './style';
import { DrillyButton } from '../../../styles/globals';

const Modal = () => {
  const {
    state: {
      isDarkMode,
      modalItem: {
        cancelButtonColor,
        cancelButtonText,
        cancelButtonVariant,
        handleSubmit,
        isCancelHidden,
        isExitHidden,
        isModalOpen,
        modalBody,
        modalTitle,
        submitButtonColor,
        submitButtonLoadingDelay,
        submitButtonText,
        submitButtonVariant,
        submitSuccessMessage,
      },
    },
    dispatch,
  } = React.useContext(GlobalContext);

  const [isModalLoading, setIsModalLoading] = React.useState<boolean>(false);

  return (
    <ModalComponent open={isModalOpen}>
      <ModalRootContainer container>
        <Grid item xs={1} md={3} lg={4} />
        <Grid item xs={10} md={6} lg={4}>
          <ModalContainer container rowGap={4} $isDarkMode={isDarkMode}>
            <Grid item xs={12}>
              {(modalTitle || !isExitHidden) && (
                <ModalRow container>
                  <Grid item xs={11}>
                    <Typography component='h1' variant='h5'>
                      {modalTitle}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Grid container justifyContent='flex-end'>
                      {!isExitHidden && (
                        <DrillyButton
                          onClick={
                            /* istanbul ignore next */
                            () => dispatch(setModalItem(null, false, null, ''))
                          }
                          tw='w-8'
                          $isDisabled={isModalLoading}
                          $variant='error'
                        >
                          x
                        </DrillyButton>
                      )}
                    </Grid>
                  </Grid>
                </ModalRow>
              )}
              <ModalRow container isBody>
                <Grid item xs={12}>
                  {modalBody}
                </Grid>
              </ModalRow>
              <ModalRow gap={1} container isBottom justifyContent='flex-end'>
                <Grid item>
                  {!isCancelHidden && (
                    <DrillyButton
                      disabled={isModalLoading}
                      onClick={
                        /* istanbul ignore next */
                        () => dispatch(setModalItem(null, false, null, ''))
                      }
                      $twStyles={tw`lg:px-4`}
                      $variant='primary'
                    >
                      {cancelButtonText ?? 'Cancel'}
                    </DrillyButton>
                  )}
                </Grid>
                <Grid item>
                  {!!handleSubmit && (
                    <DrillyButton
                      onClick={
                        /* istanbul ignore next */
                        async () => {
                          setIsModalLoading(true);
                          !!handleSubmit && (await handleSubmit());
                          setTimeout(() => {
                            setIsModalLoading(false);

                            dispatch({
                              type: GlobalReducerActionEnum.RESET_MODAL_ITEM,
                              payload: {},
                            });

                            if (submitSuccessMessage) {
                              dispatch({
                                type: GlobalReducerActionEnum.SET_ALERT_ITEM,
                                payload: {
                                  alertItem: {
                                    isAlertOpen: true,
                                    alertMessage: submitSuccessMessage,
                                    alertSeverity: 'success',
                                  },
                                },
                              });
                            }
                          }, submitButtonLoadingDelay ?? 0);
                        }
                      }
                      $twStyles={tw`lg:px-4`}
                      $variant='success'
                    >
                      {isModalLoading ? (
                        <CircularProgress color='success' />
                      ) : (
                        submitButtonText ?? 'Submit'
                      )}
                    </DrillyButton>
                  )}
                </Grid>
              </ModalRow>
            </Grid>
          </ModalContainer>
        </Grid>
        <Grid item xs={1} md={3} lg={4} />
      </ModalRootContainer>
    </ModalComponent>
  );
};

export default Modal;
