import {
  GlobalReducerAction,
  GlobalReducerActionEnum,
} from '../../../../../../context/GlobalReducer';
import { Albums } from '../../../../../../types';

export const handlePhotoAlbumEditClick = async ({
  dispatch,
  editingAlbumId,
  newAlbumCoverURL,
  newAlbumName,
  photoAlbums,
  setIsEditModalLoading,
  setIsModalOpen,
}: {
  dispatch: React.Dispatch<GlobalReducerAction>;
  editingAlbumId?: string;
  newAlbumCoverURL?: string;
  newAlbumName?: string;
  photoAlbumName?: string;
  photoAlbums?: Albums[];
  setIsEditModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<'delete' | 'edit' | undefined>>;
}) => {
  setIsEditModalLoading(true);

  await fetch('/api/album/update', {
    method: 'PUT',
    body: JSON.stringify({
      editingAlbumId,
      newAlbumName,
      newAlbumCoverURL,
    }),
  })
    .then(async res => {
      const albumResponse = await res.json();
      const albums = photoAlbums?.map((album, albumKey) => ({
        ...album,
        ...{
          albumName: albumResponse[albumKey].albumName,
          albumCoverURL: albumResponse[albumKey].albumCoverURL,
        },
      }));

      dispatch({
        type: GlobalReducerActionEnum.SET_ALBUMS,
        payload: {
          albums,
        },
      });
    })
    .catch(e => {
      console.log(e);
    });

  setIsEditModalLoading(false);
  setIsModalOpen(undefined);
};

export const handlePhotoEditClick = async ({
  newPhotoTitle,
  photoId,
  setIsEditModalLoading,
  setIsModalOpen,
}: {
  newPhotoTitle?: string;
  photoId?: string;
  setIsEditModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<'delete' | 'edit' | undefined>>;
}) => {
  setIsEditModalLoading(true);

  await fetch('/api/photo/update', {
    method: 'PUT',
    body: JSON.stringify({
      photoId,
      newPhotoTitle,
    }),
  }).catch(e => {
    console.log(e);
  });

  setIsEditModalLoading(false);
  setIsModalOpen(undefined);
};
