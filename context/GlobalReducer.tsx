import { GlobalStateType } from './GlobalState';

export enum GlobalReducerActionEnum {
  SET_MODAL_ITEM = 'SET_MODAL_ITEM',
  SET_ALERT_ITEM = 'SET_ALERT_ITEM',
}

export type GlobalReducerAction = {
  type: GlobalReducerActionEnum;
  payload: GlobalStateType;
};

const GlobalReducer = (state: GlobalStateType, action: GlobalReducerAction) => {
  const {
    payload: { alertItem, modalItem },
    type,
  } = action;

  switch (type) {
    case GlobalReducerActionEnum.SET_MODAL_ITEM:
      return {
        ...state,
        modalItem: modalItem,
      };
    case GlobalReducerActionEnum.SET_ALERT_ITEM:
      return {
        ...state,
        alertItem: alertItem,
      };
    default:
      return state;
  }
};

export default GlobalReducer;
