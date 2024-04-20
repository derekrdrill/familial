import React from 'react';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { Grid, Typography } from '@mui/material';
import ImageUploading, { ImageListType as PhotoListType } from 'react-images-uploading';
import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone';

import GlobalContext from '../../../context/GlobalContext';
import PhotosLayout from '../../../layouts/PhotosLayout';

import { PhotoCover } from '../../../components/drill-y/Photos';

import { GlobalReducerAction, GlobalReducerActionEnum } from '../../../context/GlobalReducer';

import conn from '../../../data/connection';
import { Albums as AlbumsData, Photos as PhotosData } from '../../../data/models';
import { Albums, Photos as PhotosType } from '../../../context/types';

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

const AlbumIDIndex = ({ albumsData, albumName, photosData }: AlbumIDIndexProps) => {
  const router = useRouter();

  const {
    dispatch,
    state: { photoList, photosView },
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_SELECTED_PHOTO_ALBUM,
      payload: { selectedPhotoAlbum: albumsData.find(album => album._id === router.query.albumID) },
    });
  }, [albumsData]);

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
            onChange={photoListData => handlePhotoUploadingChange(photoListData, dispatch)}
            value={photoList}
          >
            {({ onImageUpload }) => (
              <PhotoUploaderTile
                item
                onClick={onImageUpload}
                xs={photosView === 'list' ? 12 : 6}
                sm={photosView === 'list' ? 12 : 4}
                md={photosView === 'list' ? 12 : 3}
                lg={photosView === 'list' ? 12 : 2}
                $photosView={photosView}
              >
                <PhotoAlbumsAddTextContainer
                  container
                  $photosView={photosView}
                  justifyContent={photosView === 'list' ? 'center' : 'flex-start'}
                  tw='w-full'
                >
                  <Typography variant='subtitle2'>
                    Add to album <AddAPhotoTwoToneIcon />
                  </Typography>
                </PhotoAlbumsAddTextContainer>
              </PhotoUploaderTile>
            )}
          </ImageUploading>
        )}
        {photosData?.map(photoListItem => (
          <Grid
            item
            xs={photosView === 'list' ? 12 : 6}
            sm={photosView === 'list' ? 12 : 4}
            md={photosView === 'list' ? 12 : 3}
            lg={photosView === 'list' ? 12 : 2}
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
        ))}
      </Grid>
    </PhotosLayout>
  );
};

export default AlbumIDIndex;

export const PhotoAlbumsAddTextContainer = styled(Grid)<{ $photosView?: 'grid' | 'list' }>(
  ({ $photosView }) => [
    tw`bg-gray-200`,
    tw`cursor-pointer`,
    tw`h-full`,
    tw`hover:opacity-80`,
    tw`rounded-2xl`,
    $photosView === 'grid' && tw`pt-3`,
    $photosView === 'grid' && tw`pl-3`,
    $photosView === 'list' && tw`pt-6`,
    $photosView === 'list' && tw`pb-6`,
  ],
);

export const PhotosMainContainer = styled(Grid)([tw`bg-gray-100`, tw`p-4`, tw`rounded-2xl`]);

export const PhotoUploaderTile = styled(Grid)<{ $photosView?: 'grid' | 'list' }>(
  ({ $photosView }) => [
    tw`md:mx-2`,
    tw`mt-8`,
    tw`mb-2`,
    $photosView === 'list' && tw`sm:mx-16`,
    $photosView === 'list' && tw`md:mx-40`,
    $photosView === 'list' && tw`lg:mx-48`,
  ],
);

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

    return {
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
