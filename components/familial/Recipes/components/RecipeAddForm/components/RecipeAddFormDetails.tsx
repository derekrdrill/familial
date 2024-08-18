import React from 'react';
import tw from 'twin.macro';
import { InputLabel, MenuItem } from '@mui/material';

import GlobalContext from '../../../../../../context/GlobalContext';
import { DrillyTextField, DrillyTypography } from '../../../../../../styles/globals';

import { COOK_TYPES } from '../constants';
import { Cookbook } from '../../../../../../types';

type RecipeAddFormDetailsProps = {
  allCookbooks: Cookbook[];
  cookbook: string;
  cookTime: string;
  cookType: string;
  errors: { id: string; error: string }[];
  recipeName: string;
  setCookbook: React.Dispatch<React.SetStateAction<string>>;
  setCookTime: React.Dispatch<React.SetStateAction<string>>;
  setCookType: React.Dispatch<React.SetStateAction<string>>;
  setRecipeName: React.Dispatch<React.SetStateAction<string>>;
  setTemperature: React.Dispatch<React.SetStateAction<string>>;
  temperature: string;
};

const RecipeAddFormDetails = ({
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
}: RecipeAddFormDetailsProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <>
      <DrillyTypography tw='font-main mt-5 text-2xl' variant='h2' $isDarkMode={isDarkMode}>
        Details
      </DrillyTypography>
      <div tw='col-span-full gap-2 grid grid-cols-1 lg:grid-cols-3'>
        <div>
          <InputLabel htmlFor='recipeName'>
            <DrillyTypography $isDarkMode={isDarkMode}>Recipe name *</DrillyTypography>
          </InputLabel>
          <DrillyTextField
            id='recipeName'
            fullWidth
            onChange={e => setRecipeName(e.currentTarget.value)}
            placeholder='Enter recipe name'
            value={recipeName}
            $bgColor={tw`bg-gray-D9D9D9`}
            $bgColorDark={tw`bg-gray-3D3D3D`}
            $hasBorder={false}
            $hasError={!!errors.find(error => error.id === 'title')}
            $isDarkMode={isDarkMode}
          />
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
            <DrillyTypography $isDarkMode={isDarkMode}>Cookbook</DrillyTypography>
          </InputLabel>
          <DrillyTextField
            id='cookbook'
            fullWidth
            onChange={e => setCookbook(e.target.value)}
            select
            value={cookbook}
            $bgColor={tw`bg-gray-D9D9D9`}
            $bgColorDark={tw`bg-gray-3D3D3D`}
            $hasBorder={false}
            $hasError={!!errors.find(error => error.id === 'cookbook')}
            $isDarkMode={isDarkMode}
          >
            {[...[{ _id: 'select', title: 'Select a cookbook...' }], ...allCookbooks]?.map(
              cookbook => (
                <MenuItem key={cookbook._id} id={cookbook.title} value={cookbook.title}>
                  {cookbook.title}
                </MenuItem>
              ),
            )}
          </DrillyTextField>
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
            $bgColor={tw`bg-gray-D9D9D9`}
            $bgColorDark={tw`bg-gray-3D3D3D`}
            $hasBorder={false}
            $isDarkMode={isDarkMode}
          />
        </div>
        <div>
          <InputLabel htmlFor='cookTime'>
            <DrillyTypography $isDarkMode={isDarkMode}>Cook time</DrillyTypography>
          </InputLabel>
          <DrillyTextField
            id='cookTime'
            fullWidth
            onChange={e => setCookTime(e.currentTarget.value)}
            placeholder='Enter cook time'
            value={cookTime}
            $bgColor={tw`bg-gray-D9D9D9`}
            $bgColorDark={tw`bg-gray-3D3D3D`}
            $hasBorder={false}
            $hasError={!!errors.find(error => error.id === 'time')}
            $isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </>
  );
};

export default RecipeAddFormDetails;
