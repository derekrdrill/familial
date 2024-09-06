import { Photos } from '../Photos/Photos';

export type Albums = {
  _id: string;
  albumName: string;
  authorId?: string;
  photos?: Photos[];
};
