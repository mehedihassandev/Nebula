export interface IProjectLink {
  title: string;
  url: string;
}

export interface IProject {
  id: number;
  title: string;
  year?: string;
  description: string;
  technologies: string[];
  imgSrc: string;
  errorImgSrc: string;
  links: IProjectLink[];
}
