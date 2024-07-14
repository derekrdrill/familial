import React from 'react';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Button, Grid } from '@mui/material';
import ImageUploading, { ImageListType as PhotoListType } from 'react-images-uploading';
import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone';

import conn from '../../../data/connection';
import { Albums as AlbumsData, Photos as PhotosData } from '../../../data/models';
import { Albums, Photos as PhotosType } from '../../../context/types';

import GlobalContext from '../../../context/GlobalContext';
import { GlobalReducerAction, GlobalReducerActionEnum } from '../../../context/GlobalReducer';

import PhotosLayout from '../../../layouts/PhotosLayout';
import { PhotoCover } from '../../../components/drill-y/Photos';
import { DrillyTypography } from '../../../styles/globals';

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

type AlbumIDIndexProps = {
  albumsData: Albums[];
  albumName: string;
  photosData: PhotosType[];
};

const AlbumIDIndex = ({
  albumsData,
  albumName,
  photosData,
}: AlbumIDIndexProps) => {
  const router = useRouter();

  const {
    dispatch,
    state: { isDarkMode, photoList, photosView },
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_SELECTED_PHOTO_ALBUM,
      payload: {
        selectedPhotoAlbum: albumsData.find(
          album => album._id === router.query.albumID,
        ),
      },
    });
  }, [albumsData]);

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

  return (
    <PhotosLayout
      albumsData={albumsData}
      photoAlbumLength={photosData.length}
      photosData={photosData}
      photosLayoutTitle={albumName}
    >
      <Grid container>
        {photoList && (
          <ImageUploading
            multiple
            onChange={photoListData =>
              handlePhotoUploadingChange(photoListData, dispatch)
            }
            value={photoList}
          >
            {({ onImageUpload }) =>
              photosView === 'list' ? (
                <Button
                  endIcon={<AddAPhotoTwoToneIcon />}
                  fullWidth
                  onClick={onImageUpload}
                  variant='outlined'
                  tw='!bg-opacity-20 hover:!bg-opacity-30 mt-6 hover:shadow-none shadow-none bg-info hover:bg-info border-info hover:border-info text-info'
                >
                  Add to album
                </Button>
              ) : (
                <PhotoUploaderTile
                  item
                  onClick={onImageUpload}
                  xs={6}
                  sm={4}
                  md={3}
                  xl={2}
                  $photosView={photosView}
                >
                  <PhotoAlbumsAddTextContainer
                    container
                    tw='w-full'
                    $isDarkMode={isDarkMode}
                    $photosView={photosView}
                  >
                    <DrillyTypography
                      variant='subtitle2'
                      $isDarkMode={isDarkMode}
                    >
                      Add to album <AddAPhotoTwoToneIcon />
                    </DrillyTypography>
                  </PhotoAlbumsAddTextContainer>
                </PhotoUploaderTile>
              )
            }
          </ImageUploading>
        )}
        {photosData?.map(photoListItem => (
          <>
            {photosView === 'list' && (
              <Grid
                item
                xs={1}
                md={3}
                xl={4}
                display={{ xs: 'none', sm: 'inline-block' }}
              />
            )}
            <Grid
              item
              xs={photosView === 'list' ? 12 : 6}
              sm={photosView === 'list' ? 10 : 4}
              md={photosView === 'list' ? 6 : 3}
              xl={photosView === 'list' ? 4 : 2}
              tw='flex justify-center'
            >
              <Grid container>
                <PhotoCover
                  key={photoListItem._id}
                  photoListItem={photoListItem}
                  photoURL={photoListItem.url}
                />
              </Grid>
            </Grid>
            {photosView === 'list' && (
              <Grid
                item
                xs={1}
                md={3}
                xl={4}
                display={{ xs: 'none', sm: 'inline-block' }}
              />
            )}
          </>
        ))}
      </Grid>
    </PhotosLayout>
  );
};

export default AlbumIDIndex;

export const PhotoAlbumsAddTextContainer = styled(Grid)<{
  $isDarkMode?: boolean;
  $photosView?: 'grid' | 'list';
}>(({ $isDarkMode, $photosView }) => [
  tw`cursor-pointer`,
  tw`h-full`,
  tw`hover:opacity-80`,
  tw`rounded-2xl`,
  !$isDarkMode && tw`bg-gray-200`,
  $isDarkMode && tw`bg-gray-900`,
  $photosView === 'grid' && tw`pt-3`,
  $photosView === 'grid' && tw`pl-3`,
  $photosView === 'list' && tw`pt-6`,
  $photosView === 'list' && tw`pb-6`,
]);

export const PhotosMainContainer = styled(Grid)([
  tw`bg-gray-100`,
  tw`p-4`,
  tw`rounded-2xl`,
]);

export const PhotoUploaderTile = styled(Grid)<{
  $photosView?: 'grid' | 'list';
}>(({ $photosView }) => [
  tw`mt-8`,
  tw`mb-2`,
  $photosView === 'list' && tw`sm:mx-16`,
  $photosView === 'list' && tw`md:mx-40`,
  $photosView === 'list' && tw`lg:mx-48`,
]);

export const getServerSideProps = async context => {
  try {
    await conn();

    const album = await AlbumsData.findOne({
      _id: new mongoose.Types.ObjectId(context.params.albumID),
    });

    const albums = await AlbumsData.find().sort({ albumName: 1 });

    const photos = await PhotosData.find({
      albumName: album.albumName,
    }).sort({ uploadedAt: -1 });

    const albumsMapped = albums.map(album => ({
      _id: album._id.toString(),
      albumName: album.albumName,
    }));

    const redirect = {
      redirect: !!!photos.length && {
        permanent: false,
        destination: '/photos',
      },
    };

    return {
      ...redirect,
      props: {
        albumsData: JSON.parse(JSON.stringify(albumsMapped)),
        albumName: album.albumName,
        photosData: JSON.parse(JSON.stringify(photos)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
