import mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  contentId: String,
  contentImageUrl: String,
  contentType: String,
  from: String,
  fromAvatarUrl: String,
  fromId: String,
  notification: String,
  notificationType: String,
  seen: Boolean,
  to: String,
  toId: String,
  uploadedAt: Date,
});

const Notification =
  mongoose.models?.notifications || mongoose.model('notifications', NotificationSchema);

export default Notification;
