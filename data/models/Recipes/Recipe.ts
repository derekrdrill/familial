import mongoose from 'mongoose';

export const RecipeSchema = new mongoose.Schema({
  author: String,
  authorId: String,
  cookbook: String,
  ingredients: [
    {
      ingredient: String,
      ingredientMeasurement: String,
      ingredientQuantity: Number,
    },
  ],
  imageUrl: String,
  likes: [
    {
      authorId: String,
      authorName: String,
      authorAvatarUrl: String,
      comment: { date: String, text: String },
    },
  ],
  steps: [{ step: String }],
  temperature: String,
  time: String,
  title: String,
  type: String,
  uploadedAt: Date,
});

const Recipe =
  mongoose.models?.recipe || mongoose.model('recipe', RecipeSchema);

export default Recipe;
