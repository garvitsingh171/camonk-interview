// This file defines the shape of our Blog data
// TypeScript will use this to check if we're using the right data types

export interface Blog {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

// This is for creating a new blog (no id needed, server generates it)
export interface CreateBlogInput {
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}