import { IProject } from "../models/Project";

export const projects: IProject[] = [
  {
    id: 1,
    title: 'knock knock',
    year: '2024',
    description:
      '**Purpose**: Designed to serve as a robust, real-time messaging and social platform.\\n\\n**Problem solved**: Building a chat application that feels truly instantaneous without overwhelming the device is a major technical hurdle. This project addresses the need for secure, seamless user interactions by implementing persistent JWT-based authentication and advanced data caching. By intelligently managing data fetching during infinite scrolling, it ensures users never experience frustrating lag or unnecessary loading screens while reading long conversation histories.',
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
    year: '2023',
    description:
      '**Purpose**: Created to provide an interactive, 3D product customization experience for e-commerce stores.\\n\\n**Problem solved**: Online shoppers often hesitate to buy customized apparel because static images make it impossible to truly visualize the final product. This application completely solves the challenge of static product imagery. By allowing users to dynamically modify colors, upload their own logos, and instantly view those changes wrapped around a realistic 3D model in real-time, it significantly boosts user engagement and gives buyers the confidence they need to complete their purchase.',
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
    year: '2023',
    description:
      '**Purpose**: Built to act as a deeply interactive, visually stunning digital resume and showcase for my development skills.\\n\\n**Problem solved**: In a sea of developers, traditional resume websites often fail to stand out to recruiters and clients. This project overcomes that hurdle by breaking away from standard 2D layouts. By integrating 3D elements and smooth, physics-based animations, it creates a memorable, immersive experience that immediately captures attention and practically demonstrates advanced frontend capabilities rather than just talking about them.',
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
    year: '2023',
    description:
      '**Purpose**: Developed to provide users with a clean, intuitive platform for discovering and reviewing the latest cinematic releases.\\n\\n**Problem solved**: Finding reliable information on new movies can be frustrating when dealing with slow, cluttered, or ad-heavy entertainment websites. This platform organizes scattered movie data into a centralized, easily navigable dashboard. It solves the issue of poor user experience by providing instant, beautifully formatted access to ratings, reviews, and dynamic metadata through an optimized UI that respects user time.',
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
    year: '2023',
    description:
      '**Purpose**: Created as a foundational data management dashboard to demonstrate robust full-stack data handling capabilities.\\n\\n**Problem solved**: Administrative panels are the backbone of most businesses, but they often suffer from data desynchronization where the screen shows outdated information after an edit. This project addresses the critical need for reliable, secure data manipulation (Create, Read, Update, Delete). By strictly typing payloads and gracefully handling asynchronous API state changes, it prevents data errors and ensures the dashboard always reflects the absolute truth of the database.',
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
