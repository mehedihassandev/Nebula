"use client";
import { motion } from "framer-motion";
import { IoMdArrowDropright } from "react-icons/io";
import { skills } from "@constants/skills";
import { ISkill } from "@models/Skill";

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
    <div className="max-w-screen-2xl h-full lg:h-screen grid items-center justify-between px-14 py-10">
      <div className="pt-10">
        <h1 className="text-3xl font-semibold text-white font-saira pb-5">
          <span className="font-medium text-secondary">01.</span> About Me
        </h1>
        <div className="text-textColor font-syne pb-4">
          <motion.p className="pb-4 text-lg text-textColor font-syne">
            Hello there! My name is
            <span className="font-medium text-secondary">
              {" "}
              Md. Mehedi Hassan
            </span>
            , and I have a deep passion for coding. My journey into web
            development began in 2019 when I took on the challenge of building a
            theme for Themeforest. My hard work paid off when my theme was
            accepted into their marketplace. Since then, I&apos;ve developed
            numerous themes for various businesses within the local economy,
            utilizing my skills in HTML, CSS, and JavaScript. This experience
            laid a solid foundation for my deep dive into JavaScript.
          </motion.p>

          <motion.p className="pb-4 text-lg font-syne text-textColor">
            Time travel to the present, where I am employed by a startup company
            as a{" "}
            <span className="font-medium text-secondary">React Developer</span>.
            I make numerous contributions here, such as creating the
            <span className="font-medium text-secondary"> POS</span>,
            <span className="font-medium text-secondary"> PCM</span>, and
            <span className="font-medium text-secondary"> E-Bill</span> system.
            These days, creating inclusive and accessible digital experiences
            and goods for a wide range of customers is my primary emphasis.
          </motion.p>

          <motion.p className="text-lg font-syne text-textColor pb-4">
            I am committed, to lifelong learning and actively immerse myself in
            the rapidly evolving field of technology, eagerly picking up new
            techniques and frameworks. Accepting challenges, I enjoy learning
            new skills and developing my repertoire since I have an unquenchable
            curiosity to become proficient with cutting-edge tools and remain on
            the cutting edge of web development innovation.
          </motion.p>

          <motion.p className="pb-4 text-lg font-syne text-textColor">
            In addition to my work in React, I have also ventured into mobile
            development with{" "}
            <span className="font-medium text-secondary">React Native</span>. I
            played a key role in developing a{" "}
            <span className="font-medium text-secondary">MyCare app</span>,
            which enables users to perform essential tasks such as
            <span className="font-medium text-secondary"> top-up</span>,
            <span className="font-medium text-secondary"> bill payments</span>{" "}
            and <span className="font-medium text-secondary"> more</span>. This
            experience allowed me to extend my expertise beyond web development,
            embracing the unique challenges and opportunities presented by
            mobile app development.
          </motion.p>

          <motion.p className="pb-4 text-lg font-syne text-textColor">
            Beyond my technical skills, I bring a strong sense of adaptability
            and a proactive mindset, allowing me to excel in various roles and
            industries. Whether working independently or as part of a team, I am
            always eager to push the boundaries of what&apos;s possible in the
            world of web and mobile development.
          </motion.p>
        </div>
        <motion.h2 className="text-textColor font-syne py-4 text-xl">
          I&apos;ve recently been working with the following technologies:
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-7 pb-16 lg:pb-2 gap-3">
          {skills.map((skill: ISkill, index: number) => (
            <h2
              key={index}
              className="text-md text-textColor items-center flex cursor-pointer font-saira font-semibold gap-2"
            >
              <IoMdArrowDropright className="text-xl" />
              {skill.name}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
