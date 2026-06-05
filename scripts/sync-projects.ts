import fs from 'fs';
import path from 'path';

// Using require to load the constants because we're in a Node script
// Since they are TS modules, we can try to extract the arrays using Regex if we don't want to mess with TS compilation.
// However, since we run this with `tsx`, we can just import them natively!
import { featuredProjects } from '../src/constants/featuredProjects';
import { projects as manualProjects } from '../src/constants/projects';

const USERNAME = 'mehedihassandev';

const KNOWN_TECHNOLOGIES: Record<string, string> = {
  'react': 'React',
  'react-native': 'React Native',
  'next': 'Next.js',
  'tailwindcss': 'Tailwind CSS',
  'redux': 'Redux',
  '@reduxjs/toolkit': 'Redux Toolkit',
  'typescript': 'TypeScript',
  'express': 'Express',
  'mongoose': 'Mongoose',
  'firebase': 'Firebase',
  'framer-motion': 'Framer Motion',
  '@mui/material': 'Material UI',
  'three': 'Three.js',
  'socket.io': 'Socket.io',
  'mongodb': 'MongoDB',
  'stripe': 'Stripe',
  'graphql': 'GraphQL',
  'apollo-client': 'Apollo',
  'react-query': 'React Query',
  '@tanstack/react-query': 'React Query',
  'styled-components': 'Styled Components',
  'sass': 'Sass',
  'zustand': 'Zustand',
  'json-server': 'JSON Server'
};

const extractTechnologies = (packageJson: any): string[] => {
  if (!packageJson) return [];
  const deps = { ...(packageJson.dependencies || {}), ...(packageJson.devDependencies || {}) };
  const techs = new Set<string>();
  
  for (const dep of Object.keys(deps)) {
    if (KNOWN_TECHNOLOGIES[dep]) {
      techs.add(KNOWN_TECHNOLOGIES[dep]);
    }
  }
  
  return Array.from(techs);
};

const extractDescription = (readme: string): string => {
  if (!readme) return 'No description provided.';
  const lines = readme.split('\n');
  for (const line of lines) {
    const cleanLine = line.trim();
    // Skip empty lines, headers, badges, and HTML comments
    if (
      cleanLine &&
      !cleanLine.startsWith('#') &&
      !cleanLine.startsWith('!') &&
      !cleanLine.startsWith('[') &&
      !cleanLine.startsWith('<') &&
      cleanLine.length > 20 // usually a real paragraph has some length
    ) {
      return cleanLine;
    }
  }
  return 'No description provided.';
};

const fetchFileFromRepo = async (repoName: string, fileName: string) => {
  for (const branch of ['main', 'master']) {
    try {
      const res = await fetch(`https://raw.githubusercontent.com/${USERNAME}/${repoName}/${branch}/${fileName}`);
      if (res.ok) {
        return await res.text();
      }
    } catch (e) {
      // ignore
    }
  }
  return null;
};

const run = async () => {
  console.log('Fetching repositories from GitHub...');
  let allRepos: any[] = [];
  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`);
    if (!res.ok) throw new Error('Failed to fetch repositories');
    allRepos = await res.json();
  } catch (error) {
    console.error('Error fetching repos:', error);
    process.exit(1);
  }

  const generatedProjects = [];

  for (const item of featuredProjects) {
    const repoName = typeof item === 'string' ? item : item.name;
    const configImgSrc = typeof item === 'string' ? undefined : item.imgSrc;
    const configErrorImgSrc = typeof item === 'string' ? undefined : item.errorImgSrc;

    console.log(`Processing: ${repoName}`);
    const repo = allRepos.find((r: any) => r.name === repoName);
    if (!repo) {
      console.warn(`Repo ${repoName} not found on GitHub.`);
      continue;
    }

    // Fetch package.json
    let technologies: string[] = [];
    const packageJsonContent = await fetchFileFromRepo(repoName, 'package.json');
    if (packageJsonContent) {
      try {
        const pkg = JSON.parse(packageJsonContent);
        technologies = extractTechnologies(pkg);
      } catch (e) {
        console.warn(`Could not parse package.json for ${repoName}`);
      }
    }
    
    // Fallback to github topics or language if nothing matched
    if (technologies.length === 0) {
      if (repo.topics && repo.topics.length > 0) {
        technologies = repo.topics.map((t: string) => t.charAt(0).toUpperCase() + t.slice(1));
      } else if (repo.language) {
        technologies = [repo.language];
      }
    }

    // Fetch README.md
    let description = repo.description;
    const readmeContent = await fetchFileFromRepo(repoName, 'README.md') || await fetchFileFromRepo(repoName, 'readme.md');
    if (readmeContent) {
      const parsedDesc = extractDescription(readmeContent);
      if (parsedDesc !== 'No description provided.') {
        description = parsedDesc;
      }
    }

    const links = [{ title: 'GitHub', url: repo.html_url }];
    if (repo.homepage) {
      links.push({ title: 'Live', url: repo.homepage });
    }

    // Check if we have a manual project that matches this github repo to use its custom image
    let matchedManualProject = manualProjects.find((mp: any) => 
      mp.links.some((l: any) => l.url.includes(repo.name)) || 
      mp.title.toLowerCase().replace(/[- ]/g, '') === repo.name.toLowerCase().replace(/[- ]/g, '')
    );

    generatedProjects.push({
      id: repo.id,
      title: repo.name,
      description: description || 'No description provided.',
      technologies,
      imgSrc: configImgSrc || matchedManualProject?.imgSrc || `https://opengraph.githubassets.com/1/${USERNAME}/${repo.name}`,
      errorImgSrc: configErrorImgSrc || matchedManualProject?.errorImgSrc || 'https://i.ibb.co/8D6gDxb/portfolio.png',
      links
    });
  }

  console.log('Merging with manual projects...');
  // Find manual projects not in the featured list
  for (const manualProject of manualProjects) {
    const isAlreadyIncluded = generatedProjects.some((gp: any) => 
      gp.title.toLowerCase() === manualProject.title.toLowerCase() ||
      gp.title.toLowerCase().replace(/[- ]/g, '') === manualProject.title.toLowerCase().replace(/[- ]/g, '') ||
      gp.links.some((l: any) => manualProject.links.some((ml: any) => ml.url.replace('.git', '') === l.url.replace('.git', '')))
    );
    if (!isAlreadyIncluded) {
      console.log(`Adding manual project: ${manualProject.title}`);
      generatedProjects.push(manualProject);
    }
  }

  const outputPath = path.join(process.cwd(), 'src/constants/generatedProjects.json');
  fs.writeFileSync(outputPath, JSON.stringify(generatedProjects, null, 2));
  console.log(`Success! Saved ${generatedProjects.length} projects to ${outputPath}`);
};

run();
