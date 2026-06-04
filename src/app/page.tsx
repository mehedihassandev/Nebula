import HomeClient from './HomeClient';
import generatedProjects from '../constants/generatedProjects.json';

export const metadata = {
  title: 'Md. Mehedi Hassan | Software Engineer',
  description: 'Portfolio of Md. Mehedi Hassan',
};

export default async function Page() {
  const projects = generatedProjects as any[];

  return (
    <HomeClient projectsCount={projects.length} />
  );
}
