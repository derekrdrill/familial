import { ImageListType as PhotoListType } from 'react-images-uploading';
import {
  Albums,
  AlertItem,
  ModalItem,
  PhotoUploadData,
  Photos,
  SelectedPhotoAlbum,
  User,
} from './types';

export type GlobalStateType = {
  albums?: Albums[];
  alertItem?: AlertItem;
  authenticatedUser?: object | null;
  isDarkMode?: boolean;
  isPhotoViewerBackBtnShown?: boolean;
  modalItem?: ModalItem;
  photoList?: PhotoListType;
  photoUploadData?: PhotoUploadData[];
  photos?: Photos[];
  photosView?: 'grid' | 'list';
  selectedPhotoAlbum?: SelectedPhotoAlbum;
  selectedPhoto?: {
    _id?: string;
    albumName?: string;
    photos?: Photos[] | undefined;
    title?: string;
    url?: string;
  };
  user?: User;
};

const GlobalState: GlobalStateType = {
  albums: undefined,
  alertItem: {
    alertMessage: null,
    alertSeverity: 'success',
    isAlertOpen: false,
  },
  authenticatedUser: null,
  isDarkMode: false,
  isPhotoViewerBackBtnShown: false,
  modalItem: {
    handleSubmit: null,
    isModalOpen: false,
    modalBody: null,
    modalTitle: '',
    submitButtonColor: 'primary',
    submitButtonText: 'Submit',
  },
  photoList: [],
  photosView: 'grid',
  photos: undefined,
  photoUploadData: [],
  selectedPhotoAlbum: undefined,
  selectedPhoto: undefined,
  user: undefined,
};

export default GlobalState;
