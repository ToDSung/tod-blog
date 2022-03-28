import Author from './author';

type Post = {
  slug: string;
  title: string;
  image?: string;
  excerpt: string;
  date: string;
  author?: Author;
  labels: string[];
  content?: string;
};

export default Post;
