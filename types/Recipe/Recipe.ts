export type Recipe = {
  _id: string;
  author: string;
  cookbook: string;
  ingredients: string[];
  steps: string[];
  temperature: string;
  time: string;
  title: string;
  uploadedAt: Date;
};
