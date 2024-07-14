import mongoose from 'mongoose';

export const PhotosSchema = new mongoose.Schema({
  albumID: String,
  albumName: String,
  description: String,
  title: String,
  // uploadedByID: Number,
  // uploadedByString: String,
  uploadedAt: Date,
  url: String,
});

export const Photos = mongoose.models?.photos || mongoose.model('photos', PhotosSchema);
