import { IoMdArrowDropright } from "react-icons/io";
import { experience } from "@constants/experience";
import { IExperience, IExperienceHighlight } from "@models/Experience";

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
    <div className="w-full h-full lg:h-screen grid grid-cols items-center px-10 lg:px-14 xl:px-14 overflow-auto">
      <div className="max-w-screen-2xl py-6 lg:py-10">
        <h1 className="text-3xl font-semibold text-white font-saira pb-5 pl-5 lg:pl-0">
          <span className="text-secondary">02.</span> Experience
        </h1>

        <div className="w-full pt-5">
          <div className="px-0 lg:px-2">
            <div className="grid gap-4 mx-0 lg:mx-4 grid-cols-1">
              <div className="relative px-0 lg:px-4 space-y-6">
                <div className="space-y-12 relative px-4 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-300">
                  {experience.map((exp: IExperience) => (
                    <div
                      key={exp.id}
                      className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-white hover:before:bg-secondary"
                    >
                      <time className="text-xs font-syne uppercase text-white">
                        {exp.date}
                      </time>
                      <h3 className="text-xl text-white font-syne">
                        <span className="font-semibold font-saira text-secondary">
                          {exp.title}
                        </span>
                        | {exp.position}
                      </h3>
                      {exp.description.map((desc: string, index: number) => (
                        <p
                          key={index}
                          className="mt-2 text-textColor text-lg leading-6 font-syne"
                        >
                          {desc}
                        </p>
                      ))}
                      {exp.highlights.map((highlight: IExperienceHighlight, index: number) => (
                        <li
                          key={index}
                          className="pt-5 text-textColor text-lg leading-6 font-syne"
                        >
                          <span className="text-secondary font-semibold font-saira">
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
                                  ),
                                )}
                              </div>
                            )}
                        </li>
                      ))}
                      <h3 className="mt-7 text-lg text-textColor font-saira font-semibold">
                        Using Technology
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-7 pb-16 lg:pb-2 items-center gap-3 pt-7 lg:pt-5">
                        {exp.skills.map((skill: string, index: number) => (
                          <h4
                            key={index}
                            className="text-md text-textColor items-center  flex cursor-pointer font-saira font-semibold"
                          >
                            <IoMdArrowDropright className="text-xl" />
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
