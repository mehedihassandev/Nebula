'use client';
import { motion } from 'framer-motion';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import { useState } from 'react';
import { IntelliSenseTooltip } from '@components/IntelliSenseTooltip';

import { experience } from '@constants/experience';

/**
 * Renders the Home/Landing page of the portfolio.
 * We design this to act as the primary entry point, providing an immediate
 * visual impact and a concise overview of the developer's core competencies.
 *
 * @returns The structured Landing page component.
 */
export const HomeClient = ({ projectsCount }: { projectsCount: number }) => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = resolveConfig(tailwindConfig) as any;

  return (
    <section
      id="home"
      className="w-full h-full flex-1 flex flex-col justify-center"
    >
      <div className="w-full h-full items-center px-7 lg:px-10 overflow-hidden grid grid-cols-3 gap-2 align-middle">
        <div className="col-span-6 xl:col-span-2 lg:py-8 lg:py-24 mt-2 lg:mt-32 xl:mt-0 px-5">
          <div className="h-full">
            <svg width="100%" height="100%">
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                className="font-poppins tracking-[15px] lg:tracking-[30px] text-6xl lg:text-[100px] font-light welcome opacity-90"
              >
                Welcome
              </text>
            </svg>
          </div>

          <div className="block lg:hidden">
            <motion.img
              src="https://i.ibb.co.com/GspdVzQ/IMG-20231130-WA0007-2-1.jpg"
              alt="Md. Mehedi Hassan - Software Engineer"
              className="w-[450px] h-auto overflow-hidden rounded-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  'https://i.ibb.co.com/GspdVzQ/IMG-20231130-WA0007-2-1.jpg';
              }}
              loading="lazy"
              onLoad={() => {
                setIsLoading(false);
              }}
              style={{ filter: isLoading ? 'blur(10px)' : '' }}
              animate={{ filter: isLoading ? 'blur(10px)' : '' }}
            />
          </div>
          <div className="mt-8 lg:mt-0 w-[95%]">
            <span className="block mb-3 text-[10px] lg:text-xs text-white/30 font-mono tracking-widest uppercase cursor-pointer hover:text-white/80 transition-colors">
              {projectsCount} Projects | {experience.length} Roles
            </span>
            <p className="text-sm lg:text-base leading-loose lg:leading-8 text-textColor font-syne">
              I am an experienced{' '}
              <IntelliSenseTooltip
                keyword="React"
                definition={[
                  { property: 'experience', value: '3+ Years' },
                  { property: 'proficiency', value: 'Expert' }
                ]}
              >
                React
              </IntelliSenseTooltip>{' '}
              and{' '}
              <IntelliSenseTooltip
                keyword="ReactNative"
                definition={[
                  { property: 'appsBuilt', value: 'Multiple' },
                  { property: 'platform', value: 'Cross-Platform' }
                ]}
              >
                React Native
              </IntelliSenseTooltip>{' '}
              developer specializing in dynamic, scalable web and mobile
              applications. Leveraging my expertise in{' '}
              <span className="text-secondary font-medium">JavaScript</span>,{' '}
              <IntelliSenseTooltip
                keyword="TypeScript"
                definition={[
                  { property: 'strictMode', value: true },
                  { property: 'loveLevel', value: '100%' }
                ]}
              >
                TypeScript
              </IntelliSenseTooltip>
              , <span className="text-secondary font-medium">Material UI</span>,{' '}
              <IntelliSenseTooltip
                keyword="TailwindCSS"
                definition={[{ property: 'utilityFirst', value: true }]}
              >
                Tailwind CSS
              </IntelliSenseTooltip>
              , and{' '}
              <IntelliSenseTooltip
                keyword="Redux"
                definition={[
                  { property: 'stateManagement', value: 'Predictable' }
                ]}
              >
                Redux
              </IntelliSenseTooltip>
              , I build robust enterprise-grade software (such as POS and PCM
              systems) as well as high-performance platforms designed to address
              global challenges. I focus on managing complex state, creating
              reusable architectures, and ensuring seamless integration across
              the frontend. For mobile applications, I excel at integrating
              native modules to deliver native-like experiences. My priorities
              always center around enhancing scalability, maximizing
              performance, and writing adaptable code that supports evolving
              business needs. Whether on the web or mobile, my ultimate goal is
              to deliver intuitive, fluid user experiences while maintaining
              clean, future-proof code.
            </p>
          </div>
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 justify-between gap-7 items-center mt-7 lg:mt-16 xl:mt-24">
            <h2 className="text-2xl lg:text-3xl xl:text-5xl text-secondary font-saira leading-3 xl:leading-9 font-semibold">2 + <br /> <span className="text-lg lg:text-lg text-white font-normal font-syne">Years of Experience</span></h2>
            <h2 className="text-2xl lg:text-3xl xl:text-5xl text-secondary font-saira leading-3 xl:leading-9 font-semibold">150+ <br /> <span className="text-lg lg:text-lg text-white font-normal font-syne">Projects completed</span></h2>
            <h2 className="text-2xl lg:text-3xl xl:text-5xl text-secondary font-saira leading-3 xl:leading-9 font-semibold">100% <br /> <span className="text-lg lg:text-lg text-white font-normal font-syne">Client Satisfactions</span></h2>
          </div> */}
        </div>
        <div className="hidden xl:block">
          <motion.img
            src="https://i.ibb.co.com/GspdVzQ/IMG-20231130-WA0007-2-1.jpg"
            alt="Md. Mehedi Hassan - Frontend Engineer"
            className={`w-full h-[600px] overflow-hidden object-cover rounded-2xl border border-white/5 ${isLoading ? 'blur-2xl opacity-30' : 'opacity-100'}`}
            style={{ filter: isLoading ? 'blur(10px)' : 'grayscale(100%)' }}
            animate={{ filter: isLoading ? 'blur(10px)' : 'grayscale(100%)' }}
            whileHover={{
              filter: 'grayscale(0%) brightness(100%)',
              transform: 'translateY(-5px)',
              boxShadow: `0px 20px 40px -10px ${theme.theme.colors.secondary}40`
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                'https://i.ibb.co.com/GspdVzQ/IMG-20231130-WA0007-2-1.jpg';
            }}
            loading="lazy"
            onLoad={() => {
              setIsLoading(false);
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeClient;
