import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';
import { TextField, Typography, TypographyProps } from '@mui/material';

export const DrillyButton = styled.button<{
  $isDisabled?: boolean;
  $variant?: 'error' | 'primary' | 'success';
  $styles?: TwStyle;
}>(({ $isDisabled, $variant, $styles }) => [
  $variant === 'error' && tw`bg-error border-error text-error`,
  $variant === 'primary' && tw`bg-primary border-primary text-primary`,
  $variant === 'success' && tw`bg-success border-success text-success`,
  $isDisabled && tw`bg-gray-4E4E4E border-gray-4E4E4E cursor-not-allowed text-gray-4E4E4E`,
  !$isDisabled && tw`hover:bg-opacity-30`,
  tw`bg-opacity-20`,
  tw`border`,
  tw`flex`,
  tw`justify-center`,
  tw`mb-3`,
  tw`pb-0.5`,
  tw`px-2`,
  tw`rounded-lg`,
  tw`text-lg`,
  tw`lg:px-0.5`,
  tw`w-fit`,
  $styles,
]);

export const DrillyTypography = styled(Typography)<{ $isDarkMode?: boolean } & TypographyProps>(
  ({ $isDarkMode }) => [$isDarkMode && tw`text-white`, tw`break-words`, tw`[word-wrap:break-word]`],
);

export const DrillyTextField = styled(TextField)<{
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
