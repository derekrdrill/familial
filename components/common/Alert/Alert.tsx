import * as React from 'react';
import { Alert as AlertComponent, Grid } from '@mui/material';

import GlobalContext from '../../../context/GlobalContext';

import { AlertContainer } from './style';
import { setAlertItem } from './actions/AlertActions';

const Alert = () => {
  const {
    dispatch,
    state: { alertItem },
  } = React.useContext(GlobalContext);

  const [isAlertFading, setIsAlertFading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (alertItem?.isAlertOpen) {
      setTimeout(() => {
        setIsAlertFading(true);
      }, 3000);

      setTimeout(async () => {
        setIsAlertFading(false);
        dispatch(await setAlertItem('', false));
      }, 3200);
    }
  }, [alertItem?.isAlertOpen]);

  return (
    <AlertContainer
      container
      $isAlertHidden={!alertItem?.isAlertOpen}
      $isAlertFading={isAlertFading}
    >
      <Grid item xs={1} sm={2} md={4} />
      <Grid item xs={10} sm={8} md={4}>
        <AlertComponent
          onClose={
            /* istanbul ignore next */
            async () => {
              dispatch(await setAlertItem(alertItem?.alertMessage, false));
            }
          }
          severity={alertItem?.alertSeverity}
        >
          {alertItem?.alertMessage}
        </AlertComponent>
      </Grid>
      <Grid item xs={1} sm={2} md={4} />
    </AlertContainer>
  );
};

export default Alert;
