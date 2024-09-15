import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

export const UserProfileAvatarClear = () => {
  const {
    dispatch,
    state: { photoList },
  } = React.useContext(GlobalContext);

  return (
    !!photoList?.length && (
      <ClearIcon
        onClick={() =>
          dispatch({ type: GlobalReducerActionEnum.SET_PHOTO_LIST, payload: { photoList: [] } })
        }
        color='error'
        tw='cursor-pointer'
      />
    )
  );
};
