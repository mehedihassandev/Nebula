import { MdOutlineHorizontalRule } from 'react-icons/md';
import { createElement } from 'react';
import { 
  SiReact, 
  SiTypescript, 
  SiCss, 
  SiJson, 
  SiNpm, 
  SiGit, 
  SiMarkdown 
} from 'react-icons/si';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLocationDot,
  FaWhatsapp
} from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { RiCloseLine } from 'react-icons/ri';
import { FcCancel } from 'react-icons/fc';
import { GiCheckMark } from 'react-icons/gi';

export const iconHash = {
  dash: createElement(MdOutlineHorizontalRule),
  location: createElement(FaLocationDot),
  phone: createElement(FaPhoneAlt),
  mail: createElement(IoMdMail),
  github: createElement(FaGithub),
  linkedin: createElement(FaLinkedin),
  whatsapp: createElement(FaWhatsapp),
  facebook: createElement(FaFacebook),
  instagram: createElement(FaInstagram),
  close: createElement(RiCloseLine),
  cancel: createElement(FcCancel),
  check: createElement(GiCheckMark),
  react: createElement(SiReact, { className: "text-[#61DAFB]" }),
  typescript: createElement(SiTypescript, { className: "text-[#3178C6]" }),
  css: createElement(SiCss, { className: "text-[#1572B6]" }),
  json: createElement(SiJson, { className: "text-[#F5A922]" }),
  npm: createElement(SiNpm, { className: "text-[#CB3837]" }),
  git: createElement(SiGit, { className: "text-[#F05032]" }),
  markdown: createElement(SiMarkdown, { className: "text-[#000000] dark:text-[#FFFFFF] opacity-80" }),
};

export type IconHashType = keyof typeof iconHash;
