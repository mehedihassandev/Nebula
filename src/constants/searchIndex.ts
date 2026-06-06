import { ISearchItem } from '../models/Search';
import { experience } from './experience';
import { projects } from './projects';
import { skills } from './skills';
import { menus } from './menu';

export const globalSearchIndex: ISearchItem[] = [];

// 1. Add Menus (File Routes)
menus.forEach(menu => {
  globalSearchIndex.push({
    id: `menu-${menu.path}`,
    title: menu.name,
    content: `Page route: src/app${menu.path}`,
    path: menu.path,
    type: 'page'
  });
});

// Settings is a special route not in menus array
globalSearchIndex.push({
  id: 'menu-settings',
  title: 'settings.json',
  content: 'Page route: src/app/settings',
  path: '/settings',
  type: 'page'
});

// 2. Add Experience
experience.forEach(exp => {
  globalSearchIndex.push({
    id: `exp-${exp.id}`,
    title: `Experience: ${exp.title} - ${exp.position}`,
    content: exp.description.join(' ') + ' ' + exp.highlights.map(h => h.title + ' ' + h.detail).join(' ') + ' ' + exp.skills.join(', '),
    path: '/experience',
    sectionId: `exp-${exp.id}`,
    type: 'content'
  });
});

// 3. Add Projects
projects.forEach(proj => {
  const cleanDescription = proj.description.replace(/\*\*/g, '').replace(/\\n/g, ' ');
  globalSearchIndex.push({
    id: `proj-${proj.id}`,
    title: `Project: ${proj.title}`,
    content: cleanDescription + ' ' + proj.technologies.join(', '),
    path: '/project',
    sectionId: `proj-${proj.id}`,
    type: 'content'
  });
});

// 4. Add Skills
skills.forEach(skill => {
  globalSearchIndex.push({
    id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    title: `Skill: ${skill.name}`,
    content: `Proficient in ${skill.name}. Used in various projects and experiences.`,
    path: '/about',
    sectionId: 'skills',
    type: 'content'
  });
});

// 5. Add Static Page Content (About, Contact, Home)
globalSearchIndex.push({
  id: 'about-intro',
  title: 'About Me: Introduction',
  content: 'Hello there! My name is Md. Mehedi Hassan, and I have a deep passion for coding. My journey into web development began in 2019...',
  path: '/about',
  type: 'content'
});

globalSearchIndex.push({
  id: 'about-hubar',
  title: 'About Me: Current Roles',
  content: 'Time travel to the present, where I am balancing impactful roles as a React Developer. At Hubar Tech Limited, I contribute heavily to creating enterprise solutions like the POS, PCM, and E-Bill systems. Concurrently, at 10 Billion, I build scalable, high-performance web and mobile platforms.',
  path: '/about',
  type: 'content'
});

globalSearchIndex.push({
  id: 'contact-socials',
  title: 'Contact: Get in Touch',
  content: 'Feel free to reach out to me via Email, LinkedIn, GitHub, Facebook, Twitter, WhatsApp, or Instagram.',
  path: '/contact',
  type: 'content'
});
