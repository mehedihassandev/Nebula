'use client';
import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import { IoMdArrowDropright } from 'react-icons/io';
import tailwindConfig from '../../../tailwind.config';
import { projects } from '@constants/projects';
import { IProject, IProjectLink } from '@models/Project';

/**
 * Renders the Projects gallery to showcase completed work.
 * This view exists to provide tangible proof of development capabilities,
 * allowing users to view project details, screenshots, and live links.
 *
 * @returns The structured Projects page component.
 */
export const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);

  const theme = resolveConfig(tailwindConfig) as any;

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-hidden px-0 py-10 lg:py-14 lg:px-10">
      {/* <div className="pb-8">
        <h1 className="text-2xl lg:text-3xl font-normal tracking-wide text-textColor font-saira pl-4 lg:pl-0 pb-5">
          <span className="text-secondary opacity-70 mr-3">//</span> Some Things I’ve Built
        </h1>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-2xl gap-16 px-6 lg:px-0">
        {projects.map((item: IProject, index: number) => (
          <Fragment key={item.id}>
            {index % 2 === 0 && (
              <div>
                <motion.img
                  src={item.imgSrc}
                  alt="about"
                  className="w-full h-full lg:h-80 box"
                  style={{
                    filter: isLoading ? 'blur(10px)' : 'grayscale(50%)'
                  }}
                  animate={{
                    filter: isLoading ? 'blur(10px)' : 'grayscale(50%)'
                  }}
                  whileHover={{
                    filter: 'contrast(130%)',
                    boxShadow: `10px 10px 0px 0px ${theme.theme.colors.secondary}`
                  }}
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
            )}
            <div>
              <h2 className="text-secondary text-lg lg:text-xl font-saira font-semibold pb-3">
                {item.title}
              </h2>
              <p className="text-textColor text-sm lg:text-base leading-loose lg:leading-8 font-syne pb-4 opacity-90">
                {item.description}
              </p>
              <h3 className="mt-4 text-base text-textColor font-saira font-medium opacity-80">
                Using Technology
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-2 pt-3">
                {item.technologies.map((tech: string, techIndex: number) => (
                  <h2
                    key={techIndex}
                    className="text-sm lg:text-base text-textColor opacity-90 items-center flex font-saira font-semibold gap-1 transition-colors hover:text-secondary"
                  >
                    <IoMdArrowDropright className="text-lg lg:text-xl" />
                    {tech}
                  </h2>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-textColor text-base font-saira font-medium pb-2 opacity-80">
                  Links
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 pt-3">
                  {item.links.map((link: IProjectLink, linkIndex: number) => (
                    <motion.button
                      key={linkIndex}
                      className={`w-28 h-10 text-sm text-primary bg-secondary rounded-full items-center justify-center flex cursor-pointer font-saira font-medium disabled:bg-gray-400 transition-colors hover:bg-secondary/90`}
                      whileHover={
                        link.url
                          ? {
                              scale: 1.05,
                              boxShadow: `0px 0px 10px ${theme.theme.colors.buttonColor}`
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
            {index % 2 !== 0 && (
              <div>
                <motion.img
                  src={item.imgSrc}
                  alt="about"
                  className={`w-full h-full lg:h-80 box ${isLoading ? 'blur-2xl opacity-30' : 'opacity-100'}`}
                  style={{
                    filter: isLoading ? 'blur(10px)' : 'grayscale(50%)'
                  }}
                  animate={{
                    filter: isLoading ? 'blur(10px)' : 'grayscale(50%)'
                  }}
                  whileHover={{
                    filter: 'contrast(130%)',
                    boxShadow: `10px 10px 0px 0px ${theme.theme.colors.secondary}`,
                    transform: 'translateY(-10px) translateX(-10px)'
                  }}
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
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Projects;
