import React from 'react';
import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';

import { InputLabel, TextField } from '@mui/material';
import { DrillyTypography } from '../../../styles/globals';
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
      <TextInputRoot
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

export const TextInputRoot = styled(TextField)<{
  $bgColor?: TwStyle;
  $bgColorDark?: TwStyle;
  $hasBorder?: boolean;
  $hasError?: boolean;
  $isDarkMode?: boolean;
  $isRounded?: boolean;
}>(({ $bgColor, $bgColorDark, $hasBorder = true, $hasError, $isDarkMode, $isRounded }) => [
  tw`rounded-lg`,
  {
    '.MuiFormLabel-root': [$isDarkMode && tw`text-white`],
    '.MuiInputBase-root': [
      $bgColor && $bgColor,
      $bgColorDark && $isDarkMode && $bgColorDark,
      $isDarkMode && tw`text-white`,
      $hasError && tw`border border-error`,
      {
        svg: [$isDarkMode && tw`text-white`],
      },
    ],
    '.MuiOutlinedInput-root': {
      fieldset: [
        $hasBorder && [
          $isRounded ? tw`rounded-3xl` : tw`rounded-lg`,
          {
            border: `1px lightgrey ${$isDarkMode ? '!important' : ''}`,
          },
        ],
      ],
      input: {
        '::placeholder': {
          color: $isDarkMode ? 'white' : 'inherit',
        },
      },
    },
  },
]);
