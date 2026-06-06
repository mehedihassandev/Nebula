'use client';
import { IoMdArrowDropright } from 'react-icons/io';
import { experience } from '@constants/experience';
import { IExperience, IExperienceHighlight } from '@models/Experience';
import { IntelliSenseTooltip } from '@components/IntelliSenseTooltip';
import { motion } from 'framer-motion';

/**
 * Renders the Experience timeline on the portfolio.
 * This component visually maps out the developer's professional history,
 * highlighting roles, responsibilities, and specific technologies utilized
 * to build trust and demonstrate practical industry expertise.
 *
 * @returns The structured Experience page component.
 */
const calculateDuration = (dateString: string) => {
  try {
    const parts = dateString.split('-');
    if (parts.length !== 2) return dateString;
    const startStr = parts[0].trim();
    const endStr = parts[1].trim();

    const startDate = new Date(startStr);
    const endDate = endStr.toLowerCase() === 'present' ? new Date() : new Date(endStr);
    
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    months += 1; // inclusive of start month

    if (months <= 0 || isNaN(months)) return dateString;
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    let durationStr = '';
    if (years > 0) {
      durationStr += `${years} yr${years > 1 ? 's' : ''}`;
    }
    if (remainingMonths > 0) {
      if (durationStr) durationStr += ' ';
      durationStr += `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    }
    
    return `${dateString} · ${durationStr}`;
  } catch (e) {
    return dateString;
  }
};

export const Experience = () => {
  return (
    <div className="w-full flex-1 grid grid-cols items-start">
      <div className="w-full">
        {/* <h1 className="text-2xl lg:text-3xl font-normal tracking-wide text-white font-saira pb-8 pl-4 lg:pl-0">
          <span className="text-secondary opacity-70 mr-3">//</span> Experience
        </h1> */}

        <div className="w-full">
          <div className="w-full">
            <div className="grid gap-7 lg:gap-8 grid-cols-1">
              <span className="block mb-7 lg:mb-8 text-[10px] lg:text-xs text-white/30 font-mono tracking-widest uppercase cursor-pointer hover:text-white/80 transition-colors leading-7 lg:leading-8">
                {experience.length} Roles | {new Date().getFullYear() - 2021}+
                Years Experience
              </span>
              <div className="relative space-y-6 pb-6">
                <div className="flex flex-col gap-12">
                  {experience.map((exp: IExperience, expIndex: number) => (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: expIndex * 0.1 }}
                      key={exp.id}
                      className="flex flex-col md:flex-row gap-y-7 lg:gap-y-8 gap-x-12 relative group"
                    >
                      {/* Timeline Connector */}
                      <div className="hidden md:flex flex-col items-center mt-2 relative z-10 w-[140px] flex-shrink-0">
                        <time className="text-[11px] lg:text-xs font-mono text-white/40 group-hover:text-secondary transition-colors tracking-widest uppercase leading-7 lg:leading-8">
                          {exp.date}
                        </time>
                        <div className="h-[1px] w-12 bg-gradient-to-r from-secondary/30 to-transparent"></div>
                      </div>

                      <div className="relative z-10 flex-1">
                        <h3 className="text-xl lg:text-2xl text-white font-sans pt-0 flex items-center flex-wrap gap-y-2 leading-7 lg:leading-8">
                          <span className="font-semibold tracking-wide font-display bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:from-secondary group-hover:to-secondary/60 transition-all duration-500">
                            <IntelliSenseTooltip
                              keyword={exp.title.replace(/\s+/g, '')}
                              definition={[
                                { property: 'position', value: exp.position },
                                { property: 'duration', value: exp.date }
                              ]}
                            >
                              {exp.title}
                            </IntelliSenseTooltip>
                          </span>
                          <span className="text-white/40 ml-2 text-lg lg:text-xl font-light">
                            | {exp.position}
                          </span>
                        </h3>
                        {exp.description.map((desc: string, index: number) => (
                          <p
                            key={index}
                            className="mt-7 lg:mt-8 text-textColor text-base lg:text-[17px] leading-7 lg:leading-8 font-sans opacity-90"
                          >
                            {desc}
                          </p>
                        ))}
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="mt-6 space-y-4">
                            {exp.highlights.map(
                              (
                                highlight: IExperienceHighlight,
                                index: number
                              ) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: index * 0.1 }}
                                  className="text-textColor text-base lg:text-[17px] leading-7 lg:leading-8 font-sans opacity-90 flex items-start gap-3 relative group/item"
                                >
                                  <div className="absolute left-[9px] top-4 w-px h-[calc(100%-8px)] bg-white/10 group-hover/item:bg-secondary/30 transition-colors" />
                                  <IoMdArrowDropright className="text-secondary mt-1.5 flex-shrink-0 text-xl relative z-10" />
                                  <div className="pb-2">
                                    <span className="text-white/90 font-semibold font-display pr-2 tracking-wide">
                                      {highlight.title}
                                    </span>
                                    <span className="text-textColor/90">
                                      {highlight.detail}
                                    </span>
                                    {highlight.additionalDetail &&
                                      highlight.additionalDetail.length > 0 && (
                                        <div className="text-textColor/80 font-sans mt-0 leading-7 lg:leading-8 text-sm lg:text-base">
                                          {highlight.additionalDetail.map(
                                            (
                                              point: string,
                                              pointIndex: number
                                            ) => (
                                              <p
                                                key={pointIndex}
                                                className="pt-2"
                                              >
                                                {point}
                                              </p>
                                            )
                                          )}
                                        </div>
                                      )}
                                  </div>
                                </motion.li>
                              )
                            )}
                          </ul>
                        )}
                        <div className="mt-7 lg:mt-8 pt-7 lg:pt-8">
                          <h3 className="text-[10px] lg:text-xs uppercase tracking-widest text-secondary/60 font-mono leading-7 lg:leading-8 mb-7 lg:mb-8 flex items-center gap-4">
                            <span>Technologies Used</span>
                            <div className="h-px flex-1 bg-white/5"></div>
                          </h3>
                          <div className="flex flex-wrap gap-3 items-center">
                            {exp.skills.map((skill: string, index: number) => (
                              <div
                                key={index}
                                className="text-base lg:text-[17px] text-textColor opacity-90 items-center flex font-sans leading-7 lg:leading-8 font-semibold gap-1 transition-colors"
                              >
                                <IoMdArrowDropright className="text-lg lg:text-xl text-secondary" />
                                <IntelliSenseTooltip
                                  keyword={skill.replace(/\s+/g, '')}
                                  definition={[
                                    { property: 'proficiency', value: 'Expert' }
                                  ]}
                                >
                                  {skill}
                                </IntelliSenseTooltip>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="pt-5">
        <h1 className="text-2xl font-semibold text-white font-saira pb-5">
          <span className="text-secondary">02.2.</span> Education
        </h1>

        <div className="w-full pt-5">
          <div className="max-w-screen-2xl px-11">
            <div className="grid gap-4 mx-4 sm:grid-cols-12">
              <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-300">
                  {educationData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-white hover:before:bg-secondary"
                    >
                      <time className="text-[.65rem] font-saira uppercase text-white">
                        {item.timePeriod}
                      </time>
                      <h3 className="text-[1rem] text-white">
                        <span className="font-semibold">
                          {item.institution}
                        </span>{" "}
                        | {item.qualification}
                      </h3>
                      <p className="mt-2 text-textColor text-[.75rem]">
                        {item.result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Experience;
