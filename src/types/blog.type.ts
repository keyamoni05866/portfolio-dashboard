export type TBlogs = {
  _id: string;
  title: string;
  image: string;
  description: string;
};

export type TUpdateBlogs = {
  title?: string;
  image?: string;
  description?: string;
};
