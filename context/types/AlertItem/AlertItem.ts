export type AlertItem = {
  alertMessage: string | null | undefined;
  alertSeverity: 'success' | 'error' | 'warning';
  handleClose?: Function;
  isAlertOpen: boolean;
};
