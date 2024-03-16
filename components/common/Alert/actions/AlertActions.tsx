import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';
import { AlertItem } from '../../../../context/types/AlertItem';

export type SetAlertItemParams = {
  type: GlobalReducerActionEnum.SET_ALERT_ITEM;
  payload: { alertItem: AlertItem };
};

export const setAlertItem = async (
  alertMessage: string,
  isAlertOpen: boolean,
  alertSeverity?: 'success' | 'error' | 'warning',
): Promise<SetAlertItemParams> => ({
  type: GlobalReducerActionEnum.SET_ALERT_ITEM,
  payload: {
    alertItem: {
      alertMessage: alertMessage,
      alertSeverity: alertSeverity ?? 'success',
      isAlertOpen: isAlertOpen,
    },
  },
});
