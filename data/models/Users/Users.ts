import mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  avatarURL: String,
  firstName: String,
  isAdmin: Boolean,
  lastName: String,
  phoneNumber: String,
  userID: String,
  userName: String,
});

export const Users = mongoose.models?.users || mongoose.model('users', UsersSchema);
