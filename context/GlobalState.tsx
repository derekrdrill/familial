import { Albums, AlertItem, ModalItem, Photos } from './types';

export type GlobalStateType = {
  albums?: Albums[];
  alertItem?: AlertItem;
  authenticatedUser?: object | null;
  photos?: Photos[];
  modalItem?: ModalItem;
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
  photos: undefined,
};

export default GlobalState;
