'use client';
import { iconHash } from '@utils/icons';
import { contacts } from '@constants/contacts';
import { ContactForm } from '@components/ContactForm';
import { IContact } from '@models/Contact';
import { IntelliSenseTooltip } from '@components/IntelliSenseTooltip';

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
    <section className="max-w-screen-2xl h-full flex-1 flex flex-col justify-center px-8 lg:px-14 py-16 lg:py-24 gap-10 lg:gap-5">
      <span className="block mb-6 text-[10px] lg:text-xs text-white/30 font-mono tracking-widest uppercase cursor-pointer hover:text-white/80 transition-colors">
        {contacts.length} Channels | 1 Open Connection
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-around gap-10 lg:gap-5">
        <div className="text-textColor">
          <h1 className="text-4xl lg:text-5xl font-saira font-semibold pb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Let&apos;s get in touch?
        </h1>

        <p className="max-w-xl mt-6 font-syne text-sm lg:text-base leading-loose lg:leading-8 opacity-90">
          Ready to <IntelliSenseTooltip keyword="Collaborate" definition={[{ property: "status", value: "Open" }, { property: "responseTime", value: "< 24 hours" }]}>collaborate</IntelliSenseTooltip> or chat about <IntelliSenseTooltip keyword="WebDev" definition={[{ property: "passion", value: "High" }, { property: "coffeeCups", value: "Many" }]}>web development</IntelliSenseTooltip>? I’m always open to
          connecting with fellow developers and enthusiasts. Feel free to reach
          out!
        </p>

        <div className="mt-6 space-y-8 md:mt-8">
          {contacts.map((item: IContact, index: number) => (
            <div
              key={index}
              className="flex items-center ml-2 gap-2 text-secondary"
            >
              {iconHash[item.icon as keyof typeof iconHash]}
              <h2
                className={`mx-2 text-textColor font-syne text-sm lg:text-base ${item.isLink && 'cursor-pointer hover:text-secondary transition-colors'}`}
                onClick={handleMailToClick}
              >
                {item.text}
              </h2>
            </div>
          ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
