import React from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import GlobalContext from '../../../../../../context/GlobalContext';
import { GlobalReducerActionEnum } from '../../../../../../context/GlobalReducer';

import { PhotoCoverModalSubmitButton } from './PhotoCoverModalSubmitButton';
import { DrillyTypography } from '../../../../../../styles/globals';

type PhotoCoverDeleteContentProps = {
  photoAlbumName?: string;
  photoId?: string;
  photoURL?: string;
};

export const PhotoCoverDeleteContent = ({
  photoAlbumName,
  photoId,
  photoURL,
}: PhotoCoverDeleteContentProps) => {
  const router = useRouter();

  const {
    dispatch,
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  return (
    <>
      <div tw='px-6'>
        <DrillyTypography variant='body1' component='h1' $isDarkMode={isDarkMode}>
          {`Are you sure you want to delete ${router.query.albumID ? `this photo from the ${photoAlbumName}` : `the ${photoAlbumName}`} album?`}
        </DrillyTypography>
        {router.query.albumID ? (
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <Grid container justifyContent='center'>
                <img src={photoURL} width='120' />
              </Grid>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        ) : (
          <DrillyTypography tw='mt-2' component='p' variant='body2' $isDarkMode={isDarkMode}>
            Removing the album will delete all photos in the album
          </DrillyTypography>
        )}
      </div>
      <PhotoCoverModalSubmitButton
        buttonText='Yes, delete'
        handleSubmit={async () => {
          if (!!router.query.albumID) {
            setIsDeleteLoading(true);

            await fetch('/api/photo/delete', {
              method: 'DELETE',
              body: JSON.stringify({ albumName: photoAlbumName, photoId }),
            })
              .then(async res => {
                const newPhotos = await res.json();

                dispatch({
                  type: GlobalReducerActionEnum.SET_PHOTOS,
                  payload: { photos: newPhotos },
                });
              })
              .catch(e => {
                console.log(e);
              });

            setIsDeleteLoading(false);
          } else {
            setIsDeleteLoading(true);

            await fetch('/api/album/delete', {
              method: 'DELETE',
              body: photoAlbumName,
            })
              .then(async res => {
                const newAlbums = await res.json();

                dispatch({
                  type: GlobalReducerActionEnum.SET_ALBUMS,
                  payload: { albums: newAlbums },
                });
              })
              .then(() => router.reload())
              .catch(e => {
                console.log(e);
              });

            setIsDeleteLoading(false);
          }
        }}
        isModalLoading={isDeleteLoading}
        variant='error'
      />
    </>
  );
};
