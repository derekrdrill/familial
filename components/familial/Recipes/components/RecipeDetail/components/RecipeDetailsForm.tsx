import React from 'react';
import tw from 'twin.macro';
import { InputLabel, MenuItem, Typography } from '@mui/material';

import GlobalContext from '../../../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../../../context/GlobalReducer';

import { DrillyTextField, DrillyTypography } from '../../../../../../styles/globals';
import { COOK_TYPES } from '../constants';
import { Cookbook, FormError } from '../../../../../../types';

type RecipeDetailsFormProps = {
  allCookbooks: Cookbook[];
  cookbook: string;
  cookTime: string;
  cookType: string;
  errors: FormError[];
  recipeName: string;
  setCookbook: React.Dispatch<React.SetStateAction<string>>;
  setCookTime: React.Dispatch<React.SetStateAction<string>>;
  setCookType: React.Dispatch<React.SetStateAction<string>>;
  setRecipeName: React.Dispatch<React.SetStateAction<string>>;
  setTemperature: React.Dispatch<React.SetStateAction<string>>;
  temperature: string;
};

const RecipeDetailsForm = ({
  allCookbooks,
  cookbook,
  cookTime,
  cookType,
  errors,
  recipeName,
  setCookbook,
  setCookTime,
  setCookType,
  setRecipeName,
  setTemperature,
  temperature,
}: RecipeDetailsFormProps) => {
  const {
    dispatch,
    state: { isDarkMode, user },
  } = React.useContext(GlobalContext);

  const [cookbooks, setCookbooks] = React.useState<Cookbook[]>(allCookbooks);

  const recipeNameError = errors.find(error => error.id === 'title')?.error;
  const recipeCookbookError = errors.find(error => error.id === 'cookbook')?.error;
  const recipeCookTimeError = errors.find(error => error.id === 'time')?.error;
  const hasRecipeNameError = !!recipeNameError;
  const hasRecipeCookbookError = !!recipeCookbookError;
  const hasRecipeCookTimeError = !!recipeCookTimeError;

  return (
    <>
      <div tw='col-span-full gap-2 grid grid-cols-1 lg:grid-cols-3'>
        <div>
          <InputLabel htmlFor='recipeName'>
            <DrillyTypography
              $isDarkMode={isDarkMode}
              $textColor={hasRecipeNameError ? tw`text-error` : undefined}
            >
              Recipe name *
            </DrillyTypography>
          </InputLabel>
          <DrillyTextField
            id='recipeName'
            fullWidth
            onChange={e => setRecipeName(e.currentTarget.value)}
            placeholder='Enter recipe name'
            size='small'
            value={recipeName}
            $bgColor={tw`bg-gray-D9D9D9`}
            $bgColorDark={tw`bg-gray-3D3D3D`}
            $hasBorder={false}
            $hasError={hasRecipeNameError}
            $isDarkMode={isDarkMode}
          />
          {hasRecipeNameError && (
            <DrillyTypography component='p' variant='caption' $textColor={tw`text-error`}>
              {recipeNameError}
            </DrillyTypography>
          )}
        </div>
        <div>
          <InputLabel htmlFor='cookType'>
            <DrillyTypography $isDarkMode={isDarkMode}>Cook type</DrillyTypography>
          </InputLabel>
          <DrillyTextField
            id='cookType'
            fullWidth
            onChange={e => setCookType(e.target.value)}
            select
            size='small'
            value={cookType}
            $bgColor={tw`bg-gray-D9D9D9`}
            $bgColorDark={tw`bg-gray-3D3D3D`}
            $hasBorder={false}
            $isDarkMode={isDarkMode}
          >
            {COOK_TYPES.map(cookType => (
              <MenuItem key={cookType} id={cookType} value={cookType}>
                {cookType}
              </MenuItem>
            ))}
          </DrillyTextField>
        </div>
        <div>
          <InputLabel htmlFor='cookbook'>
            <DrillyTypography
              $isDarkMode={isDarkMode}
              $textColor={hasRecipeCookbookError ? tw`text-error` : undefined}
            >
              Cookbook *
            </DrillyTypography>
          </InputLabel>
          <DrillyTextField
            id='cookbook'
            fullWidth
            select
            size='small'
            value={cookbook}
            $bgColor={tw`bg-gray-D9D9D9`}
            $bgColorDark={tw`bg-gray-3D3D3D`}
            $hasBorder={false}
            $hasError={hasRecipeCookbookError}
            $isDarkMode={isDarkMode}
          >
            {[...[{ _id: 'select', title: 'Select a cookbook...' }], ...cookbooks]?.map(
              cookbook => (
                <MenuItem
                  key={cookbook._id}
                  id={cookbook.title}
                  onClick={() => {
                    setCookbook(cookbook.title);
                  }}
                  value={cookbook.title}
                >
                  {cookbook.title}
                </MenuItem>
              ),
            )}
            <MenuItem
              onClick={() =>
                dispatch({
                  type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                  payload: {
                    modalItem: {
                      handleSubmit: async () => {
                        const newCookbookName = (
                          document.getElementById('newCookbook') as HTMLInputElement
                        )?.value;

                        await fetch('/api/cookbook/add', {
                          method: 'POST',
                          body: JSON.stringify({
                            author: user?.firstName,
                            authorId: user?.userID,
                            lastUpdated: new Date(),
                            title: newCookbookName,
                            uploadedAt: new Date(),
                          }),
                        })
                          .then(async res => {
                            const newCookbooks = await res.json();
                            setCookbooks(newCookbooks);
                          })
                          .catch(e => {
                            console.log(e);
                          });
                      },
                      isExitHidden: true,
                      isModalOpen: true,
                      modalBody: (
                        <DrillyTextField
                          id='newCookbook'
                          fullWidth
                          placeholder='Enter cookbook name'
                          size='small'
                          variant='outlined'
                          $hasBorder
                          $bgColor={tw`bg-gray-D9D9D9`}
                          $bgColorDark={tw`bg-gray-3D3D3D`}
                          $isDarkMode={isDarkMode}
                        />
                      ),
                      modalTitle: 'Add new cookbook',
                      submitSuccessMessage: (
                        <>
                          <DrillyTypography variant='subtitle1' $isDarkMode={isDarkMode}>
                            New cookbook added!
                          </DrillyTypography>
                          <DrillyTypography variant='subtitle2' $isDarkMode={isDarkMode}>
                            You can add a recipe to this cook now
                          </DrillyTypography>
                        </>
                      ),
                    },
                  },
                })
              }
            >
              <Typography fontWeight='bold' variant='caption'>
                Add cookbook +
              </Typography>
            </MenuItem>
          </DrillyTextField>
          {hasRecipeCookbookError && (
            <DrillyTypography component='p' variant='caption' $textColor={tw`text-error`}>
              {recipeCookbookError}
            </DrillyTypography>
          )}
        </div>
      </div>
      <div tw='col-span-full gap-2 grid grid-cols-1 lg:grid-cols-3'>
        <div>
          <InputLabel htmlFor='temperature'>
            <DrillyTypography $isDarkMode={isDarkMode}>Temperature</DrillyTypography>
          </InputLabel>
          <DrillyTextField
            id='temperature'
            fullWidth
            onChange={e => setTemperature(e.currentTarget.value)}
            placeholder='Enter temperature'
            value={temperature}
            size='small'
            $bgColor={tw`bg-gray-D9D9D9`}
            $bgColorDark={tw`bg-gray-3D3D3D`}
            $hasBorder={false}
            $isDarkMode={isDarkMode}
          />
        </div>
        <div>
          <InputLabel htmlFor='cookTime'>
            <DrillyTypography
              $isDarkMode={isDarkMode}
              $textColor={hasRecipeCookTimeError ? tw`text-error` : undefined}
            >
              Cook time *
            </DrillyTypography>
          </InputLabel>
          <DrillyTextField
            id='cookTime'
            fullWidth
            onChange={e => setCookTime(e.currentTarget.value)}
            placeholder='Enter cook time'
            value={cookTime}
            size='small'
            $bgColor={tw`bg-gray-D9D9D9`}
            $bgColorDark={tw`bg-gray-3D3D3D`}
            $hasBorder={false}
            $hasError={hasRecipeCookTimeError}
            $isDarkMode={isDarkMode}
          />
          {hasRecipeCookTimeError && (
            <DrillyTypography component='p' variant='caption' $textColor={tw`text-error`}>
              {recipeCookTimeError}
            </DrillyTypography>
          )}
        </div>
      </div>
    </>
  );
};

export default RecipeDetailsForm;
