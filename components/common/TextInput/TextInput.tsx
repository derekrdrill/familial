import React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { InputLabel } from '@mui/material';
import { DrillyTextField, DrillyTypography } from '../../../styles/globals';
import GlobalContext from '../../../context/GlobalContext';

type TextInputProps = {
  hasError?: boolean;
  setTextInputValue?: React.Dispatch<React.SetStateAction<string | undefined>>;
  textInputDefaultValue?: string;
  textInputBGColor?: TwStyle;
  textInputBGColorDark?: TwStyle;
  textInputLabel: string;
  textInputId: string;
  textInputValue?: string;
  textInputPlaceholder?: string;
  textInputSize?: 'small' | 'medium';
};

export const TextInput = ({
  hasError,
  setTextInputValue,
  textInputBGColor = tw`bg-gray-D9D9D9`,
  textInputBGColorDark = tw`bg-gray-3D3D3D`,
  textInputDefaultValue = '',
  textInputId,
  textInputLabel,
  textInputPlaceholder = '',
  textInputSize = 'small',
  textInputValue,
}: TextInputProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <>
      <InputLabel htmlFor={textInputId}>
        <DrillyTypography $isDarkMode={isDarkMode}>{textInputLabel}</DrillyTypography>
      </InputLabel>
      <DrillyTextField
        id={textInputId}
        defaultValue={textInputDefaultValue}
        fullWidth
        onChange={e => setTextInputValue && setTextInputValue(e.target.value)}
        placeholder={textInputPlaceholder}
        size={textInputSize}
        value={textInputValue}
        variant='outlined'
        $bgColor={textInputBGColor}
        $bgColorDark={textInputBGColorDark}
        $hasBorder={false}
        $hasError={hasError}
        $isDarkMode={isDarkMode}
      />
    </>
  );
};
