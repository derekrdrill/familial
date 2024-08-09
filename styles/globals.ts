import styled from '@emotion/styled';
import tw from 'twin.macro';
import { TextField, Typography } from '@mui/material';

export const DrillyTypography = styled(Typography)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    $isDarkMode && tw`text-white`,
    tw`break-words`,
    tw`[word-wrap:break-word]`,
  ],
);

export const DrillyTextField = styled(TextField)<{
  $isDarkMode?: boolean;
  $isRounded?: boolean;
}>(({ $isDarkMode, $isRounded }) => [
  tw`rounded-lg`,
  {
    '.MuiFormLabel-root': [$isDarkMode && tw`text-white`],
    '.MuiInputBase-root': [
      $isDarkMode && tw`text-white`,
      {
        svg: [$isDarkMode && tw`text-white`],
      },
    ],
    '.MuiOutlinedInput-root': {
      fieldset: [
        $isRounded ? tw`rounded-3xl` : tw`rounded-lg`,
        {
          border: `1px lightgrey solid ${$isDarkMode ? '!important' : ''}`,
        },
      ],
      input: {
        '::placeholder': {
          color: $isDarkMode ? 'white' : 'inherit',
        },
      },
    },
  },
]);
