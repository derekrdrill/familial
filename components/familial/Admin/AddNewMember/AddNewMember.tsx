import React from 'react';
import tw from 'twin.macro';
import { InputLabel } from '@mui/material';

import GlobalContext from '../../../../context/GlobalContext';
import { DrillyTextField, DrillyTypography } from '../../../../styles/globals';

type AddNewMemberProps = {};

export const AddNewMember = ({}: AddNewMemberProps) => {
  const handleAddNewUserSubmit = async () => {
    try {
      if (emailAddress !== '' && phoneNumber !== '' && firstName !== '' && lastName !== '') {
        await fetch('/api/user/auth/add', {
          method: 'POST',
          body: JSON.stringify({
            emailAddress,
            firstName,
            lastName,
            phoneNumber,
          }),
        }).then(async res => console.log(await res.json()));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const [emailAddress, setEmailAddress] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');

  return (
    <div tw='grid gap-4 mx-8 md:mx-32 lg:mx-64 xl:mx-96 mt-16 w-full'>
      <DrillyTypography tw='text-center text-4xl' variant='h1' $isDarkMode={isDarkMode}>
        Add new member
      </DrillyTypography>
      <DrillyTypography tw='text-center' variant='body1' $isDarkMode={isDarkMode}>
        This new member will be notified via email or SMS to login to Familial :)
      </DrillyTypography>
      <div>
        <InputLabel htmlFor='firstName'>
          <DrillyTypography $isDarkMode={isDarkMode}>First name</DrillyTypography>
        </InputLabel>
        <DrillyTextField
          id='firstName'
          fullWidth
          onChange={e => setFirstName(e.target.value)}
          placeholder='Enter first name'
          size='small'
          value={firstName}
          $bgColor={tw`bg-gray-D9D9D9`}
          $bgColorDark={tw`bg-gray-3D3D3D`}
          $hasBorder={false}
          // $hasError={ingredientRowKey === 0 && !!errors.find(error => error.id === 'ingredients')}
          $isDarkMode={isDarkMode}
        />
      </div>
      <div>
        <InputLabel htmlFor='lastName'>
          <DrillyTypography $isDarkMode={isDarkMode}>Last name</DrillyTypography>
        </InputLabel>
        <DrillyTextField
          id='lastName'
          fullWidth
          onChange={e => setLastName(e.target.value)}
          placeholder='Enter last name'
          size='small'
          value={lastName}
          $bgColor={tw`bg-gray-D9D9D9`}
          $bgColorDark={tw`bg-gray-3D3D3D`}
          $hasBorder={false}
          // $hasError={ingredientRowKey === 0 && !!errors.find(error => error.id === 'ingredients')}
          $isDarkMode={isDarkMode}
        />
      </div>
      <div>
        <InputLabel htmlFor='phoneNumber'>
          <DrillyTypography $isDarkMode={isDarkMode}>Phone number</DrillyTypography>
        </InputLabel>
        <DrillyTextField
          id='phoneNumber'
          fullWidth
          onChange={e => setPhoneNumber(e.target.value)}
          placeholder='Enter phone number'
          size='small'
          value={phoneNumber}
          $bgColor={tw`bg-gray-D9D9D9`}
          $bgColorDark={tw`bg-gray-3D3D3D`}
          $hasBorder={false}
          // $hasError={ingredientRowKey === 0 && !!errors.find(error => error.id === 'ingredients')}
          $isDarkMode={isDarkMode}
        />
      </div>
      <div>
        <InputLabel htmlFor='email'>
          <DrillyTypography $isDarkMode={isDarkMode}>Email</DrillyTypography>
        </InputLabel>
        <DrillyTextField
          id='email'
          fullWidth
          onChange={e => setEmailAddress(e.target.value)}
          placeholder='Enter email'
          size='small'
          value={emailAddress}
          $bgColor={tw`bg-gray-D9D9D9`}
          $bgColorDark={tw`bg-gray-3D3D3D`}
          $hasBorder={false}
          // $hasError={ingredientRowKey === 0 && !!errors.find(error => error.id === 'ingredients')}
          $isDarkMode={isDarkMode}
        />
      </div>
      <div tw='flex justify-end'>
        <button
          onClick={handleAddNewUserSubmit}
          tw='bg-opacity-60 bg-success px-4 rounded hover:bg-opacity-100'
        >
          <DrillyTypography variant='subtitle1' $isDarkMode={isDarkMode}>
            Add member
          </DrillyTypography>
        </button>
      </div>
    </div>
  );
};
