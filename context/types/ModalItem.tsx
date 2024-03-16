export type ModalItem = {
  handleSubmit: Function | null;
  isModalOpen: boolean;
  modalBody: React.ReactNode;
  modalTitle: string | null;
  submitButtonColor?: 'success' | 'error' | 'primary' | 'info';
  submitButtonText?: string;
  isCancelHidden?: boolean;
  submitButtonVariant?: 'contained' | 'outlined' | 'text';
};
