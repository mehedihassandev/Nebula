'use client';
import { iconHash } from '@utils/icons';
import { contacts } from '@constants/contacts';
import { ContactForm } from '@components/ContactForm';
import { IContact } from '@models/Contact';
import { IntelliSenseTooltip } from '@components/IntelliSenseTooltip';
import { motion } from 'framer-motion';

/**
 * Renders the Contact section, displaying communication links and a contact form.
 * The purpose of this component is to provide users with direct methods of
 * reaching out for collaboration or inquiries, fostering professional connections.
 *
 * @returns The structured Contact page layout.
 */
export const Contact = () => {
  /**
   * Intercepts the default link click to open the user's default email client
   * or Gmail specifically via a compose window.
   * We do this to ensure a smooth transition to an email composition state without
   * losing the context of the portfolio.
   *
   * @param e - The mouse event triggered by clicking the email link.
   */
  const handleMailToClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(
      'https://mail.google.com/mail/?view=cm&fs=1&to=mh.web.mehedihassan@gmail.com',
      '_blank'
    );
  };

  return (
    <section className="flex-1 flex flex-col justify-start gap-y-[28px] lg:gap-y-[32px]">
      <span className="block mb-7 lg:mb-8 text-[10px] lg:text-xs text-white/30 font-mono tracking-widest uppercase cursor-pointer hover:text-white/80 transition-colors leading-7 lg:leading-8">
        {contacts.length} Channels | 1 Open Connection
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-start gap-[56px] lg:gap-[64px] pt-7 lg:pt-8">
        <div className="text-textColor">
          <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-3xl lg:text-4xl font-display font-semibold pb-7 lg:pb-8 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent leading-[56px] lg:leading-[64px]">
          Let&apos;s get in touch?
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="max-w-xl font-sans text-base lg:text-[17px] opacity-90 pb-[56px] lg:pb-[64px] leading-7 lg:leading-8">
          Ready to <IntelliSenseTooltip keyword="Collaborate" definition={[{ property: "status", value: "Open" }, { property: "responseTime", value: "< 24 hours" }]}>collaborate</IntelliSenseTooltip> or chat about <IntelliSenseTooltip keyword="WebDev" definition={[{ property: "passion", value: "High" }, { property: "coffeeCups", value: "Many" }]}>web development</IntelliSenseTooltip>? I’m always open to
          connecting with fellow developers and enthusiasts. Feel free to reach
          out!
        </motion.p>

        <div className="flex flex-col gap-y-7 lg:gap-y-8">
          {contacts.map((item: IContact, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
              className="flex items-center gap-6 group cursor-pointer h-[24px]"
              onClick={handleMailToClick}
            >
              <div className="flex items-center justify-center text-white/30 group-hover:text-secondary text-xl transition-all duration-300">
                {iconHash[item.icon as keyof typeof iconHash]}
              </div>
              <h2
                className={`text-white/60 font-sans leading-7 lg:leading-8 text-base lg:text-[17px] group-hover:text-white transition-colors duration-300`}
              >
                {item.text}
              </h2>
            </motion.div>
          ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
