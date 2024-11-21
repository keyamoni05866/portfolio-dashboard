export type TProjects = {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  image: string;
  liveLink: string;
  clientRepo: string;
  serverRepo: string;
  credentials?: string[];
};
