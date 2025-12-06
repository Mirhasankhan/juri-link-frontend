"use client";

import Image from "next/image";
import lawyerImage from "../../assets/lawyer.jpg";
import Container from "@/utils/Container";
import { GiGrowth } from "react-icons/gi";
import { motion } from "framer-motion";
import { Clock, Lock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ForLawyer = () => {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-8 my-8">
        {/* LEFT SECTION */}
        <motion.div
          className="col-span-1"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl font-medium text-gray-600">
            Grow Your Legal Practice
          </p>
          <h1 className="text-5xl font-bold py-5">Are You a Lawyer?</h1>
          <h3 className="font-medium text-gray-500">
            Join thousands of legal professionals on our platform. Expand your
            practice, connect with qualified clients, and focus on what you do
            best.
          </h3>

          <div className="pt-8">
            <div className="flex gap-2 mb-3">
              <GiGrowth size={30} />
              <div>
                <h1 className="font-medium">Grow your client base</h1>
                <p>Access a steady stream of qualified leads</p>
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <Clock size={30} />
              <div>
                <h1 className="font-medium">Set your own rates and schedule</h1>
                <p>Complete control over your practice</p>
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <Lock size={30} />
              <div>
                <h1 className="font-medium">Secure payment processing</h1>
                <p>Trust and reliability built in</p>
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <GiGrowth size={30} />
              <div>
                <h1 className="font-medium">Professional platform</h1>
                <p>Built for legal professionals</p>
              </div>
            </div>
          </div>

          <button className="bg-secondary text-white px-5 py-2 rounded-[5px] font-medium">
            Join As Lawyer
          </button>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="col-span-1"
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
            className="rounded-[8px]"
          />
        </motion.div>
      </div>
    </Container>
  );
};

export default ForLawyer;
