'use client';
import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';
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

  const theme = resolveConfig(tailwindConfig) as any;

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-hidden px-0 py-10 lg:py-14 lg:px-10">
      {/* <div className="pb-8">
        <h1 className="text-2xl lg:text-3xl font-normal tracking-wide text-textColor font-saira pl-4 lg:pl-0 pb-5">
          <span className="text-secondary opacity-70 mr-3">//</span> Some Things I’ve Built
        </h1>
      </div> */}

      <div className="flex flex-col px-6 lg:px-0">
        <span className="block mb-6 text-[10px] lg:text-xs text-white/30 font-mono tracking-widest uppercase cursor-pointer hover:text-white/80 transition-colors">
          {projects.length} Repositories |{' '}
          {
            projects.filter((p) =>
              p.links.some((l) => l.title.toLowerCase() === 'live')
            ).length
          }{' '}
          Live Deployments
        </span>
        <div className="flex flex-col gap-12 lg:gap-24 max-w-screen-2xl mx-auto pb-20 w-full">
          {projects.map((item: IProject, index: number) => (
            <motion.div
              key={item.id}
              className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-6"
            >
              <div
                className={`w-full lg:w-1/2 flex-shrink-0 overflow-hidden rounded-2xl ${index % 2 !== 0 ? 'lg:order-last' : ''}`}
              >
                <motion.img
                  src={item.imgSrc}
                  alt={item.title}
                  className={`w-full h-auto lg:h-[400px] object-cover ${isLoading ? 'blur-2xl opacity-30' : 'opacity-100'}`}
                  style={{
                    filter: isLoading
                      ? 'blur(10px)'
                      : 'grayscale(30%) brightness(80%)'
                  }}
                  animate={{
                    filter: isLoading
                      ? 'blur(10px)'
                      : 'grayscale(30%) brightness(80%)'
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

              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl lg:text-3xl font-saira font-semibold pb-4">
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent hover:from-secondary hover:to-secondary/60 transition-all duration-500 cursor-pointer">
                    <IntelliSenseTooltip
                      keyword={item.title.replace(/\s+/g, '')}
                      definition={[{ property: 'status', value: 'Completed' }]}
                    >
                      {item.title}
                    </IntelliSenseTooltip>
                  </span>
                </h2>
                <p className="text-white/60 text-sm lg:text-base leading-loose lg:leading-8 font-syne pb-4">
                  {item.description}
                </p>
                <div className="mt-4 pt-4">
                  <h3 className="text-[10px] lg:text-xs uppercase tracking-widest text-secondary/60 font-mono mb-4 flex items-center gap-4">
                    <span>Technologies Used</span>
                    <div className="h-px flex-1 bg-white/5"></div>
                  </h3>
                  <div className="flex flex-wrap gap-3 items-center">
                    {item.technologies.map(
                      (tech: string, techIndex: number) => (
                        <h2
                          key={techIndex}
                          className="text-sm lg:text-base text-textColor opacity-90 items-center flex font-saira font-semibold gap-1 transition-colors"
                        >
                          <IoMdArrowDropright className="text-lg lg:text-xl text-secondary" />
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
                  <h3 className="text-[10px] lg:text-xs uppercase tracking-widest text-white/30 font-mono mb-4">
                    Project Links
                  </h3>

                  <div className="flex flex-wrap gap-4 items-center">
                    {item.links.map((link: IProjectLink, linkIndex: number) => (
                      <motion.button
                        key={linkIndex}
                        className={`px-6 py-2.5 text-[10px] lg:text-xs font-mono tracking-widest uppercase border border-secondary/20 text-secondary bg-secondary/5 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:border-white/10 disabled:text-white/30 disabled:bg-transparent`}
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsClient;
