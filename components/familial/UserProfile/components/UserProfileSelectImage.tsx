import React from 'react';
import tw from 'twin.macro';
import { DrillyButton, DrillySelectableImage } from '../../../../styles/globals';
import { Photos } from '../../../../types';
import { CircularProgress } from '@mui/material';
import GlobalContext from '../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../context/GlobalReducer';

type UserProfileSelectImageProps = {
  photosByUserId: Photos[];
};

export const UserProfileSelectImage = ({ photosByUserId }: UserProfileSelectImageProps) => {
  const { dispatch } = React.useContext(GlobalContext);

  const [selectedAvatarPhoto, setSelectedAvatarPhoto] = React.useState<Photos>();
  const [isImageUpdating, setIsImageUpdating] = React.useState<boolean>();

  return (
    <div tw='gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {!!photosByUserId.length &&
        photosByUserId.map(photo => (
          <div tw='col-span-1'>
            <DrillySelectableImage
              alt={photo._id}
              height={0}
              onClick={() => {
                setSelectedAvatarPhoto(photo);
              }}
              src={photo.url}
              sizes='100vw'
              tw='cursor-pointer h-20 object-cover w-20'
              width={0}
              $isNoPhotoSelected={selectedAvatarPhoto === undefined}
              $isSelected={selectedAvatarPhoto?._id === photo._id}
            />
          </div>
        ))}
      <div tw='col-span-full flex justify-end'>
        <DrillyButton
          onClick={() => {
            dispatch({
              type: GlobalReducerActionEnum.SET_PHOTO_LIST,
              payload: {
                photoList: [{ dataURL: selectedAvatarPhoto?.url }],
              },
            });
          }}
          $isDisabled={isImageUpdating}
          $variant='primary'
        >
          {isImageUpdating ? <CircularProgress color='primary' /> : 'Preview updated avatar'}
        </DrillyButton>
      </div>
    </div>
  );
};
