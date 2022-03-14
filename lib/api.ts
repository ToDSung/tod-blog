import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

export const POSTS_ROOT_NAME = '_posts';

type GetFullPath = {
  (path: string): string;
};

const getFullPath: GetFullPath = path => join(process.cwd(), path);

type GetPostFullSlugs = {
  (path?: string): string[];
};

export const getPostFullSlugs: GetPostFullSlugs = (path = POSTS_ROOT_NAME) => {
  const postsPath = getFullPath(path);
  const files = fs.readdirSync(postsPath);
  return files
    .map(file => {
      const fullPath = join(path, file);
      if (file.includes('.md')) return fullPath;

      return getPostFullSlugs(fullPath);
    })
    .flat();
};

type Items = {
  [key: string]: string;
};

type GetPostByPath = {
  (path: string, fields: string[]): Items;
};

export const getPostByPath: GetPostByPath = (path, fields = []) => {
  const fullPath = getFullPath(path);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      const slug = path.split('/').slice(1).join('/').replace(/\.md$/, '');
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
};

type GetAllPosts = {
  (field: string[]): Items[];
};

export const getAllPosts: GetAllPosts = (fields = []) => {
  const paths = getPostFullSlugs();
  const posts = paths
    .map(path => getPostByPath(path, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};
