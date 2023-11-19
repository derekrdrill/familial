import * as React from 'react';
import GlobalReducer from '../GlobalReducer';
import { GlobalReducerActionEnum } from '../GlobalReducer';

describe('Global Reducer tests', () => {
  it('handles default state', () => {
    expect(GlobalReducer({}, { type: null, payload: {} })).toStrictEqual({});
  });

  it('handles modal reducer', () => {
    expect(
      JSON.stringify(
        GlobalReducer(
          {
            modalItem: {
              modalBody: null,
              modalTitle: '',
              handleSubmit: () => {},
              submitButtonColor: 'primary',
              submitButtonText: '',
              isModalOpen: false,
            },
          },
          {
            type: GlobalReducerActionEnum.SET_MODAL_ITEM,
            payload: {
              modalItem: {
                modalBody: null,
                modalTitle: 'Modal Title',
                handleSubmit: () => {},
                submitButtonColor: 'primary',
                submitButtonText: 'Continue',
                isModalOpen: true,
              },
            },
          },
        ),
      ),
    ).toEqual(
      JSON.stringify({
        modalItem: {
          modalBody: null,
          modalTitle: 'Modal Title',
          handleSubmit: () => {},
          submitButtonColor: 'primary',
          submitButtonText: 'Continue',
          isModalOpen: true,
        },
      }),
    );
  });

  it('handles alert reducer', () => {
    expect(
      GlobalReducer(
        {
          alertItem: { alertMessage: '', alertSeverity: 'success', isAlertOpen: false },
        },
        {
          type: GlobalReducerActionEnum.SET_ALERT_ITEM,
          payload: {
            alertItem: {
              alertMessage: 'Alert Message',
              alertSeverity: 'success',
              isAlertOpen: true,
            },
          },
        },
      ),
    ).toEqual({
      alertItem: {
        alertMessage: 'Alert Message',
        alertSeverity: 'success',
        isAlertOpen: true,
      },
    });
  });
});
