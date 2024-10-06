export type Notification = {
  _id: string;
  contentId: string;
  contentImageUrl: string;
  contentType: string;
  from: string;
  fromAvatarUrl: string;
  fromId: string;
  notification: string;
  notificationType: 'comment' | 'like' | 'love' | 'smile';
  seen: boolean;
  to: string;
  toId: string;
  uploadedAt: string;
};
