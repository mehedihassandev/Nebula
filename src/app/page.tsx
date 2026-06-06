"use client";
import { motion } from "framer-motion";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { useState } from "react";

/**
 * Renders the Home/Landing page of the portfolio.
 * We design this to act as the primary entry point, providing an immediate 
 * visual impact and a concise overview of the developer's core competencies.
 * 
 * @returns The structured Landing page component.
 */
export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = resolveConfig(tailwindConfig) as any;

  return (
    <section id="home">
      <div className="w-full h-full lg:h-screen items-center px-7 lg:px-10 overflow-hidden grid grid-cols-3 gap-2 align-middle">
        <div className="col-span-6 xl:col-span-2 lg:py-8 lg:py-24 mt-2 lg:mt-32 xl:mt-0 px-5">
          <div className="h-full">
            <svg width="100%" height="100%">
              <text x="50%" y="60%" textAnchor="middle" className="font-poppins tracking-[10px] text-5xl lg:text-[100px] font-bold welcome">
                Welcome
              </text>
            </svg>
          </div>

          <div className="block lg:hidden">
            <motion.img
              src="https://i.ibb.co.com/GspdVzQ/IMG-20231130-WA0007-2-1.jpg"
              alt="about"
              className="w-[450px] h-auto overflow-hidden "
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "https://i.ibb.co.com/GspdVzQ/IMG-20231130-WA0007-2-1.jpg";
              }}
              loading="lazy"
              onLoad={() => {
                setIsLoading(false)
              }}
              style={{ filter: isLoading ? "blur(10px)" : "" }}
              animate={{ filter: isLoading ? "blur(10px)" : "" }}
            />
          </div>
          <p className="text-md lg:text-lg leading-6 mt-8 lg:mt-0 text-textColor font-syne w-[95%]">
            I am an experienced{" "}
            <span className="text-secondary font-medium">React</span> and{" "}
            <span className="text-secondary font-medium">React Native</span>{" "}
            developer specializing in dynamic, responsive websites, web apps,
            and cross-platform mobile applications. Leveraging my expertise in{" "}
            <span className="text-secondary font-medium">JavaScript</span>,{" "}
            <span className="text-secondary font-medium">TypeScript</span>,{" "}
            <span className="text-secondary font-medium">Material UI</span>,{" "}
            <span className="text-secondary font-medium">Tailwind CSS</span>,
            and <span className="text-secondary font-medium">Redux</span>, I
            build user-centered, visually appealing applications for both web
            and mobile platforms. I focus on managing state, creating reusable
            components, and ensuring seamless integration across the frontend.
            For mobile apps, I excel at integrating native modules and utilizing
            libraries like NativeBase and React Navigation. My priorities
            include enhancing scalability, maximizing performance, and writing
            adaptable code that supports evolving project needs. Whether on the
            web or mobile, my goal is to deliver intuitive, fluid user
            experiences while maintaining high-quality, maintainable, and
            future-proof code.
          </p>
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 justify-between gap-7 items-center mt-7 lg:mt-16 xl:mt-24">
            <h2 className="text-2xl lg:text-3xl xl:text-5xl text-secondary font-saira leading-3 xl:leading-9 font-semibold">2 + <br /> <span className="text-lg lg:text-lg text-white font-normal font-syne">Years of Experience</span></h2>
            <h2 className="text-2xl lg:text-3xl xl:text-5xl text-secondary font-saira leading-3 xl:leading-9 font-semibold">150+ <br /> <span className="text-lg lg:text-lg text-white font-normal font-syne">Projects completed</span></h2>
            <h2 className="text-2xl lg:text-3xl xl:text-5xl text-secondary font-saira leading-3 xl:leading-9 font-semibold">100% <br /> <span className="text-lg lg:text-lg text-white font-normal font-syne">Client Satisfactions</span></h2>
          </div> */}
        </div>
        <div className="hidden xl:block">
          <motion.img
            src="https://i.ibb.co.com/GspdVzQ/IMG-20231130-WA0007-2-1.jpg"
            alt="about"
            className={`w-full h-[600px] overflow-hidden object-cover ${isLoading ? 'blur-2xl opacity-30' : 'opacity-100'}`}
            style={{ filter: isLoading ? "blur(10px)" : "grayscale(100%)" }}
            animate={{ filter: isLoading ? "blur(10px)" : "grayscale(100%)" }}
            whileHover={{
              filter: "contrast(130%)",
              transform: "translateY(-10px) translateX(-10px)",
              boxShadow: `10px 10px 0px 0px ${theme.theme.colors.secondary}`,
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://i.ibb.co.com/GspdVzQ/IMG-20231130-WA0007-2-1.jpg";
            }}
            loading="lazy"
            onLoad={() => {
              setIsLoading(false)
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
