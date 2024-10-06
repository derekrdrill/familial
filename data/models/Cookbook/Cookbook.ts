import mongoose from 'mongoose';

export const CookbookSchema = new mongoose.Schema({
  author: String,
  authorId: String,
  lastUpdated: Date,
  title: String,
  uploadedAt: Date,
});

const Cookbook =
  mongoose.models?.cookbook || mongoose.model('cookbook', CookbookSchema);

export default Cookbook;
