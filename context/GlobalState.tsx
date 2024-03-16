import { ImageListType as PhotoListType } from 'react-images-uploading';
import { Albums, AlertItem, ModalItem, PhotoUploadData, Photos, SelectedPhotoAlbum } from './types';

export type GlobalStateType = {
  albums?: Albums[];
  alertItem?: AlertItem;
  authenticatedUser?: object | null;
  modalItem?: ModalItem;
  photoList?: PhotoListType;
  photoUploadData?: PhotoUploadData[];
  photos?: Photos[];
  selectedPhotoAlbum?: SelectedPhotoAlbum;
};

const GlobalState: GlobalStateType = {
  albums: undefined,
  alertItem: {
    alertMessage: null,
    alertSeverity: 'success',
    isAlertOpen: false,
  },
  authenticatedUser: null,
  modalItem: {
    handleSubmit: null,
    isModalOpen: false,
    modalBody: null,
    modalTitle: '',
    submitButtonColor: 'primary',
    submitButtonText: 'Submit',
  },
  photoList: [],
  photos: undefined,
  photoUploadData: [],
  selectedPhotoAlbum: undefined,
};

export default GlobalState;
