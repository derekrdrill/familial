import mongoose from 'mongoose';

export const RecipeSchema = new mongoose.Schema({
  author: String,
  cookbook: String,
  ingredients: [String],
  steps: [String],
  temperature: String,
  time: String,
  title: String,
  type: String,
  uploadedAt: Date,
});

const Recipe =
  mongoose.models?.recipe || mongoose.model('recipe', RecipeSchema);

export default Recipe;
