import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Button, Grid } from '@mui/material';
import { ImageListType as PhotoListType } from 'react-images-uploading';
import { PhotoUploadData } from '../types/PhotoUploaderData';

export const handlePhotoUpload = async (
  photoList: PhotoListType,
  photoUploadData: PhotoUploadData[],
  setPhotoList: React.Dispatch<React.SetStateAction<PhotoListType>>,
  setPhotoUploadData: React.Dispatch<React.SetStateAction<PhotoUploadData[]>>,
) => {
  photoList.forEach(async (photo, photoKey) => {
    await fetch('/api/photo-uploader/blob', {
      method: 'POST',
      headers: { 'content-type': photo.file?.type ?? 'application/octet-stream' },
      body: photo.file,
    }).then(async res => {
      if (res.status === 200) {
        const { url } = await res.json();

        await fetch('api/photo-uploader', {
          method: 'POST',
          body: JSON.stringify({ ...photoUploadData[photoKey], ...{ url: url } }),
        }).then(res => {
          if (res.status === 200) {
            setPhotoList([]);
            setPhotoUploadData([]);
          }
        });
      }
    });
  });
};

type PhotoUploaderActionButtonsProps = {
  isAbleToSubmitUpload: boolean;
  onImageRemoveAll: () => void;
  photoList: PhotoListType;
  photoUploadData: PhotoUploadData[];
  setPhotoList: React.Dispatch<React.SetStateAction<PhotoListType>>;
  setPhotoUploadData: React.Dispatch<React.SetStateAction<PhotoUploadData[]>>;
};

export const PhotoUploaderActionButtons = ({
  isAbleToSubmitUpload,
  onImageRemoveAll,
  photoList,
  photoUploadData,
  setPhotoList,
  setPhotoUploadData,
}: PhotoUploaderActionButtonsProps) =>
  !!photoList.length && (
    <PhotoUploadActionButtonsGrid container justifyContent='flex-end' tw='pt-4 pb-12'>
      <Button color='error' onClick={onImageRemoveAll} size='small' variant='outlined' tw='mr-2'>
        REMOVE ALL PHOTOS
      </Button>
      <Button
        color='success'
        disabled={!isAbleToSubmitUpload}
        onClick={e =>
          handlePhotoUpload(photoList, photoUploadData, setPhotoList, setPhotoUploadData)
        }
        variant='outlined'
      >
        UPLOAD NEW PHOTOS
      </Button>
    </PhotoUploadActionButtonsGrid>
  );

export const PhotoUploadActionButtonsGrid = styled(Grid)([
  tw`bg-white`,
  tw`h-16`,
  tw`shadow-lg`,
  tw`sticky`,
  tw`top-0`,
  tw`z-[2]`,
]);
