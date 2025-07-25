import Container from "@/utils/Container";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="bg-blue-700 py-10">
        <Container>
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl lg:text-4xl font-medium pb-4 text-white">
              Ready to Get Legal Help?
            </h1>
            <p className="text-white pb-4">
              Join thousands of satisfied clients who found the right legal
              <br /> representation through LegalConnect.
            </p>
            <div className="flex gap-6">
              <button className="bg-primary text-white py-2 px-6 rounded-[4px] font-medium">
                Get Started Today
              </button>
              <button className="bg-white text-primary border border-primary py-2 px-6 rounded-[4px] font-medium">
                Browse Lawyers
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-blue-700 bg-opacity-85 py-8 text-white ">
        <Container>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 border-b pb-6 border-blue-800">
            <div>
              <h1>Logo</h1>
              <p>details</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-medium">For Clients</h1>
              <Link href="/lawyers">Find Lawyers</Link>
              <Link href="/lawyers">Browse Services</Link>
              <Link href="/lawyers">Post Requests</Link>
              <Link href="/lawyers">How It Works</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-medium">For Lawyers</h1>
              <Link href="/lawyers">Join As Lawyer</Link>
              <Link href="/lawyers">Post Services</Link>
              <Link href="/lawyers">Benefits</Link>
              <Link href="/lawyers">Pricing</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-medium">Support</h1>
              <Link href="/lawyers">Contact Us</Link>
              <Link href="/lawyers">Help Center</Link>
              <Link href="/lawyers">Privacy Policy</Link>
              <Link href="/lawyers">Terms of Service</Link>
            </div>
           
          </div>
        </Container>
      </div>
      <p className="pb-6 text-center bg-blue-700 text-white bg-opacity-85">
        © 2024 LegalConnect. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
