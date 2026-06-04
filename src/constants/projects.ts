import { IProject } from "../models/Project";

export const projects: IProject[] = [
  {
    id: 1,
    title: 'knock knock',
    description:
      'Excited to share my latest project! Implemented secure user authentication with JSON Server Auth, efficient real-time data fetching using RTK Query, and seamless navigation with private/public routes and login persistence. Enhanced user experience with Infinite Scroll for continuous content updates, along with advanced cache updates for smooth and responsive interactions.',
    technologies: [
      'React',
      'JavaScript',
      'JSON Auth',
      'RTK Query',
      'Redux Toolkit',
      'Protected Routes',
      'Login Persistence',
      'Cache Updates',
      'Infinite Scroll',
      'Tailwind CSS'
    ],
    imgSrc: '/assets/knock_knock.gif',
    errorImgSrc: 'https://i.ibb.co/s2RZKn6/knock-knock.gif',
    links: [
      {
        title: 'GitHub',
        url: 'https://github.com/mehedihassandev/knock-knock.git'
      },
      {
        title: 'Live',
        url: 'https://knock-knock-message.netlify.app/'
      }
    ]
  },
  {
    id: 2,
    title: 'T-Shirt Customization',
    description:
      'This is the t-shirt customization project. Using this site you can design your t-shirt as you want. You can change the color, logo, structure and many more things. This is a very interesting project. I hope you will enjoy it.',
    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Frame Motion',
      'Three JS',
      'Valtio',
      'Maath'
    ],
    imgSrc: '/assets/t_shirt.gif',
    errorImgSrc: 'https://i.ibb.co/4ZmpdT4/t-shirt.gif',
    links: [
      {
        title: 'GitHub',
        url: 'https://github.com/mehedihassandev/tshirt-visualizer.git'
      },
      {
        title: 'Live',
        url: 'https://tshirt-visualizer.netlify.app/'
      }
    ]
  },
  {
    id: 3,
    title: 'Portfolio Project',
    description:
      'This is the portfolio project. When I built this app I was a beginner in Frame Motion, Three JS and Maath. I learned a lot of things from this project. I hope you will enjoy it. I will be happy if you give me some feedback about this project. I will try to improve it. Thank you.',
    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Frame Motion',
      'Three JS',
      'Maath'
    ],
    imgSrc: '/assets/portfolio.gif',
    errorImgSrc: 'https://i.ibb.co/8D6gDxb/portfolio.png',
    links: [
      {
        title: 'GitHub',
        url: 'https://github.com/mehedihassandev/portfolio.git'
      },
      {
        title: 'Live',
        url: 'https://three-js-portfolio-site.netlify.app/'
      }
    ]
  },
  {
    id: 4,
    title: 'Movie Site',
    description:
      'This is the movie site project. Using this site you can see the latest movies. You can see the movie details, rating, review and many more things. There I use free API to get movie list. I hope you will enjoy it.',
    technologies: [
      'React',
      'JavaScript',
      'TypeScript',
      'Material UI',
      'Free API'
    ],
    imgSrc: '/assets/movie.gif',
    errorImgSrc: 'https://i.ibb.co/4PznGJw/movie.gif',
    links: [
      {
        title: 'GitHub',
        url: 'https://github.com/mehedihassandev/movie-site.git'
      },
      {
        title: 'GitHub',
        url: 'https://movie-site-fawn.vercel.app/'
      }
    ]
  },
  {
    id: 5,
    title: 'CRUD Operation',
    description:
      'This is the CRUD operation project. Using this site you can create, read, update and delete the data. There I use free API to get data and update the data. Also use JSON server to store the data. I hope you will enjoy it.',
    technologies: [
      'React',
      'JavaScript',
      'TypeScript',
      'Material UI',
      'Free API',
      'JSON Server'
    ],
    imgSrc: '/assets/crud.gif',
    errorImgSrc: 'https://i.ibb.co/QjtC1kB/crud.gif',
    links: [
      {
        title: 'GitHub',
        url: 'https://github.com/mehedihassandev/crud-operation.git'
      },
      {
        title: 'Live',
        url: 'https://crud-operation-five-lime.vercel.app/'
      }
    ]
  }
];
