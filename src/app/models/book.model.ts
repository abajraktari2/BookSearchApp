export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publishedDate: string;
  ISBN: string;
  value: string;
  coverUrl: string;
  authorWebsite: string;
  highResCoverUrl: string;
  showHighResImage: boolean;
  covers: string[];
  publishedYear?: string;
  publishers?: string;
  numberOfPages?: string;
}
