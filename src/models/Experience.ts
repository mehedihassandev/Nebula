export interface IExperienceHighlight {
  title: string;
  detail: string;
  additionalDetail?: string[];
}

export interface IExperience {
  id: number;
  date: string;
  title: string;
  position: string;
  description: string[];
  highlights: IExperienceHighlight[];
  skills: string[];
}
