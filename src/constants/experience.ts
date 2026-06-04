import { IExperience } from "../models/Experience";

export const experience: IExperience[] = [
  {
    id: 1,
    date: 'June 2023 - Present',
    title: 'Hubar Tech Ltd. ',
    position: 'Junior Frontend Developer',
    description: [
      'Hubar Tech is a software development company that specializes in Telecoms Software. It is a sister company of UK-based Exos Systems Ltd.',
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
        detail:
          ': The PCM system streamlines procedures, reduces errors, and increases production for companies in a variety of industries, improving operational efficiency.'
      },
      {
        title: 'Electronic Bill (E-Bill) System',
        detail:
          ': The E-Bill System simplifies billing processes, enabling electronic invoicing, payments, and record-keeping, fostering efficiency and convenience for businesses and customers.'
      },
      {
        title: 'My-care App',
        detail:
          ': The My-care App is a mobile application that provides a variety of telecommunication services, including mobile top-ups, bill payments, and more, all in one convenient location. It is a one-stop shop for all of your telecommunication needs.'
      }
    ],
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'React Native',
      'Redux',
      'Material UI',
      'Tailwind CSS'
    ]
  }
];
