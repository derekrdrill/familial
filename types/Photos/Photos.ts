import { Reaction } from '../../types';

export type Photos = {
  _id: string;
  albumID: string;
  albumName: string;
  authorId: string;
  authorName: string;
  bio?: string;
  comments?: Reaction[];
  likes?: Reaction[];
  loves?: Reaction[];
  smiles?: Reaction[];
  title: string;
  uploadedAt: Date;
  url: string;
};
