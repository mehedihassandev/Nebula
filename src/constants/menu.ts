import { ROUTES } from './route-constant';
import { IMenu } from '../models/Menu';

export const menus: IMenu[] = [
  {
    path: ROUTES.HOME,
    name: 'home.tsx',
    icon: 'react'
  },
  {
    path: ROUTES.ABOUT,
    name: 'about.tsx',
    icon: 'react'
  },
  {
    path: ROUTES.EXPERIENCE,
    name: 'experience.json',
    icon: 'json'
  },
  {
    path: ROUTES.PROJECT,
    name: 'projects.ts',
    icon: 'typescript'
  },
  {
    path: ROUTES.CONTACT,
    name: 'contact.css',
    icon: 'css'
  },
  {
    path: ROUTES.PACKAGE,
    name: 'package.json',
    icon: 'npm'
  },
  {
    path: ROUTES.README,
    name: 'README.md',
    icon: 'markdown'
  }
];
