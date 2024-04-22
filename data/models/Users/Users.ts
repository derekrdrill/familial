import mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  userID: String,
  userName: String,
});

export const Users = mongoose.models?.users || mongoose.model('users', UsersSchema);
