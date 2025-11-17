import { GraduationCap, Mail, Phone } from "lucide-react";
import React from "react";

const ContactLawyer = () => {
  return (
    <div className="border rounded-[6px] ">
      <div className="bg-primary rounded-t-[5px] text-white py-8 text-center">
        <h1 className="text-5xl font-semibold">450</h1>
        <h1 className="text-2xl font-semibold py-1">Book Consultation</h1>
        <p>Get personalized guidance from our expert</p>
      </div>
      <div className="p-5">
        <button className="text-white mt-3 bg-primary border  w-full py-2 rounded-[8px]  font-medium">
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
        <div className="flex items-center gap-2 pt-6">
          <div className="p-2 bg-blue-100 rounded-full">
            <GraduationCap size={25} className="text-blue-800"></GraduationCap>
          </div>
          <div>
            <small>Phone</small>
            <p className="font-medium">Dhaka Medical College</p>
          </div>
        </div>

        <button className="text-primary mt-3 bg-white border-primary border  w-full py-2 rounded-[8px]  font-medium">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ContactLawyer;
