import React from 'react';
import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';
import { InputLabel, MenuItem } from '@mui/material';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../context/GlobalReducer';
import { DrillyTextField, DrillyTypography } from '../../../styles/globals';

type DropdownProps = {
  backgroundColor?: TwStyle;
  backgroundColorDark?: TwStyle;
  handleModalSubmit?: () => void;
  hasError?: boolean;
  id: string;
  modalSuccessSubtitle?: string;
  modalSuccessTitle?: string;
  options: { _id: string; title: string }[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
  size?: 'small' | 'medium';
  styles?: TwStyle;
  title: string;
  value: string;
};

const Dropdown = ({
  backgroundColor,
  backgroundColorDark,
  handleModalSubmit,
  hasError,
  id,
  modalSuccessSubtitle,
  modalSuccessTitle,
  options,
  setValue,
  size = 'small',
  styles,
  title,
  value,
}: DropdownProps) => {
  const {
    dispatch,
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <DropdownRoot $styles={styles}>
      <InputLabel htmlFor={id}>
        <DrillyTypography
          $isDarkMode={isDarkMode}
          $textColor={hasError ? tw`text-error` : undefined}
        >
          {title}
        </DrillyTypography>
      </InputLabel>
      <DrillyTextField
        id={id}
        fullWidth
        select
        size={size}
        value={value}
        $bgColor={backgroundColor}
        $bgColorDark={backgroundColorDark}
        $hasBorder={false}
        $hasError={hasError}
        $isDarkMode={isDarkMode}
      >
        {[...[{ _id: 'select', title: `Select a ${title.toLowerCase()}...` }], ...options]?.map(
          option => (
            <DropdownMenuItem
              key={option._id}
              id={option.title}
              onClick={() => {
                setValue(option.title);
              }}
              value={option.title}
              $isFirst={option._id === 'select'}
            >
              {option.title}
            </DropdownMenuItem>
          ),
        )}
        {handleModalSubmit && (
          <MenuItem
            onClick={() =>
              dispatch({
                type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                payload: {
                  modalItem: {
                    handleSubmit: handleModalSubmit,
                    isExitHidden: true,
                    isModalOpen: true,
                    modalBody: (
                      <DrillyTextField
                        id={`new${title}`}
                        fullWidth
                        placeholder={`Enter ${title.toLowerCase()} name`}
                        size='small'
                        variant='outlined'
                        $hasBorder
                        $bgColor={backgroundColor}
                        $bgColorDark={backgroundColorDark}
                        $isDarkMode={isDarkMode}
                      />
                    ),
                    modalTitle: `Add new ${title.toLowerCase()}`,
                    submitSuccessMessage: (
                      <>
                        <DrillyTypography variant='subtitle1' $isDarkMode={isDarkMode}>
                          {modalSuccessTitle}
                        </DrillyTypography>
                        <DrillyTypography variant='subtitle2' $isDarkMode={isDarkMode}>
                          {modalSuccessSubtitle}
                        </DrillyTypography>
                      </>
                    ),
                  },
                },
              })
            }
          >
            <DrillyTypography fontWeight='bold' variant='caption'>
              {`Add ${title.toLowerCase()} +`}
            </DrillyTypography>
          </MenuItem>
        )}
      </DrillyTextField>
    </DropdownRoot>
  );
};

const DropdownRoot = styled.div<{ $styles?: TwStyle }>(({ $styles }) => [$styles]);
const DropdownMenuItem = styled(MenuItem)<{ $isFirst: boolean }>(({ $isFirst }) => [
  $isFirst && tw`text-gray-777777`,
  $isFirst && tw`pointer-events-none`,
]);

export { Dropdown };
