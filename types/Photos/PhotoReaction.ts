export type PhotoReaction = {
  authorId: string;
  authorName: string;
  authorAvatarUrl?: string;
  comment?: { date: string; text: string };
};
