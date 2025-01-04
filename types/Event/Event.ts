import { User } from '../User/User';

export type Event = {
  _id: string;
  attendingUsers?: User[];
  declinedUsers?: User[];
  createdBy: User;
  date: string[];
  description: string;
  invitedUsers?: User[];
  location: string;
  photoAlbum?: string;
  posts?: any[];
  time?: string[];
  title: string;
};
