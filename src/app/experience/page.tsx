import { IoMdArrowDropright } from 'react-icons/io';
import { experience } from '@constants/experience';
import { IExperience, IExperienceHighlight } from '@models/Experience';

/**
 * Renders the Experience timeline on the portfolio.
 * This component visually maps out the developer's professional history,
 * highlighting roles, responsibilities, and specific technologies utilized
 * to build trust and demonstrate practical industry expertise.
 *
 * @returns The structured Experience page component.
 */
export const Experience = () => {
  return (
    <div className="w-full h-full flex-1 grid grid-cols items-center px-4 lg:px-4 py-6 lg:py-0 overflow-auto">
      <div className="max-w-screen-2xl">
        {/* <h1 className="text-2xl lg:text-3xl font-normal tracking-wide text-white font-saira pb-8 pl-4 lg:pl-0">
          <span className="text-secondary opacity-70 mr-3">//</span> Experience
        </h1> */}

        <div className="w-full">
          <div className="px-0 lg:px-2">
            <div className="grid gap-4 mx-0 lg:mx-4 grid-cols-1">
              <div className="relative px-0 lg:px-4 space-y-6">
                <div className="space-y-12 relative px-4 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-300">
                  {experience.map((exp: IExperience) => (
                    <div
                      key={exp.id}
                      className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-white hover:before:bg-secondary"
                    >
                      <time className="text-xs lg:text-sm font-syne uppercase text-white tracking-widest opacity-80">
                        {exp.date}
                      </time>
                      <h3 className="text-xl text-white font-syne">
                        <span className="font-medium tracking-wide font-saira text-secondary">
                          {exp.title}
                        </span>
                        | {exp.position}
                      </h3>
                      {exp.description.map((desc: string, index: number) => (
                        <p
                          key={index}
                          className="mt-4 text-textColor text-sm lg:text-base leading-loose lg:leading-8 font-syne opacity-90"
                        >
                          {desc}
                        </p>
                      ))}
                      {exp.highlights.map(
                        (highlight: IExperienceHighlight, index: number) => (
                          <li
                            key={index}
                            className="pt-4 text-textColor text-sm lg:text-base leading-loose lg:leading-8 font-syne opacity-90"
                          >
                            <span className="text-secondary font-semibold font-saira pr-2">
                              {highlight.title}
                            </span>
                            {highlight.detail}
                            {highlight.additionalDetail &&
                              highlight.additionalDetail.length > 0 && (
                                <div className="text-textColor font-syne mt-1">
                                  {highlight.additionalDetail.map(
                                    (point: string, pointIndex: number) => (
                                      <p key={pointIndex} className="pt-2">
                                        {point}
                                      </p>
                                    )
                                  )}
                                </div>
                              )}
                          </li>
                        )
                      )}
                      <h3 className="mt-8 text-base text-textColor font-saira font-medium opacity-80">
                        Using Technology
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-7 pb-16 lg:pb-2 items-center gap-3 pt-7 lg:pt-5">
                        {exp.skills.map((skill: string, index: number) => (
                          <h4
                            key={index}
                            className="text-sm lg:text-base text-textColor opacity-90 items-center flex font-saira font-semibold transition-colors hover:text-secondary"
                          >
                            <IoMdArrowDropright className="text-lg lg:text-xl" />
                            {skill}
                          </h4>
                        ))}
                      </div>
                    </div>
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
