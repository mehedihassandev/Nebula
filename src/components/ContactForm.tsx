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
    <div className="box rounded-xl">
      <div className="w-full px-8 py-5 pb-10 mx-auto overflow-hidden bg-primary rounded-xl">
        <form className="mt-4 w-full" onSubmit={formik.handleSubmit}>
          <div className="flex-1">
            <label className="block mb-2 text-md text-textColor font-saira">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="John Doe"
              className="block w-full px-5 py-3 mt-2 text-white border rounded-md bg-gray-900 border-secondary focus:border-secondary focus:ring-secondary focus:ring-opacity-40 focus:outline-none focus:ring font-syne"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 pt-2 pl-2">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="flex-1 mt-6">
            <label className="block mb-2 text-md text-textColor font-saira">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="johndoe@example.com"
              className="block w-full px-5 py-3 mt-2 text-white border rounded-md bg-gray-900 border-secondary focus:border-secondary focus:ring-secondary focus:ring-opacity-40 focus:outline-none focus:ring font-syne"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 pt-2 pl-2">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="w-full mt-6">
            <label className="block mb-2 text-md text-textColor font-saira">
              Message
            </label>
            <textarea
              className="block w-full h-32 px-5 py-3 mt-2 text-white placeholder-gray-400 border border-secondary rounded-md md:h-48 bg-gray-900 focus:border-secondary focus:ring-secondary focus:ring-opacity-40 focus:outline-none focus:ring font-syne"
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
            className={`w-full px-6 py-3 mt-6 text-md font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50 font-saira ${!formik.isValid
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-secondary text-black hover:bg-opacity-75 hover:text-white"
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
