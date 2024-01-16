export type ModalItem = {
  handleSubmit: Function | null;
  isModalOpen: boolean;
  modalBody: React.ReactNode;
  modalTitle: string;
  cancelButtonColor?: 'success' | 'error' | 'primary' | 'info';
  cancelButtonText?: string;
  cancelButtonVariant?: 'contained' | 'outlined' | 'text';
  isCancelHidden?: boolean;
  isExitHidden?: boolean;
  submitButtonColor?: 'success' | 'error' | 'primary' | 'info';
  submitButtonText?: string;
  submitButtonVariant?: 'contained' | 'outlined' | 'text';
  submitButtonLoadingDelay?: number;
  submitSuccessMessage?: string;
};
