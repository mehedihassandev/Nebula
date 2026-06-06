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
    <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl p-8 lg:p-10">
      <div className="w-full mx-auto">
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="flex-1">
            <label className="block mb-3 text-xs uppercase tracking-widest text-secondary/60 font-mono">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="John Doe"
              className="block w-full px-5 py-3 mt-2 text-sm text-white placeholder-white/20 border-b border-white/10 bg-transparent focus:border-secondary focus:outline-none font-syne transition-colors"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 pt-2 pl-2">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="flex-1 mt-6">
            <label className="block mb-3 text-xs uppercase tracking-widest text-secondary/60 font-mono">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="johndoe@example.com"
              className="block w-full px-5 py-3 mt-2 text-sm text-white placeholder-white/20 border-b border-white/10 bg-transparent focus:border-secondary focus:outline-none font-syne transition-colors"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 pt-2 pl-2">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="w-full mt-6">
            <label className="block mb-3 text-xs uppercase tracking-widest text-secondary/60 font-mono">
              Message
            </label>
            <textarea
              className="block w-full h-32 px-5 py-3 mt-2 text-sm text-white placeholder-white/20 border border-white/10 rounded-xl bg-black/20 focus:border-secondary focus:outline-none font-syne resize-none transition-colors"
              placeholder="Message"
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 pt-2 pl-2">{formik.errors.message}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className={`w-full px-6 py-4 mt-8 text-xs font-mono tracking-widest uppercase transition-all duration-300 transform rounded-xl focus:outline-none flex items-center justify-center ${!formik.isValid
              ? "border border-white/10 text-white/30 bg-transparent cursor-not-allowed"
              : "border border-secondary/30 text-secondary bg-secondary/10 hover:bg-secondary/20 hover:border-secondary/50 hover:shadow-[0_0_20px_rgba(20,255,236,0.2)]"
              }`}
            disabled={!formik.isValid || loading}
          >
            {loading ? "Sending..." : "Get in touch"}
          </button>
        </form>

        {loading && (<Loader />)}
      </div>
    </div>
  );
};

export default ContactForm;
