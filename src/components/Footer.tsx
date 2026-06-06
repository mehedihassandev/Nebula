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
      <div className="pb-6">
        <h3 className="text-[10px] uppercase tracking-widest text-secondary/60 font-mono mb-2">Location</h3>
        <p className="text-white/80 text-xs font-mono">
          Dhaka, Bangladesh
        </p>
      </div>
      <div className="flex gap-4 text-white/30">
        {socialLinks.map((link: ISocialLink, index: number) => (
          <h3
            key={index}
            onClick={() => window.open(link.href, "_blank")}
            className="text-[18px] cursor-pointer hover:text-secondary transition-colors duration-300"
          >
            {iconHash[link.icon as keyof typeof iconHash]}
          </h3>
        ))}
      </div>

      {/* <div className="pt-2">
        <h3 className="text-sm font-sans">
          © 2024 Md. Mehedi Hassan. All Rights Reserved
        </h3>
      </div> */}
    </div>
  );
};

export default Footer;
