import { Photos } from '../index';

export type SelectedPhotoAlbum = {
  _id?: string;
  albumName?: string;
  photos?: Photos[] | undefined;
};
