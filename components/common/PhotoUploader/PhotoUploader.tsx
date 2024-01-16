import * as React from 'react';
import ImageUploading, { ImageListType as PhotoListType } from 'react-images-uploading';

import {
  PhotoUploaderActionButtons,
  PhotoUploaderPhotosListDesktop,
  PhotoUploaderPhotosListMobile,
  PhotoUploaderUploadArea,
  PhotoUploadData,
} from '../PhotoUploader';

export const PhotoUploader = () => {
  const [isAbleToSubmitUpload, setIsAbleToSubmitUpload] = React.useState<boolean>(false);
  const [photoList, setPhotoList] = React.useState<PhotoListType>([]);
  const [photoUploadData, setPhotoUploadData] = React.useState<PhotoUploadData[]>([]);

  const handlePhotoUploadingChange = (photoListData: PhotoListType) => setPhotoList(photoListData);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    imageURL: string | undefined,
    imageIndex: number,
  ) => {
    setPhotoUploadData(
      photoUploadData.map((photoUpload, photoUploadIndex) =>
        photoUploadIndex === imageIndex
          ? { ...photoUpload, ...{ [e.target.id ?? 'albumName']: e.target.value } }
          : photoUpload,
      ),
    );
  };

  React.useEffect(() => {
    setPhotoUploadData(
      photoList.map((photo, photoIndex) => ({
        albumName: photoUploadData[photoIndex]?.albumName,
        description: photoUploadData[photoIndex]?.description,
        title: photoUploadData[photoIndex]?.title,
        uploadedAt: new Date(),
        url: photo?.file?.name,
      })),
    );
  }, [photoList]);

  React.useEffect(() => {
    setIsAbleToSubmitUpload(!photoUploadData.find(photo => !photo.title || !photo.albumName));
  }, [photoUploadData]);

  return (
    <ImageUploading multiple onChange={handlePhotoUploadingChange} value={photoList}>
      {({ dragProps, isDragging, onImageUpload, onImageRemoveAll, onImageRemove }) => (
        <>
          <PhotoUploaderActionButtons
            isAbleToSubmitUpload={isAbleToSubmitUpload}
            onImageRemoveAll={onImageRemoveAll}
            photoList={photoList}
            photoUploadData={photoUploadData}
            setPhotoList={setPhotoList}
            setPhotoUploadData={setPhotoUploadData}
          />
          <PhotoUploaderUploadArea
            dragProps={dragProps}
            isDragging={isDragging}
            onImageUpload={onImageUpload}
          />
          <PhotoUploaderPhotosListDesktop
            handleInputChange={handleInputChange}
            onImageRemove={onImageRemove}
            photoList={photoList}
            photoUploadData={photoUploadData}
            setPhotoList={setPhotoList}
            setPhotoUploadData={setPhotoUploadData}
          />
          <PhotoUploaderPhotosListMobile
            handleInputChange={handleInputChange}
            onImageRemove={onImageRemove}
            photoList={photoList}
            photoUploadData={photoUploadData}
            setPhotoList={setPhotoList}
            setPhotoUploadData={setPhotoUploadData}
          />
        </>
      )}
    </ImageUploading>
  );
};
