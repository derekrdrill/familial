import * as React from 'react';
import tw from 'twin.macro';
import Image from 'next/image';
import ImageUploading, { ImageListType as PhotoListType } from 'react-images-uploading';
import styled from '@emotion/styled';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../context/GlobalReducer';

import {
  PhotoUploaderActionButtons,
  PhotoUploaderPhotosListDesktop,
  PhotoUploaderPhotosListMobile,
  PhotoUploaderUploadArea,
} from '../PhotoUploader';
import { TwStyle } from 'twin.macro';

type PhotoUploadProps = {
  isMultiple?: boolean;
  photoUploaderComponent?: React.ReactNode;
};

export const PhotoUploader = ({ isMultiple = true, photoUploaderComponent }: PhotoUploadProps) => {
  const {
    dispatch,
    state: { photoList, photoUploadData, selectedPhotoAlbum, user },
  } = React.useContext(GlobalContext);

  const [isAbleToSubmitUpload, setIsAbleToSubmitUpload] = React.useState<boolean>(false);

  const handlePhotoUploadingChange = (photoListData: PhotoListType) =>
    dispatch({
      type: GlobalReducerActionEnum.SET_PHOTO_LIST,
      payload: {
        photoList: photoListData,
      },
    });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    imageURL: string | undefined,
    imageIndex: number,
  ) => {
    dispatch({
      type: GlobalReducerActionEnum.SET_PHOTO_UPLOAD_DATA,
      payload: {
        photoUploadData: photoUploadData?.map((photoUpload, photoUploadIndex) =>
          photoUploadIndex === imageIndex
            ? {
                ...photoUpload,
                ...{ [e.target.id ?? 'albumName']: e.target.value },
              }
            : photoUpload,
        ),
      },
    });
  };

  React.useEffect(() => {
    if (photoList && photoUploadData) {
      dispatch({
        type: GlobalReducerActionEnum.SET_PHOTO_UPLOAD_DATA,
        payload: {
          photoUploadData: photoList.map((photo, photoIndex) => ({
            albumName: selectedPhotoAlbum?.albumName ?? photoUploadData[photoIndex]?.albumName,
            authorId: user?.userID,
            authorName: `${user?.firstName} ${user?.lastName}`,
            description: photoUploadData[photoIndex]?.description,
            title: photoUploadData[photoIndex]?.title,
            uploadedAt: new Date(),
            url: photo?.file?.name,
          })),
        },
      });
    }
  }, [photoList]);

  React.useEffect(() => {
    setIsAbleToSubmitUpload(!photoUploadData?.find(photo => !photo.title || !photo.albumName));
  }, [photoUploadData]);

  return (
    photoList && (
      <ImageUploading multiple={isMultiple} onChange={handlePhotoUploadingChange} value={photoList}>
        {({ dragProps, isDragging, onImageUpload, onImageRemoveAll, onImageRemove }) => (
          <>
            {isMultiple && (
              <PhotoUploaderActionButtons
                isAbleToSubmitUpload={isAbleToSubmitUpload}
                onImageRemoveAll={onImageRemoveAll}
              />
            )}
            <PhotoUploaderUploadArea
              dragProps={dragProps}
              isDragging={isDragging}
              isMultiple={isMultiple}
              onImageUpload={onImageUpload}
              photoUploadComponent={photoUploaderComponent}
            />
            {isMultiple && (
              <PhotoUploaderPhotosListDesktop
                handleInputChange={handleInputChange}
                onImageRemove={onImageRemove}
              />
            )}
            {isMultiple && (
              <PhotoUploaderPhotosListMobile
                handleInputChange={handleInputChange}
                onImageRemove={onImageRemove}
              />
            )}
          </>
        )}
      </ImageUploading>
    )
  );
};

const PhotoUploaderImageContainer = styled.div<{ $styles: TwStyle }>(({ $styles }) => [
  tw`flex`,
  tw`justify-center`,
  $styles,
]);

const PhotoUploaderImage = styled(Image)<{ $styles: TwStyle }>(({ $styles }) => [$styles]);
