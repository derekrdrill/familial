import mongoose from 'mongoose';

export const PhotosSchema = new mongoose.Schema({
  albumID: String,
  albumName: String,
  authorId: String,
  comments: [{ authorId: String, authorName: String, comment: { date: String, text: String } }],
  description: String,
  likes: [{ authorId: String, authorName: String }],
  loves: [{ authorId: String, authorName: String }],
  smiles: [{ authorId: String, authorName: String }],
  title: String,
  // uploadedByID: Number,
  // uploadedByString: String,
  uploadedAt: Date,
  url: String,
});

export const Photos = mongoose.models?.photos || mongoose.model('photos', PhotosSchema);
