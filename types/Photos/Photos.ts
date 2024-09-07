import { PhotoReaction } from './PhotoReaction';

export type Photos = {
  _id: string;
  albumID: string;
  albumName: string;
  authorId: string;
  authorName: string;
  bio?: string;
  comments?: PhotoReaction[];
  likes?: PhotoReaction[];
  loves?: PhotoReaction[];
  smiles?: PhotoReaction[];
  title: string;
  uploadedAt: Date;
  url: string;
};
