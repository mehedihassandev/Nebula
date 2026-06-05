export type FeaturedProjectConfig =
  | string
  | { name: string; imgSrc?: string; errorImgSrc?: string };

export const featuredProjects: FeaturedProjectConfig[] = [
  'Family-Grocery-List',
  { name: 'knock-knock', imgSrc: '/assets/knock_knock.gif' },
  'Nebula',
  { name: 'tshirt-visualizer', imgSrc: '/assets/t_shirt.gif' },
  'International-Day',
  'pixel-craft',
  'dev-environment-setup',
  { name: 'movie-site', imgSrc: '/assets/movie.gif' },
  { name: 'portfolio', imgSrc: '/assets/portfolio.gif' },
  'eCommerce-nextjs',
  'e-commerce',
  'BauhausClock',
  'dnd-gallary',
  'shihab-nextjs'
];
