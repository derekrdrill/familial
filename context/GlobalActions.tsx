import { GlobalReducerActionEnum } from './GlobalReducer';
import { Albums } from '../types';
import conn from '../data/connection';
import { Albums as AlbumsModel } from '../data/models';

export type SetAlbums = {
  type: GlobalReducerActionEnum.SET_ALBUMS;
  payload: { albums: Albums[] };
};

export const getAlbums = async (): Promise<Albums[]> => {
  await conn();
  const albums = await AlbumsModel.find();
  return albums;
};

export const setAlbums = async (albums: Albums[]): Promise<SetAlbums> => ({
  type: GlobalReducerActionEnum.SET_ALBUMS,
  payload: {
    albums: albums,
  },
});
