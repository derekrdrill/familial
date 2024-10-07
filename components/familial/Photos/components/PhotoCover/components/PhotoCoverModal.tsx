import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Modal } from '@mui/material';

import GlobalContext from '../../../../../../context/GlobalContext';
import { DrillyButton } from '../../../../../../styles/globals';

import { PhotoCoverEditContent } from './PhotoCoverEditContent';
import { Photos } from '../../../../../../types';
import { PhotoCoverDeleteContent } from './PhotoCoverDeleteContent';

type PhotoCoverModalProps = {
  albumPhotos?: Photos[];
  isDeleting?: boolean;
  isEditing?: boolean;
  isModalOpen: boolean;
  photoAlbumName?: string;
  photoId?: string;
  photoTitle?: string;
  photoURL?: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<'delete' | 'edit' | undefined>>;
};

export const PhotoCoverModal = ({
  albumPhotos,
  isDeleting,
  isEditing,
  isModalOpen = false,
  photoAlbumName,
  photoId,
  photoTitle,
  photoURL,
  setIsModalOpen,
}: PhotoCoverModalProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <Modal open={isModalOpen}>
      <PhotoCoverModalRoot>
        <PhotoCoverModalContentContainer $isDarkMode={isDarkMode}>
          <div tw='flex justify-end col-start-12 col-end-13 mt-4'>
            <DrillyButton
              onClick={() => setIsModalOpen(undefined)}
              $variant='error'
              $twStyles={tw`rounded-md w-full`}
            >
              x
            </DrillyButton>
          </div>
          <div tw='col-span-12'>
            {isDeleting && (
              <PhotoCoverDeleteContent
                photoAlbumName={photoAlbumName}
                photoId={photoId}
                photoURL={photoURL}
              />
            )}
            {isEditing && (
              <PhotoCoverEditContent
                albumPhotos={albumPhotos}
                photoTitle={photoTitle}
                photoAlbumName={photoAlbumName}
                photoId={photoId}
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </div>
        </PhotoCoverModalContentContainer>
      </PhotoCoverModalRoot>
    </Modal>
  );
};

const PhotoCoverModalRoot = styled.div([
  tw`absolute`,
  tw`flex`,
  tw`justify-center`,
  tw`top-40`,
  tw`w-full`,
]);

const PhotoCoverModalContentContainer = styled.div<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  !$isDarkMode && tw`bg-gray-50`,
  $isDarkMode && tw`bg-gray-3A3A3A`,
  $isDarkMode && tw`text-gray-50`,
  tw`grid`,
  tw`grid-cols-12`,
  tw`pb-4`,
  tw`px-4`,
  tw`rounded-xl`,
  tw`w-[550px]`,
]);
