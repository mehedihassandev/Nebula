'use client';
import { iconHash } from '@utils/icons';
import { contacts } from '@constants/contacts';
import { ContactForm } from '@components/ContactForm';
import { IContact } from '@models/Contact';

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
    <section className="max-w-screen-2xl h-full flex-1 grid grid-cols-1 lg:grid-cols-2 items-center justify-around px-8 lg:px-14 py-16 lg:py-24 gap-10 lg:gap-5">
      <div className="text-textColor">
        <h1 className="text-xl lg:text-2xl font-normal tracking-wide capitalize font-saira">
          Let&apos;s get in touch?
        </h1>

        <p className="max-w-xl mt-6 font-syne text-sm lg:text-base leading-loose lg:leading-8 opacity-90">
          Ready to collaborate or chat about web development? I’m always open to
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
    </section>
  );
};

export default Contact;
