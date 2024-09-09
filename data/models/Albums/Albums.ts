import mongoose from 'mongoose';

export const AlbumsSchema = new mongoose.Schema({
  albumCoverURL: String,
  albumName: String,
  authorId: String,
});

const Albums = mongoose.models?.albums || mongoose.model('albums', AlbumsSchema);
export default Albums;
