import { Photos } from '../Photos/Photos';

export type Albums = {
  _id: string;
  albumCoverURL?: string;
  albumName: string;
  authorId?: string;
  photos?: Photos[];
};
