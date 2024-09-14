import React from 'react';
import { CircularProgress } from '@mui/material';
import { DrillyTypography } from '../../../../styles/globals';
import GlobalContext from '../../../../context/GlobalContext';

type FullPageLoaderProps = { isLoading: boolean };

export const FullPageLoader = ({ isLoading }: FullPageLoaderProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    isLoading && (
      <div tw='absolute top-1/3 w-full z-20'>
        <div tw='flex justify-center w-full'>
          <div tw='flex flex-col items-center'>
            <CircularProgress size={150} />
            <DrillyTypography component='p' tw='text-center' variant='h4' $isDarkMode={isDarkMode}>
              One moment...
            </DrillyTypography>
          </div>
        </div>
      </div>
    )
  );
};
