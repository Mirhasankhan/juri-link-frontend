"use client";

import Image from "next/image";
import lawyerImage from "../../assets/lawyer.jpg";
import Container from "@/utils/Container";
import { motion } from "framer-motion";
import { Clock, Lock } from "lucide-react";
import Link from "next/link";
import { SiLinuxprofessionalinstitute } from "react-icons/si";
import { HiArrowTrendingUp } from "react-icons/hi2";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ForLawyer = () => {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-8 my-24">
        {/* LEFT SECTION */}
        <motion.div
          className="col-span-2 lg:col-span-1"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="uppercase tracking-widest text-xl font-medium text-gray-600">
            Grow Your Legal Practice
          </p>
          <h1 className="text-5xl font-bold py-5">Are You a Lawyer?</h1>
          <h3 className="font-medium text-gray-600">
            Join thousands of legal professionals on our platform. Expand your
            practice, connect with qualified clients, and focus on what you do
            best.
          </h3>

          <div className="pt-8">
            <div className="flex gap-2 items-center mb-3">
              <div className=" bg-gray-100 rounded p-2">
                <HiArrowTrendingUp size={25} />
              </div>
              <div>
                <h1 className="font-medium">Grow your client base</h1>
                <p className="text-gray-800">
                  Access a steady stream of qualified leads
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className=" bg-gray-100 rounded p-2">
                <Clock size={25} />
              </div>
              <div>
                <h1 className="font-medium">Set your own rates and schedule</h1>
                <p className="text-gray-800">
                  Complete control over your practice
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className=" bg-gray-100 rounded p-2">
                <Lock size={25} />
              </div>
              <div>
                <h1 className="font-medium">Secure payment processing</h1>
                <p className="text-gray-800">Trust and reliability built in</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className=" bg-gray-100 rounded p-2">
                <SiLinuxprofessionalinstitute size={25} />
              </div>
              <div>
                <h1 className="font-medium">Professional platform</h1>
                <p className="text-gray-800">Built for legal professionals</p>
              </div>
            </div>
          </div>

          <Link href="/auth/register-lawyer">
            <button className="bg-primary/10 text-secondary px-8 py-2 rounded-[5px] mt-6 font-medium">
              Join As Lawyer
            </button>
          </Link>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="col-span-1 hidden lg:block"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={lawyerImage}
            height={800}
            width={800}
            priority
            alt="Lawyer"
            className="object-cover h-[520px] w-full rounded-[8px]"
          />
        </motion.div>
      </div>
    </Container>
  );
};

export default ForLawyer;
