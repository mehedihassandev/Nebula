import { IExperience } from "../models/Experience";

export const experience: IExperience[] = [
  {
    id: 1,
    date: 'April 2024 - Present',
    title: 'Hubar Tech Limited',
    position: 'Frontend Developer',
    description: [
      'Hubar Tech is a software development company specializing in Telecoms Software, a sister company of UK-based Exos Systems Ltd.',
      'Create and maintain essential components inside the Redux and React Typescript frontend framework, which are essential to the functionality of the overall project. Working collaboratively with developers, designers, and product managers, we can ensure that user-centric design principles and diversity are prioritized in our development efforts by advocating for and implementing best practices in web accessibility.'
    ],
    highlights: [
      {
        title: 'Point of Sale (POS) System',
        detail:
          ': In my role, I contribute to the development of a robust POS system, employing Material UI, React.js, Redux, and Azure authentication to provide secure, scalable, and user-friendly solutions. Our NX monorepo architecture enables us to efficiently manage multiple applications within a single repository, streamlining development and maintenance processes.',
        additionalDetail: [
          'I work closely on critical features such as payment management, billing, till management, branch summary, validation reports, and bulk payments. My efforts are focused on creating intuitive, dynamic interfaces while optimizing performance. I’ve also played a key role in designing global components that can be reused across various apps within the system, enhancing consistency and maintainability.',
          'To streamline form handling, we implement useForm, ensuring efficient data management and validation across the system. My work is centered around delivering seamless transaction experiences, improving operational efficiency, and maintaining high standards of code quality and scalability.'
        ]
      },
      {
        title: 'Process Control Management (PCM) System',
        detail: ': The PCM system streamlines procedures, reduces errors, and increases production for companies in a variety of industries, improving operational efficiency.'
      },
      {
        title: 'Electronic Bill (E-Bill) System',
        detail: ': The E-Bill System simplifies billing processes, enabling electronic invoicing, payments, and record-keeping, fostering efficiency and convenience for businesses and customers.'
      },
      {
        title: 'My-care App',
        detail: ': The My-care App is a mobile application that provides a variety of telecommunication services, including mobile top-ups, bill payments, and more, all in one convenient location. It is a one-stop shop for all of your telecommunication needs.'
      },
      {
        title: 'EXOS system Ltd Website',
        detail: ': Created a dynamic company website using Vanilla JS, Tailwind CSS, and Vite for a modern, clean style and smooth interactive features.'
      }
    ],
    skills: [
      'React', 'React Native', 'Redux', 'JavaScript', 'Material UI', 'Azure', 'NX Monorepo', 'Tailwind CSS', 'Vite'
    ]
  },
  {
    id: 2,
    date: 'December 2024 - Present',
    title: '10 Billion',
    position: 'Frontend Developer',
    description: [
      '10Billion.org is a global organization dedicated to addressing the challenges and opportunities associated with the world’s growing human population.',
      'As a Frontend Developer, I develop and maintain dynamic web applications and mobile platforms using React and React Native. My focus is on creating scalable, high-performance, and responsive user interfaces that facilitate the organization’s core mission.'
    ],
    highlights: [],
    skills: ['React', 'React Native', 'JavaScript', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 3,
    date: 'July 2023 - April 2024',
    title: 'Hubar Tech Limited',
    position: 'Frontend Developer - Trainee',
    description: [
      'Started as a trainee working on the Point of Sale (POS) system using React.js, Material UI, Redux, and Azure authentication.',
      'Focused on creating dynamic, reusable components and streamlining forms for better data handling and validation across the PCM, E-Bill, and My-Care applications.'
    ],
    highlights: [],
    skills: ['React', 'Redux', 'JavaScript', 'Material UI']
  },
  {
    id: 4,
    date: 'July 2019 - December 2019',
    title: 'Creative IT Institute',
    position: 'Web Designer',
    description: [
      'Began my web development journey by acquiring foundational skills in web design. Designed and developed layouts, learning the core principles of responsive design and UI/UX.',
      'This experience laid the groundwork for my deep dive into JavaScript and frontend frameworks.'
    ],
    highlights: [],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
  }
];
