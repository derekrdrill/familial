import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import tw from 'twin.macro';
import styled from '@emotion/styled';

import GlobalContext from '../../../../../../context/GlobalContext';

import { TextInput } from '../../../../../common/TextInput/TextInput';
import { DrillyTypography } from '../../../../../../styles/globals';

import { handlePhotoAlbumEditClick, handlePhotoEditClick } from '../helpers';
import { Photos } from '../../../../../../types';
import { PhotoCoverModalSubmitButton } from './PhotoCoverModalSubmitButton';

type PhotoCoverEditContentProps = {
  albumPhotos?: Photos[];
  photoAlbumName?: string;
  photoId?: string;
  photoTitle?: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<'delete' | 'edit' | undefined>>;
};

export const PhotoCoverEditContent = ({
  albumPhotos,
  photoAlbumName,
  photoId,
  photoTitle,
  setIsModalOpen,
}: PhotoCoverEditContentProps) => {
  const router = useRouter();

  const {
    dispatch,
    state: { albums },
  } = React.useContext(GlobalContext);

  const isAlbumPage = !router.query.albumID;

  const [editAlbumNameValue, setEditAlbmNameValue] = React.useState<string | undefined>(
    router.query.albumID ? photoTitle : photoAlbumName,
  );
  const [editingModalPage, setEditingModalPage] = React.useState<'cover' | 'start' | 'title'>(
    isAlbumPage ? 'start' : 'title',
  );
  const [isEditModalLoading, setIsEditModalLoading] = React.useState<boolean>(false);
  const [selectedAlbumCoverPhoto, setSelectedAlbumCoverPhoto] = React.useState<Photos>();

  return (
    <>
      {editingModalPage === 'start' && (
        <>
          <DrillyTypography tw='text-lg' variant='h1'>
            Select one:
          </DrillyTypography>
          <div tw='grid gap-3 grid-cols-1'>
            <button
              onClick={() => setEditingModalPage('title')}
              tw='border-2 shadow-sm border-gray-400 py-4 rounded-lg hover:shadow-lg hover:border-info hover:bg-info hover:bg-opacity-30'
            >
              <DrillyTypography tw='cursor-pointer text-center'>Edit title</DrillyTypography>
            </button>
            <button
              onClick={() => setEditingModalPage('cover')}
              tw='border-2 shadow-sm border-gray-400 py-4 rounded-lg hover:shadow-lg hover:border-info hover:bg-info hover:bg-opacity-30'
            >
              <DrillyTypography tw='cursor-pointer text-center'>
                Change album cover
              </DrillyTypography>
            </button>
          </div>
        </>
      )}
      {editingModalPage === 'title' && (
        <TextInput
          setTextInputValue={setEditAlbmNameValue}
          textInputId='album'
          textInputLabel='Update the title'
          textInputSize='small'
          textInputValue={editAlbumNameValue}
        />
      )}
      {editingModalPage === 'cover' && (
        <>
          <DrillyTypography component='h1' variant='h6'>
            Select an album cover
          </DrillyTypography>
          <div tw='gap-1 grid grid-cols-2 max-h-80 overflow-auto md:grid-cols-4'>
            {albumPhotos?.map(albumPhoto => (
              <div key={albumPhoto._id} tw='col-span-1'>
                <PhotoCoverSelectImage
                  alt={albumPhoto.title}
                  height={0}
                  onClick={() =>
                    selectedAlbumCoverPhoto?._id === albumPhoto._id
                      ? setSelectedAlbumCoverPhoto(undefined)
                      : setSelectedAlbumCoverPhoto(albumPhoto)
                  }
                  src={albumPhoto.url}
                  sizes='100vw'
                  width={0}
                  $isNoPhotoSelected={selectedAlbumCoverPhoto === undefined}
                  $isSelected={albumPhoto._id === selectedAlbumCoverPhoto?._id}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {editingModalPage !== 'start' && (
        <PhotoCoverModalSubmitButton
          buttonText={editingModalPage === 'title' ? 'Update title' : 'Change album cover'}
          handleSubmit={async () => {
            if (editingModalPage === 'title') {
              if (!!router.query.albumID) {
                await handlePhotoEditClick({
                  newPhotoTitle: editAlbumNameValue,
                  photoId: photoId,
                  setIsEditModalLoading,
                  setIsModalOpen,
                });
              } else {
                await handlePhotoAlbumEditClick({
                  dispatch,
                  editingAlbumId: photoId,
                  photoAlbums: albums,
                  newAlbumName: editAlbumNameValue,
                  setIsEditModalLoading,
                  setIsModalOpen,
                });
              }
            } else if (editingModalPage === 'cover') {
              await handlePhotoAlbumEditClick({
                dispatch,
                editingAlbumId: photoId,
                photoAlbums: albums,
                newAlbumCoverURL: selectedAlbumCoverPhoto?.url,
                setIsEditModalLoading,
                setIsModalOpen,
              });
            }
          }}
          isModalLoading={isEditModalLoading}
        />
      )}
    </>
  );
};

const PhotoCoverSelectImage = styled(Image)<{
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
