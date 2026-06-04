import { ROUTES } from './route-constant';
import { IMenu } from '../models/Menu';

export const menus: IMenu[] = [
  {
    path: ROUTES.HOME,
    name: 'home.tsx',
    icon: 'dash'
  },
  {
    path: ROUTES.ABOUT,
    name: 'about.tsx',
    icon: 'dash'
  },
  {
    path: ROUTES.EXPERIENCE,
    // name: "Education & Experience",
    name: 'experience.json',
    icon: 'dash'
  },
  {
    path: ROUTES.PROJECT,
    name: 'projects.ts',
    icon: 'dash'
  },
  {
    path: ROUTES.CONTACT,
    name: 'contact.css',
    icon: 'dash'
  }
];
