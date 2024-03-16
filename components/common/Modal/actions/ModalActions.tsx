import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';
import { ModalItem } from '../../../../context/types/ModalItem';

export type SetModalItemParams = {
  type: GlobalReducerActionEnum.SET_MODAL_ITEM;
  payload: { modalItem: ModalItem };
};

export const setModalItem = (
  handleSubmit: Function | null,
  isModalOpen: boolean,
  modalBody: React.ReactNode,
  modalTitle: string,
  submitButtonColor?: 'success' | 'error' | 'info' | 'primary',
  submitButtonText?: string,
  isCancelHidden?: boolean,
  submitButtonVariant?: 'contained' | 'outlined' | 'text',
): SetModalItemParams => ({
  type: GlobalReducerActionEnum.SET_MODAL_ITEM,
  payload: {
    modalItem: {
      handleSubmit: handleSubmit,
      isModalOpen: isModalOpen,
      modalBody: modalBody,
      modalTitle: modalTitle,
      submitButtonColor: submitButtonColor ?? 'primary',
      submitButtonText: submitButtonText ?? 'Submit',
      isCancelHidden: isCancelHidden ?? false,
      submitButtonVariant: submitButtonVariant ?? 'outlined',
    },
  },
});
