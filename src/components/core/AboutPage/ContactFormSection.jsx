import React from "react";
import ContactUsForm from "../ContactUsPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto shadow-richblack-400 shadow-sm p-2 sm:p-5 rounded-lg ">
      <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
      <p className=" text-left w-fit sm:text-center text-richblack-300 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-12 sm:mx-auto">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
