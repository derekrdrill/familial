export type Reaction = {
  authorId: string;
  authorName: string;
  authorAvatarUrl?: string;
  comment?: { date: string; text: string };
};
