import GlobalState, { GlobalStateType } from './GlobalState';

export enum GlobalReducerActionEnum {
  RESET_MODAL_ITEM = 'RESET_MODAL_ITEM',
  SET_ALBUMS = 'SET_ALBUMS',
  SET_ALERT_ITEM = 'SET_ALERT_ITEM',
  SET_MODAL_ITEM = 'SET_MODAL_ITEM',
}

export type GlobalReducerAction = {
  payload: GlobalStateType;
  type: GlobalReducerActionEnum;
};

const GlobalReducer = (state: GlobalStateType, action: GlobalReducerAction) => {
  const {
    payload: { albums, alertItem, modalItem },
    type,
  } = action;

  switch (type) {
    case GlobalReducerActionEnum.RESET_MODAL_ITEM:
      return {
        ...state,
        modalItem: GlobalState.modalItem,
      };
    case GlobalReducerActionEnum.SET_ALBUMS:
      return {
        ...state,
        albums: albums,
      };
    case GlobalReducerActionEnum.SET_ALERT_ITEM:
      return {
        ...state,
        alertItem: alertItem,
      };
    case GlobalReducerActionEnum.SET_MODAL_ITEM:
      return {
        ...state,
        modalItem: modalItem,
      };
    case GlobalReducerActionEnum.SET_MODAL_ITEM:
      return {
        ...state,
        modalItem: modalItem,
      };
    default:
      return state;
  }
};

export default GlobalReducer;
