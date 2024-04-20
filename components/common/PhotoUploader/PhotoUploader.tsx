import * as React from 'react';
import ImageUploading, { ImageListType as PhotoListType } from 'react-images-uploading';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../context/GlobalReducer';

import {
  PhotoUploaderActionButtons,
  PhotoUploaderPhotosListDesktop,
  PhotoUploaderPhotosListMobile,
  PhotoUploaderUploadArea,
} from '../PhotoUploader';

export const PhotoUploader = () => {
  const {
    dispatch,
    state: { photoList, photoUploadData, selectedPhotoAlbum },
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
            ? { ...photoUpload, ...{ [e.target.id ?? 'albumName']: e.target.value } }
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
      <ImageUploading multiple onChange={handlePhotoUploadingChange} value={photoList}>
        {({ dragProps, isDragging, onImageUpload, onImageRemoveAll, onImageRemove }) => (
          <>
            <PhotoUploaderActionButtons
              isAbleToSubmitUpload={isAbleToSubmitUpload}
              onImageRemoveAll={onImageRemoveAll}
            />
            <PhotoUploaderUploadArea
              dragProps={dragProps}
              isDragging={isDragging}
              onImageUpload={onImageUpload}
            />
            <PhotoUploaderPhotosListDesktop
              handleInputChange={handleInputChange}
              onImageRemove={onImageRemove}
            />
            <PhotoUploaderPhotosListMobile
              handleInputChange={handleInputChange}
              onImageRemove={onImageRemove}
            />
          </>
        )}
      </ImageUploading>
    )
  );
};
