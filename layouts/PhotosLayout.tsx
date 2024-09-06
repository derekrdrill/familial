import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';
import { Button, Grid, TextField } from '@mui/material';

import AddAPhotoTwoTone from '@mui/icons-material/AddAPhotoTwoTone';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';

import GlobalContext from '../context/GlobalContext';

import PhotoUploader from '../components/common/PhotoUploader';
import {
  PhotoAlbumsBackButton,
  PhotoViewer,
} from '../components/familial/Photos';
import { Albums, Photos } from '../types';
import { GlobalReducerActionEnum } from '../context/GlobalReducer';

import { DrillyTypography } from '../styles/globals';

type PhotosLayoutProps = {
  albumsData: Albums[];
  children: React.ReactNode;
  onImageUpload: () => void;
  photosData: Photos[];
  photosLayoutTitle: string;
  photoAlbumLength?: number;
};

const PhotosLayout = ({
  albumsData,
  children,
  onImageUpload,
  photoAlbumLength,
  photosData,
  photosLayoutTitle,
}: PhotosLayoutProps) => {
  const router = useRouter();

  const {
    dispatch,
    state: { isDarkMode, photoList, photosView },
  } = React.useContext(GlobalContext);

  const [isScrollBtnShown, setIsScrollBtnShown] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_ALBUMS,
      payload: { albums: albumsData },
    });
  }, [albumsData]);

  React.useEffect(() => {
    dispatch({
      type: GlobalReducerActionEnum.SET_PHOTOS,
      payload: { photos: photosData },
    });
  }, [photosData]);

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

  // console.log(photoCurrent);

  return (
    <>
      <PhotoAlbumsBackButton />
      <PhotoUploader />
      <PhotoViewer
        isPhotoViewerOpen={!!router.query.p}
        photoId={photoCurrent?._id}
        photoLikes={photoCurrent?.likes}
        photoLoves={photoCurrent?.loves}
        photoSmiles={photoCurrent?.smiles}
        photoTitle={photoCurrent?.title}
        photoURL={photoCurrent?.url}
      />
      <PhotosMainContainer $isDarkMode={isDarkMode}>
        <PhotoInfoAndActionsContainer item xs={12} $isDarkMode={isDarkMode}>
          <Grid container justifyContent='space-between'>
            <PhotosLayoutTitleContainer item $isAlbumOpened={!!!router.query.albumID}>
              <div tw='flex flex-col gap-2'>
                <DrillyTypography variant='h5' $isDarkMode={isDarkMode}>
                  {photosLayoutTitle}
                </DrillyTypography>
                {photoAlbumLength && (
                  <DrillyTypography
                    variant='subtitle1'
                    $isDarkMode={isDarkMode}
                  >{`${photoAlbumLength} photo${photoAlbumLength === 1 ? '' : 's'}`}</DrillyTypography>
                )}
                {isScrollBtnShown && (
                  <PhotoAddButton
                    onClick={onImageUpload}
                    startIcon={<AddAPhotoTwoTone />}
                    variant='outlined'
                    $bgColor={tw`bg-info hover:bg-info`}
                    $borderColor={tw`border-info hover:border-info`}
                    $textColor={tw`text-info hover:text-info`}
                  >
                    Add to album
                  </PhotoAddButton>
                )}
              </div>
            </PhotosLayoutTitleContainer>
            {!photoAlbumLength && (
              <Button
                color='info'
                onClick={() => {
                  dispatch({
                    type: GlobalReducerActionEnum.SET_MODAL_ITEM,
                    payload: {
                      modalItem: {
                        handleSubmit: async () => {
                          const newAlbumName = (
                            document.getElementById('album') as HTMLInputElement
                          )?.value;

                          await fetch('/api/album/add', {
                            method: 'POST',
                            body: newAlbumName,
                          })
                            .then(async res => {
                              const newAlbums = await res.json();

                              dispatch({
                                type: GlobalReducerActionEnum.SET_ALBUMS,
                                payload: { albums: newAlbums },
                              });
                            })
                            .catch(e => {
                              console.log(e);
                            });
                        },
                        isExitHidden: true,
                        isModalOpen: true,
                        modalBody: (
                          <TextField
                            id='album'
                            fullWidth
                            placeholder='Enter album name'
                            size='small'
                            variant='outlined'
                          />
                        ),
                        modalTitle: 'Add new album',
                        submitSuccessMessage: (
                          <>
                            <DrillyTypography variant='subtitle1' $isDarkMode={isDarkMode}>
                              New album added!
                            </DrillyTypography>
                            <DrillyTypography variant='subtitle2' $isDarkMode={isDarkMode}>
                              Album will not appear here until photos are added
                            </DrillyTypography>
                          </>
                        ),
                      },
                    },
                  });
                }}
                startIcon={<PhotoSizeSelectActualTwoToneIcon />}
                tw='mt-2 normal-case'
                variant={isDarkMode ? 'outlined' : 'text'}
              >
                Add album
              </Button>
            )}
            {photoAlbumLength && (
              <Grid item>
                <Grid container spacing={1} justifyContent='flex-end'>
                  <Grid item xs={7} md={6}>
                    <PhotosViewButton
                      fullWidth
                      onClick={() =>
                        dispatch({
                          type: GlobalReducerActionEnum.SET_PHOTOS_VIEW,
                          payload: { photosView: 'grid' },
                        })
                      }
                      startIcon={<AppsIcon />}
                      $isActive={photosView === 'grid'}
                    >
                      Grid
                    </PhotosViewButton>
                  </Grid>
                  <Grid item xs={7} md={6}>
                    <PhotosViewButton
                      fullWidth
                      onClick={() =>
                        dispatch({
                          type: GlobalReducerActionEnum.SET_PHOTOS_VIEW,
                          payload: { photosView: 'list' },
                        })
                      }
                      startIcon={<ListIcon />}
                      $isActive={photosView === 'list'}
                    >
                      List
                    </PhotosViewButton>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </PhotoInfoAndActionsContainer>
        {children}
      </PhotosMainContainer>
    </>
  );
};

export default PhotosLayout;

export const PhotoAddButton = styled(Button)<{
  $bgColor: TwStyle;
  $borderColor: TwStyle;
  $textColor: TwStyle;
}>(({ $bgColor, $borderColor, $textColor }) => [
  tw`!bg-opacity-20`,
  tw`normal-case`,
  tw`shadow-none`,
  tw`hover:!bg-opacity-30`,
  tw`hover:shadow-none`,
  $bgColor,
  $borderColor,
  $textColor,
]);

export const PhotoInfoAndActionsContainer = styled(Grid)<{
  $isDarkMode?: boolean;
}>(({ $isDarkMode }) => [
  !$isDarkMode && tw`bg-gray-100`,
  $isDarkMode && tw`bg-black`,
  tw`py-4`,
  tw`sticky`,
  tw`top-20`,
  tw`z-20`,
  tw`lg:top-16`,
]);

export const PhotosLayoutTitleContainer = styled(Grid)<{
  $isAlbumOpened: boolean;
}>(({ $isAlbumOpened }) => [
  $isAlbumOpened && tw`flex`,
  $isAlbumOpened && tw`[align-items: flex-end]`,
]);

export const PhotosMainContainer = styled(Grid)<{ $isDarkMode?: boolean }>(
  ({ $isDarkMode }) => [
    !$isDarkMode && tw`bg-gray-100`,
    $isDarkMode && tw`bg-transparent`,
    tw`mt-6`,
    tw`mx-2`,
    tw`pb-4`,
    tw`px-4`,
    tw`rounded-2xl`,
    tw`w-full`,
    tw`z-20`,
    tw`md:mt-2`,
    tw`md:mx-8`,
  ],
);

export const PhotosViewButton = styled(Button)<{
  $isActive?: boolean;
}>(({ $isActive }) => [
  tw`hover:bg-gray-200`,
  tw`bg-gray-300`,
  tw`opacity-60`,
  tw`text-gray-800`,
  tw`normal-case`,
  $isActive && tw`bg-purple-600`,
  $isActive && tw`hover:bg-purple-500`,
  $isActive && tw`hover:text-purple-200`,
  $isActive && tw`text-purple-200`,
]);
