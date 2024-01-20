import { Photos } from '../index';

export type SelectedPhotoAlbum = {
  albumName?: string;
  photos?: Photos[] | undefined;
};
