'use client';
import { motion } from 'framer-motion';
import { IoMdArrowDropright } from 'react-icons/io';
import { skills } from '@constants/skills';
import { ISkill } from '@models/Skill';
import { IntelliSenseTooltip } from '@components/IntelliSenseTooltip';

/**
 * Renders the About section of the portfolio, detailing the developer's journey,
 * technical background, and current skill set.
 * This component exists to provide personal and professional context to visitors
 * reviewing the portfolio, establishing credibility and personality.
 *
 * @returns The structured About page component containing personal history and skills.
 */
export const About = () => {
  return (
    <div className="flex-1 grid items-start justify-start">
      <div className="text-textColor font-sans pb-7 lg:pb-8">
        <span className="block mb-7 lg:mb-8 text-[10px] lg:text-xs text-white/30 font-mono tracking-widest uppercase cursor-pointer hover:text-white/80 transition-colors leading-7 lg:leading-8">
          {new Date().getFullYear() - 2019}+ Years Coding | {skills.length}{' '}
          Technologies Used
        </span>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="pb-7 lg:pb-8 text-base lg:text-[17px] text-textColor/90 font-sans leading-7 lg:leading-8">
          Hello there! My name is
          <span className="font-medium text-secondary"> Md. Mehedi Hassan</span>
          , and I have a deep passion for coding. My journey into web
          development began in 2019 when I took on the challenge of building a
          theme for Themeforest. My hard work paid off when my theme was
          accepted into their marketplace. Since then, I&apos;ve developed
          numerous themes for various businesses within the local economy,
          utilizing my skills in HTML, CSS, and JavaScript. This experience laid
          a solid foundation for my deep dive into JavaScript.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="pb-7 lg:pb-8 text-base lg:text-[17px] font-sans leading-7 lg:leading-8 text-textColor/90">
          Time travel to the present, where I am balancing impactful roles as a{' '}
          <IntelliSenseTooltip
            keyword="ReactDeveloper"
            definition={[
              { property: 'role', value: 'Frontend' },
              { property: 'focus', value: 'Inclusive UI' }
            ]}
          >
            React Developer
          </IntelliSenseTooltip>
          . At{' '}
          <span className="font-medium text-white hover:text-secondary transition-colors duration-300">
            Hubar Tech Limited
          </span>
          , I contribute heavily to creating enterprise solutions like the
          <span className="font-medium text-secondary"> POS</span>,
          <span className="font-medium text-secondary"> PCM</span>, and
          <span className="font-medium text-secondary"> E-Bill</span> systems.
          Concurrently, at{' '}
          <span className="font-medium text-white hover:text-secondary transition-colors duration-300">
            10 Billion
          </span>
          , I build scalable, high-performance web and mobile platforms that
          help address global challenges. These days, creating inclusive and
          accessible digital experiences for a wide range of customers is my
          primary emphasis.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="pb-7 lg:pb-8 text-base lg:text-[17px] font-sans leading-7 lg:leading-8 text-textColor/90">
          I am committed, to lifelong learning and actively immerse myself in
          the rapidly evolving field of technology, eagerly picking up new
          techniques and frameworks. Accepting challenges, I enjoy learning new
          skills and developing my repertoire since I have an unquenchable
          curiosity to become proficient with cutting-edge tools and remain on
          the cutting edge of web development innovation.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="pb-7 lg:pb-8 text-base lg:text-[17px] font-sans leading-7 lg:leading-8 text-textColor/90">
          In addition to my work in React, I have also ventured into mobile
          development with{' '}
          <IntelliSenseTooltip
            keyword="ReactNative"
            definition={[
              { property: 'appsBuilt', value: 3 },
              { property: 'platform', value: 'Cross-Platform' }
            ]}
          >
            React Native
          </IntelliSenseTooltip>
          . I played a key role in developing a{' '}
          <IntelliSenseTooltip
            keyword="MyCareApp"
            definition={[
              { property: 'type', value: 'Mobile App' },
              { property: 'features', value: 'Payments & Top-up' }
            ]}
          >
            MyCare app
          </IntelliSenseTooltip>
          , which enables users to perform essential tasks such as
          <span className="font-medium text-secondary"> top-up</span>,
          <span className="font-medium text-secondary"> bill payments</span> and{' '}
          <span className="font-medium text-secondary"> more</span>. This
          experience allowed me to extend my expertise beyond web development,
          embracing the unique challenges and opportunities presented by mobile
          app development.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="pb-7 lg:pb-8 text-base lg:text-[17px] font-sans leading-7 lg:leading-8 text-textColor/90">
          Beyond my technical skills, I bring a strong sense of adaptability and
          a proactive mindset, allowing me to excel in various roles and
          industries. Whether working independently or as part of a team, I am
          always eager to push the boundaries of what&apos;s possible in the
          world of web and mobile development.
        </motion.p>
      </div>
      <div className="mt-7 lg:mt-8 pt-7 lg:pt-8 pb-7 lg:pb-8">
        <h3 className="text-[10px] lg:text-xs uppercase tracking-widest text-secondary/60 font-mono leading-7 lg:leading-8 mb-7 lg:mb-8 flex items-center gap-4">
          <span>Technologies Used</span>
          <div className="h-px flex-1 max-w-xl bg-white/5"></div>
        </h3>
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-y-7 lg:gap-y-8 gap-x-6">
          {skills.map((skill: ISkill, index: number) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="text-base lg:text-[17px] text-textColor/90 font-sans leading-7 lg:leading-8 flex items-center gap-1 transition-colors hover:text-secondary"
            >
              <IoMdArrowDropright className="text-lg lg:text-xl text-secondary flex-shrink-0" />
              <span className="truncate">{skill.name}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      {/* </div> */}
    </div>
  );
};

export default About;
