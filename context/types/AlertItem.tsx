export type AlertItem = {
  alertMessage: string | null;
  alertSeverity: 'success' | 'error' | 'warning';
  handleClose?: Function;
  isAlertOpen: boolean;
};
