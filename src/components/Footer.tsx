import { motion } from "framer-motion";
import { iconHash } from "@utils/icons";
import { socialLinks } from "@constants/socialLinks";
import { ISocialLink } from "@models/SocialLink";

/**
 * Renders the global footer component containing geographic location and social links.
 * This provides consistent access to external profiles and localized context 
 * across all pages of the application.
 * 
 * @returns The Footer UI component.
 */
export const Footer = () => {

  return (
    <div>
      <div className="pb-5">
        <h3 className="text-textColor opacity-90 text-sm lg:text-base pt-4 font-syne">Based in:</h3>
        <p className="text-secondary text-lg lg:text-xl font-semibold font-saira mt-1">
          Dhaka, Bangladesh
        </p>
      </div>
      <div className="flex gap-6 text-textColor">
        {socialLinks.map((link: ISocialLink, index: number) => (
          <motion.h3
            key={index}
            onClick={() => window.open(link.href, "_blank")}
            className="text-2xl text-secondary cursor-pointer"
            whileHover={{
              scale: 1.2,
              transform: "translateY(-10px)",
            }}
          >
            {iconHash[link.icon as keyof typeof iconHash]}
          </motion.h3>
        ))}
      </div>

      {/* <div className="pt-2">
        <h3 className="text-sm font-saira">
          © 2024 Md. Mehedi Hassan. All Rights Reserved
        </h3>
      </div> */}
    </div>
  );
};

export default Footer;
