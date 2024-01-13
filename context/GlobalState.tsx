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
    isModalOpen: false,
    modalTitle: null,
    modalBody: null,
    handleSubmit: null,
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
