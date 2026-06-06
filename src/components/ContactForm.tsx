import { useState } from "react";
import emailjs from "emailjs-com";
import { useNotification } from "@hooks/notification-hook";
import * as yup from "yup";
import { useFormik } from "formik";
import { Loader } from "@components/Loader";

const validationSchema = yup.object({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  message: yup.string().required("Message is required"),
});

/**
 * Renders the contact form allowing users to send direct messages to the developer.
 * This encapsulates the EmailJS integration and form validation to provide 
 * immediate feedback on success or failure, maintaining a professional UX.
 * 
 * @returns The Contact Form UI component.
 */
export const ContactForm = () => {
  const notify = useNotification();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "";

      const templateParams = {
        name: values.name,
        email: values.email,
        message: values.message,
      };

      emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        USER_ID
      ).then(
        (result) => {
          console.log(result.text);
          notify('Message sent successfully!', true);
          resetForm();
        },
        (error) => {
          console.log(error.text);
          notify('Failed to send message.', false);
        }
      ).finally(() => {
        setLoading(false);
      });
    },
  });

  return (
    <div className="relative w-full">
      <div className="w-full mx-auto">
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="flex-1 pb-[24px]">
            <label className="block mb-2 text-[10px] uppercase tracking-widest text-secondary/60 font-mono">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your name"
              className="block w-full h-[48px] text-sm text-white placeholder-white/20 bg-transparent border-b border-white/10 focus:border-secondary focus:outline-none font-sans transition-all duration-300"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 pt-2 text-xs font-mono">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="flex-1 pb-[24px]">
            <label className="block mb-2 text-[10px] uppercase tracking-widest text-secondary/60 font-mono">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="johndoe@example.com"
              className="block w-full h-[48px] text-sm text-white placeholder-white/20 bg-transparent border-b border-white/10 focus:border-secondary focus:outline-none font-sans transition-all duration-300"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 pt-2 text-xs font-mono">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="w-full pb-[24px]">
            <label className="block mb-2 text-[10px] uppercase tracking-widest text-secondary/60 font-mono">
              Message
            </label>
            <textarea
              className="block w-full h-[144px] py-4 text-sm text-white placeholder-white/20 bg-transparent border-b border-white/10 focus:border-secondary focus:outline-none font-sans resize-none transition-all duration-300"
              placeholder="Write your message here..."
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 pt-2 text-xs font-mono">{formik.errors.message}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className={`w-full h-[48px] text-[10px] font-mono tracking-widest uppercase transition-all duration-300 flex items-center justify-center ${!formik.isValid
              ? "border border-white/5 text-white/30 bg-transparent cursor-not-allowed"
              : "border border-secondary/30 text-secondary bg-secondary/10 hover:bg-secondary/20 hover:border-secondary/50"
              }`}
            disabled={!formik.isValid || loading}
          >
            {loading ? "Transmitting..." : "Execute Connection"}
          </button>
        </form>

        {loading && (<Loader />)}
      </div>
    </div>
  );
};

export default ContactForm;
