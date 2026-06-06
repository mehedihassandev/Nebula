export interface ISearchItem {
  id: string;
  title: string;
  content: string;
  path: string;
  sectionId?: string;
  type: 'page' | 'content';
}
