import GlobalState, { GlobalStateType } from './GlobalState';

export enum GlobalReducerActionEnum {
  SET_ALBUMS = 'SET_ALBUMS',
  SET_ALERT_ITEM = 'SET_ALERT_ITEM',
  SET_MODAL_ITEM = 'SET_MODAL_ITEM',
  SET_PHOTOS = 'SET_PHOTOS',
  SET_PHOTO_LIST = 'SET_PHOTO_LIST',
  SET_PHOTO_UPLOAD_DATA = 'SET_PHOTO_UPLOAD_DATA',
  SET_SELECTED_PHOTO_ALBUM = 'SET_SELECTED_PHOTO_ALBUM',
  RESET_MODAL_ITEM = 'RESET_MODAL_ITEM',
}

export type GlobalReducerAction = {
  payload: GlobalStateType;
  type: GlobalReducerActionEnum;
};

const GlobalReducer = (state: GlobalStateType, action: GlobalReducerAction) => {
  const {
    payload: {
      albums,
      alertItem,
      modalItem,
      photoList,
      photos,
      photoUploadData,
      selectedPhotoAlbum,
    },
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
    case GlobalReducerActionEnum.SET_PHOTO_LIST:
      return {
        ...state,
        photoList: photoList,
      };
    case GlobalReducerActionEnum.SET_PHOTOS:
      return {
        ...state,
        photos: photos,
      };
    case GlobalReducerActionEnum.SET_PHOTO_UPLOAD_DATA:
      return {
        ...state,
        photoUploadData: photoUploadData,
      };
    case GlobalReducerActionEnum.SET_SELECTED_PHOTO_ALBUM:
      return {
        ...state,
        selectedPhotoAlbum: selectedPhotoAlbum,
      };
    default:
      return state;
  }
};

export default GlobalReducer;
