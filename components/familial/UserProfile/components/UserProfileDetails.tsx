import React from 'react';
import Link from 'next/link';
import { DrillyTypography } from '../../../../styles/globals';
import GlobalContext from '../../../../context/GlobalContext';

type UserProfileDetailsProps = {
  setIsUserSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserProfileDetails = ({ setIsUserSidebarOpen }: UserProfileDetailsProps) => {
  const {
    state: { isDarkMode, user },
  } = React.useContext(GlobalContext);

  return (
    <>
      <DrillyTypography
        variant='h4'
        textAlign='center'
        $isDarkMode={isDarkMode}
      >{`${user?.firstName} ${user?.lastName}`}</DrillyTypography>
      <DrillyTypography variant='h6' textAlign='center' $isDarkMode={isDarkMode}>
        {user?.userName}
      </DrillyTypography>
      {user?.isAdmin && (
        <Link href='/admin/add-new-member' onClick={() => setIsUserSidebarOpen(false)}>
          <DrillyTypography
            textAlign='center'
            tw='text-info-dark text-xs underline'
            variant='subtitle2'
          >
            Admin settings
          </DrillyTypography>
        </Link>
      )}
    </>
  );
};
