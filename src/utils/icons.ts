import { MdOutlineHorizontalRule } from 'react-icons/md';
import { createElement } from 'react';
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
  check: createElement(GiCheckMark)
};

export type IconHashType = keyof typeof iconHash;
