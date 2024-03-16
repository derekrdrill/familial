import { AlertItem } from './types/AlertItem';
import { ModalItem } from './types/ModalItem';

export type GlobalStateType = {
  modalItem?: ModalItem;
  alertItem?: AlertItem;
  authenticatedUser?: object | null;
};

const GlobalState: GlobalStateType = {
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
