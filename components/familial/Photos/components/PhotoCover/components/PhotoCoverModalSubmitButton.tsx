import React from 'react';
import { CircularProgress } from '@mui/material';
import GlobalContext from '../../../../../../context/GlobalContext';
import { DrillyButton, DrillyTypography } from '../../../../../../styles/globals';

type PhotoCoverModalSubmitButtonProps = {
  buttonText: string;
  handleSubmit: () => void;
  isModalLoading?: boolean;
  variant?: 'success' | 'error';
};

export const PhotoCoverModalSubmitButton = ({
  buttonText,
  handleSubmit,
  isModalLoading,
  variant = 'success',
}: PhotoCoverModalSubmitButtonProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);
  return (
    <div tw='col-span-12 flex justify-end mt-2'>
      <DrillyButton onClick={handleSubmit} tw='mt-2 py-1.5' $variant={variant}>
        {isModalLoading ? (
          <CircularProgress color={variant} />
        ) : (
          <DrillyTypography color={isDarkMode ? 'white' : 'inherit'}>{buttonText}</DrillyTypography>
        )}
      </DrillyButton>
    </div>
  );
};
