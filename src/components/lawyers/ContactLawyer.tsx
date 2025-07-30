import { GraduationCap, Mail, Phone } from "lucide-react";
import React from "react";

const ContactLawyer = () => {
  return (
    <div className="bg-primary p-6 rounded-[6px] text-white">
      <h1 className="text-center text-3xl font-medium pb-4">450</h1>
      <button className="bg-green-600 w-full py-2 rounded-[4px] text-white font-medium">
        Book Consultation
      </button>
      <button className="text-red-600 mt-3 border-red-600 border  w-full py-2 rounded-[4px]  font-medium">
        Send Message
      </button>

      <div className="flex items-center gap-2 pt-6">
        <div className="p-2 bg-blue-100 rounded-full">
          <Mail size={25} className="text-blue-800"></Mail>
        </div>
        <div>
          <small>Email</small>
          <p className="font-medium">sarah.j@gmail.com</p>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-6">
        <div className="p-2 bg-blue-100 rounded-full">
          <Phone size={25} className="text-blue-800"></Phone>
        </div>
        <div>
          <small>Phone</small>
          <p className="font-medium">01781654814</p>
        </div>
      </div>
      <div className="bg-white bg-opacity-10 text-white p-4 rounded-[6px] mt-3">
        <div className="flex gap-1">
          <GraduationCap></GraduationCap>
          <h1 className="font-medium">Education</h1>
        </div>
        <h1>Dhaka Medical College</h1>
      </div>
    </div>
  );
};

export default ContactLawyer;
