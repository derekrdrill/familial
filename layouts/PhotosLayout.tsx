import React from 'react';
import { useRouter } from 'next/router';
import ImageUploading, { ImageListType as PhotoListType } from 'react-images-uploading';
import tw from 'twin.macro';

import styled from '@emotion/styled';
import { Grid } from '@mui/material';

import GlobalContext from '../context/GlobalContext';

import {
  PhotoAlbums,
  PhotoAlbumPhotos,
  PhotoAlbumsBackButton,
  PhotoInfoAndActions,
  PhotoViewer,
} from '../components/familial/Photos';
import PhotoUploader from '../components/common/PhotoUploader';
import { Albums, Photos } from '../types';
import { GlobalReducerAction, GlobalReducerActionEnum } from '../context/GlobalReducer';

const handlePhotoUploadingChange = (
  photoListData: PhotoListType,
  dispatch: React.Dispatch<GlobalReducerAction>,
) =>
  dispatch({
    type: GlobalReducerActionEnum.SET_PHOTO_LIST,
    payload: {
      photoList: photoListData,
    },
  });

type PhotosLayoutProps = {
  albumsData: Albums[];
  photosData: Photos[];
  photosLayoutTitle: string;
};

const PhotosLayout = ({ albumsData, photosData, photosLayoutTitle }: PhotosLayoutProps) => {
  const router = useRouter();

  const {
    dispatch,
    state: { isDarkMode, photoList },
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_ALBUMS,
      payload: { albums: albumsData },
    });

    dispatch({
      type: GlobalReducerActionEnum.SET_SELECTED_PHOTO_ALBUM,
      payload: {
        selectedPhotoAlbum: albumsData.find(album => album._id === router.query.albumID),
      },
    });
  }, [albumsData]);

  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_PHOTOS,
      payload: { photos: photosData },
    });
  }, [photosData]);

  React.useEffect(() => {
    if (!!!router.query.p) {
      dispatch({
        type: GlobalReducerActionEnum.SET_IS_PHOTO_VIEWER_BACK_BTN_SHOWN,
        payload: {
          isPhotoViewerBackBtnShown: false,
        },
      });
    }
  }, [router]);

  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     const maxY = !!photoList?.length ? 728 : 400;

  //     if (scrollY >= maxY && !isScrollBtnShown) {
  //       setIsScrollBtnShown(true);
  //     } else {
  //       setIsScrollBtnShown(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const photoCurrent = photosData?.find(photo => photo._id === router.query.p);

  return (
    !!photoList && (
      <ImageUploading
        multiple
        onChange={photoListData => handlePhotoUploadingChange(photoListData, dispatch)}
        value={photoList}
      >
        {({ onImageUpload }) => (
          <>
            <PhotoAlbumsBackButton />
            <PhotoUploader />
            <PhotoViewer
              isPhotoViewerOpen={!!router.query.p}
              photoAuthorFirstName={photoCurrent?.authorName.split(' ')[0]}
              photoAuthorId={photoCurrent?.authorId}
              photoComments={photoCurrent?.comments}
              photoId={photoCurrent?._id}
              photoLikes={photoCurrent?.likes}
              photoLoves={photoCurrent?.loves}
              photoSmiles={photoCurrent?.smiles}
              photoTitle={photoCurrent?.title}
              photoURL={photoCurrent?.url}
            />
            <PhotosMainContainer $isDarkMode={isDarkMode}>
              <PhotoInfoAndActions
                onImageUpload={onImageUpload}
                photosLayoutTitle={photosLayoutTitle}
              />
              <PhotoAlbums />
              <PhotoAlbumPhotos onImageUpload={onImageUpload} />
            </PhotosMainContainer>
          </>
        )}
      </ImageUploading>
    )
  );
};

export default PhotosLayout;

export const PhotosMainContainer = styled(Grid)<{ $isDarkMode?: boolean }>(({ $isDarkMode }) => [
  !$isDarkMode && tw`bg-gray-100`,
  !$isDarkMode && tw`px-2`,
  $isDarkMode && tw`bg-[#282c34]`,
  $isDarkMode && tw`px-1`,
  tw`mt-6`,
  tw`mx-2`,
  tw`pb-4`,
  tw`rounded-2xl`,
  tw`w-full`,
  tw`z-20`,
  tw`md:mt-2`,
  tw`md:mx-8`,
  tw`md:px-4`,
]);

