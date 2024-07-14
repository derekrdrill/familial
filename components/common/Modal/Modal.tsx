import * as React from 'react';
import { Button, CircularProgress, Grid, Modal as ModalComponent, Typography } from '@mui/material';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../context/GlobalReducer';

import { setModalItem } from './actions/ModalActions';

import { ModalButton, ModalContainer, ModalRootContainer, ModalRow } from './style';

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
              {modalTitle ||
                (!isExitHidden && (
                  <ModalRow container>
                    <Grid item xs={11}>
                      <Typography variant='h6'>{modalTitle}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Grid container justifyContent='flex-end'>
                        {!isExitHidden && (
                          <Button
                            color='error'
                            disabled={isModalLoading}
                            onClick={
                              /* istanbul ignore next */
                              () =>
                                dispatch(setModalItem(null, false, null, ''))
                            }
                            size='small'
                            variant='outlined'
                          >
                            x
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </ModalRow>
                ))}
              <ModalRow container isBody>
                <Grid item xs={12}>
                  {modalBody}
                </Grid>
              </ModalRow>
              <ModalRow
                columnSpacing={2}
                container
                isBottom
                justifyContent='flex-end'
              >
                <Grid item>
                  {!isCancelHidden && (
                    <ModalButton
                      color={cancelButtonColor ?? 'info'}
                      disabled={isModalLoading}
                      onClick={
                        /* istanbul ignore next */
                        () => dispatch(setModalItem(null, false, null, ''))
                      }
                      size='small'
                      variant={cancelButtonVariant ?? 'outlined'}
                    >
                      {cancelButtonText ?? 'Cancel'}
                    </ModalButton>
                  )}
                </Grid>
                <Grid item>
                  <ModalButton
                    color={submitButtonColor ?? 'primary'}
                    onClick={
                      /* istanbul ignore next */
                      async () => {
                        setIsModalLoading(true);
                        await handleSubmit();
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
                    size='small'
                    variant={submitButtonVariant ?? 'contained'}
                  >
                    {isModalLoading ? (
                      <CircularProgress />
                    ) : (
                      submitButtonText ?? 'Submit'
                    )}
                  </ModalButton>
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
