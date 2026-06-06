import { ROUTES } from './route-constant';
import { IMenu } from '../models/Menu';

export const menus: IMenu[] = [
  {
    path: ROUTES.HOME,
    name: 'Home',
    icon: 'dash'
  },
  {
    path: ROUTES.ABOUT,
    name: 'About',
    icon: 'dash'
  },
  {
    path: ROUTES.EXPERIENCE,
    // name: "Education & Experience",
    name: 'Experience',
    icon: 'dash'
  },
  {
    path: ROUTES.PROJECT,
    name: 'Project',
    icon: 'dash'
  },
  {
    path: ROUTES.CONTACT,
    name: 'Contact',
    icon: 'dash'
  }
];
