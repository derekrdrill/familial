import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';
import Image from 'next/image';
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

export const DrillyTypography = styled(Typography)<
  { $textColor?: TwStyle; $isDarkMode?: boolean } & TypographyProps
>(({ $textColor, $isDarkMode }) => [
  $isDarkMode && tw`text-gray-DADADA`,
  $textColor && $textColor,
  tw`break-words`,
  tw`[word-wrap:break-word]`,
]);

export const DrillyTextField = styled(TextField)<{
  $bgColor?: TwStyle;
  $bgColorDark?: TwStyle;
  $hasBorder?: boolean;
  $hasError?: boolean;
  $isDarkMode?: boolean;
  $isFocused?: boolean;
  $isRounded?: boolean;
}>(
  ({
    $bgColor,
    $bgColorDark,
    $hasBorder = true,
    $hasError,
    $isDarkMode,
    $isFocused,
    $isRounded,
  }) => [
    tw`rounded-lg`,
    {
      '.MuiFormLabel-root': [$isDarkMode && tw`text-white`],
      '.MuiInputBase-root': [
        $bgColor && $bgColor,
        $bgColorDark && $isDarkMode && $bgColorDark,
        $isDarkMode && tw`text-white`,
        $hasBorder && [tw`border-[1px]`, tw`border-gray-B6B6B6`],
        $hasBorder && $isFocused && [tw`border-2`, tw`border-primary`],
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
  ],
);

export const DrillySelectableImage = styled(Image)<{
  $isNoPhotoSelected?: boolean;
  $isSelected?: boolean;
}>(({ $isNoPhotoSelected, $isSelected }) => [
  ($isNoPhotoSelected || $isSelected) && tw`opacity-100`,
  ($isNoPhotoSelected || !$isSelected) && tw`hover:opacity-70`,
  !$isNoPhotoSelected && !$isSelected && tw`opacity-70`,
  !$isNoPhotoSelected && $isSelected && tw`border-4 border-success`,
  tw`cursor-pointer`,
  tw`h-40`,
  tw`rounded`,
  tw`w-full`,
  tw`object-contain`,
]);
