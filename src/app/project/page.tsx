import ProjectsClient from './ProjectsClient';
import generatedProjects from '../../constants/generatedProjects.json';

export const metadata = {
  title: 'Projects | Nebula',
  description: 'Showcasing completed projects and repositories.',
};

export default async function Page() {
  const projects = generatedProjects as any[];

  return (
    <ProjectsClient projects={projects} />
  );
}
