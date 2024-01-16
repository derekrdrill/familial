import { Albums, AlertItem, ModalItem } from './types';

export type GlobalStateType = {
  albums?: Albums[];
  modalItem?: ModalItem;
  alertItem?: AlertItem;
  authenticatedUser?: object | null;
};

const GlobalState: GlobalStateType = {
  albums: undefined,
  authenticatedUser: null,
  modalItem: {
    handleSubmit: null,
    isModalOpen: false,
    modalBody: null,
    modalTitle: '',
    submitButtonColor: 'primary',
    submitButtonText: 'Submit',
  },
  alertItem: {
    alertMessage: null,
    alertSeverity: 'success',
    isAlertOpen: false,
  },
};

export default GlobalState;
