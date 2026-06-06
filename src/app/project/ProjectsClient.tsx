'use client';
import { motion } from 'framer-motion';
import { Fragment, useState, useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import { IoMdArrowDropright } from 'react-icons/io';
import tailwindConfig from '../../../tailwind.config';

import { IProject, IProjectLink } from '@models/Project';
import { IntelliSenseTooltip } from '@components/IntelliSenseTooltip';

/**
 * Renders the Projects gallery to showcase completed work.
 * This view exists to provide tangible proof of development capabilities,
 * allowing users to view project details, screenshots, and live links.
 *
 * @returns The structured Projects page component.
 */
export const ProjectsClient = ({ projects }: { projects: IProject[] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [repoDates, setRepoDates] = useState<Record<number, { year: string, fullDate: string }>>({});

  const theme = resolveConfig(tailwindConfig) as any;

  useEffect(() => {
    projects.forEach(async (project) => {
       const githubLink = project.links.find(l => l.title.toLowerCase() === 'github');
       if (githubLink && githubLink.url) {
          // Extract owner/repo from URL
          const match = githubLink.url.match(/github\.com\/([^\/]+\/[^\/\.]+)/);
          if (match) {
             const repoPath = match[1];
             try {
               const res = await fetch(`https://api.github.com/repos/${repoPath}`);
               const data = await res.json();
               if (data.created_at) {
                 const date = new Date(data.created_at);
                 setRepoDates(prev => ({
                   ...prev,
                   [project.id]: {
                     year: date.getFullYear().toString(),
                     fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                   }
                 }));
               }
             } catch (e) {
                console.error("Failed to fetch github data for", repoPath);
             }
          }
       }
    });
  }, [projects]);

  return (
    <div className="flex flex-col flex-1 justify-start items-start w-full h-full">
      {/* <div className="pb-8">
        <h1 className="text-2xl lg:text-3xl font-normal tracking-wide text-textColor font-saira pl-4 lg:pl-0 pb-5">
          <span className="text-secondary opacity-70 mr-3">//</span> Some Things I’ve Built
        </h1>
      </div> */}

      <div className="flex flex-col flex-1 justify-start items-start w-full">
        <span className="block mb-7 lg:mb-8 text-[10px] lg:text-xs text-white/30 font-mono tracking-widest uppercase cursor-pointer hover:text-white/80 transition-colors leading-7 lg:leading-8">
          {projects.length} Repositories |{' '}
          {
            projects.filter((p) =>
              p.technologies.some((t) => t.toLowerCase().includes('react'))
            ).length
          }{' '}
          React Apps
        </span>
        <div className="flex w-full flex-col gap-y-[64px] lg:gap-y-[80px]">
          {projects.map((item: IProject, index: number) => (
            <motion.div
              key={item.id}
              id={`proj-${item.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-y-7 lg:gap-y-8 gap-x-12 relative group"
            >
              {/* Timeline Connector */}
              <div className="hidden md:flex flex-col items-center mt-2 relative z-10 w-[140px] flex-shrink-0">
                <time className="text-[11px] lg:text-xs font-mono text-white/40 group-hover:text-secondary transition-colors tracking-widest uppercase leading-7 lg:leading-8 text-center flex flex-col">
                  <span className="text-[13px] font-bold">{repoDates[item.id]?.year || item.year || '2024'}</span>
                  <span className="text-[9px] opacity-50 mt-[-4px] tracking-normal capitalize">
                    {repoDates[item.id]?.fullDate || 'Loading...'}
                  </span>
                </time>
                <div className="h-[1px] w-12 bg-gradient-to-r from-secondary/30 to-transparent mt-3"></div>
              </div>

              <div className="relative z-10 flex-1 w-full flex flex-col justify-start">
                <h2 className="text-2xl lg:text-3xl font-display font-semibold pb-6 leading-7 lg:leading-8">
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:from-secondary group-hover:to-secondary/60 transition-all duration-500 cursor-pointer">
                    <IntelliSenseTooltip
                      keyword={item.title.replace(/\s+/g, '')}
                      definition={[{ property: 'status', value: 'Completed' }]}
                    >
                      {item.title}
                    </IntelliSenseTooltip>
                  </span>
                </h2>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start w-full">
                  {/* Compact Image Thumbnail */}
                  <div className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-xl group/img">
                    <motion.img
                      src={item.imgSrc}
                      alt={item.title}
                      className={`w-full aspect-video lg:aspect-[4/3] object-cover ${isLoading ? 'blur-2xl opacity-30' : 'opacity-100'}`}
                      style={{
                        filter: isLoading
                          ? 'blur(10px)'
                          : 'grayscale(15%) brightness(90%)'
                      }}
                      animate={{
                        filter: isLoading
                          ? 'blur(10px)'
                          : 'grayscale(15%) brightness(90%)'
                      }}
                      whileHover={{
                        filter: 'grayscale(0%) brightness(100%)',
                        scale: 1.05
                      }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = item.errorImgSrc;
                      }}
                      onLoad={() => {
                        setIsLoading(false);
                      }}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 flex flex-col w-full">
                    {(item.description || 'No description provided.')
                      .replace(/\\n/g, '\n')
                      .split('\n')
                      .filter((p) => p.trim() !== '')
                      .map((p, i) => (
                        <p
                          key={i}
                          className="mb-4 text-white/60 text-base lg:text-[17px] font-sans leading-7 lg:leading-8"
                        >
                          {p.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong
                                  key={j}
                                  className="text-white/90 font-semibold"
                                >
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return part;
                          })}
                        </p>
                      ))}

                    <div className="mt-6 pt-6">
                      <h3 className="text-[10px] lg:text-xs uppercase tracking-widest text-secondary/60 font-mono leading-7 lg:leading-8 mb-4 flex items-center gap-6">
                        <span>Technologies Used</span>
                        <div className="h-px flex-1 bg-white/5"></div>
                      </h3>
                      <div className="flex flex-wrap gap-y-2 gap-x-4 items-center">
                        {item.technologies.map(
                          (tech: string, techIndex: number) => (
                            <h2
                              key={techIndex}
                              className="text-[14px] lg:text-[15px] text-textColor opacity-90 items-center flex font-sans font-medium leading-7 lg:leading-8 gap-1 transition-colors"
                            >
                              <IoMdArrowDropright className="text-base text-secondary" />
                              <IntelliSenseTooltip
                                keyword={tech.replace(/\s+/g, '')}
                                definition={[
                                  { property: 'type', value: 'Dependency' }
                                ]}
                              >
                                {tech}
                              </IntelliSenseTooltip>
                            </h2>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-[10px] lg:text-xs uppercase tracking-widest text-white/30 font-mono leading-7 lg:leading-8 mb-4 flex items-center gap-6">
                        <span>Project Links</span>
                        <div className="h-px flex-1 bg-white/5"></div>
                      </h3>

                      <div className="flex flex-wrap gap-3 items-center">
                        {item.links.map((link: IProjectLink, linkIndex: number) => (
                          <motion.button
                            key={linkIndex}
                            className={`px-5 py-2 text-[10px] lg:text-xs font-mono tracking-widest uppercase border border-secondary/20 text-secondary bg-secondary/5 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:border-white/10 disabled:text-white/30 disabled:bg-transparent`}
                            whileHover={
                              link.url
                                ? {
                                    scale: 1.05,
                                    boxShadow: `0px 4px 20px ${theme.theme.colors.secondary}30`,
                                    backgroundColor: `${theme.theme.colors.secondary}15`,
                                    borderColor: `${theme.theme.colors.secondary}50`
                                  }
                                : {}
                            }
                            onClick={() => {
                              if (link.url) {
                                window.open(link.url, '_blank', 'noreferrer');
                              }
                            }}
                            disabled={!link.url}
                          >
                            {link.title}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsClient;
