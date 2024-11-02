import React from 'react';

import GlobalContext from '../../../../context/GlobalContext';
import { TextInput } from '../../../common/TextInput/TextInput';
import { GlobalReducerAction, GlobalReducerActionEnum } from '../../../../context/GlobalReducer';
import { DrillyTypography } from '../../../../styles/globals';
import { FormError } from '../../../../types';

type AddNewMemberProps = {};

export const AddNewMember = ({}: AddNewMemberProps) => {
  const handleAddNewUserSubmit = async ({
    dispatch,
    setEmailAddress,
    setFirstName,
    setLastName,
    setPhoneNumber,
  }: {
    dispatch: React.Dispatch<GlobalReducerAction>;
    setEmailAddress?: React.Dispatch<React.SetStateAction<string | undefined>>;
    setFirstName?: React.Dispatch<React.SetStateAction<string | undefined>>;
    setLastName?: React.Dispatch<React.SetStateAction<string | undefined>>;
    setPhoneNumber?: React.Dispatch<React.SetStateAction<string | undefined>>;
  }) => {
    if (emailAddress !== '' && phoneNumber !== '' && firstName !== '' && lastName !== '') {
      try {
        await fetch('/api/user/add', {
          method: 'POST',
          body: JSON.stringify({
            emailAddress,
            firstName,
            lastName,
            phoneNumber,
          }),
        }).then(async res => {
          const newUser = await res.json();

          if (setEmailAddress && setFirstName && setLastName && setPhoneNumber) {
            setEmailAddress('');
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
          }

          dispatch({
            type: GlobalReducerActionEnum.SET_ALERT_ITEM,
            payload: {
              alertItem: {
                alertMessage: `${newUser.firstName} ${newUser.lastName} has been added to Familial!`,
                alertSeverity: 'success',
                isAlertOpen: true,
              },
            },
          });
        });
      } catch (error) {
        dispatch({
          type: GlobalReducerActionEnum.SET_ALERT_ITEM,
          payload: {
            alertItem: {
              alertMessage: 'There was an error trying to add a new user!',
              alertSeverity: 'error',
              isAlertOpen: true,
            },
          },
        });

        console.log(error);
      }
    } else {
      let errors: FormError[] = [];

      if (!firstName || firstName === '') {
        errors = [...errors, ...[{ id: 'firstName', error: 'Please enter a first name' }]];
      }

      if (!lastName || lastName === '') {
        errors = [...errors, ...[{ id: 'lastName', error: 'Please enter a last name' }]];
      }

      if (!phoneNumber || phoneNumber === '') {
        errors = [...errors, ...[{ id: 'phoneNumber', error: 'Please enter a phone number' }]];
      }

      if (!emailAddress || emailAddress === '') {
        errors = [...errors, ...[{ id: 'emailAddress', error: 'Please enter an email address' }]];
      }

      setErrors(errors);
    }
  };

  const {
    dispatch,
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const [emailAddress, setEmailAddress] = React.useState<string | undefined>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string | undefined>('');
  const [firstName, setFirstName] = React.useState<string | undefined>('');
  const [lastName, setLastName] = React.useState<string | undefined>('');
  const [errors, setErrors] = React.useState<FormError[]>([]);

  return (
    <div tw='grid gap-4 mx-8 md:mx-32 lg:mx-64 xl:mx-96 mt-16 w-full'>
      <DrillyTypography tw='text-center text-4xl' variant='h1' $isDarkMode={isDarkMode}>
        Add new member
      </DrillyTypography>
      <DrillyTypography tw='text-center' variant='body1' $isDarkMode={isDarkMode}>
        This new member will be notified via email or SMS to login to Familial :)
      </DrillyTypography>
      <div>
        <TextInput
          hasError={!!errors.find(error => error.id === 'firstName')}
          setTextInputValue={setFirstName}
          textInputId='firstName'
          textInputLabel='First name'
          textInputValue={firstName}
          textInputSize='small'
          textInputPlaceholder='Enter first name'
        />
      </div>
      <div>
        <TextInput
          hasError={!!errors.find(error => error.id === 'lastName')}
          setTextInputValue={setLastName}
          textInputId='lastName'
          textInputLabel='Last name'
          textInputValue={lastName}
          textInputSize='small'
          textInputPlaceholder='Enter last name'
        />
      </div>
      <div>
        <TextInput
          hasError={!!errors.find(error => error.id === 'phoneNumber')}
          setTextInputValue={setPhoneNumber}
          textInputId='phoneNumber'
          textInputLabel='Phone number'
          textInputValue={phoneNumber}
          textInputSize='small'
          textInputPlaceholder='Enter phone number'
        />
      </div>
      <div>
        <TextInput
          hasError={!!errors.find(error => error.id === 'emailAddress')}
          setTextInputValue={setEmailAddress}
          textInputId='email'
          textInputLabel='Email'
          textInputValue={emailAddress}
          textInputSize='small'
          textInputPlaceholder='Enter email'
        />
      </div>
      <div tw='flex justify-end'>
        <button
          onClick={() => {
            handleAddNewUserSubmit({
              dispatch,
              setEmailAddress,
              setFirstName,
              setLastName,
              setPhoneNumber,
            });
          }}
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
