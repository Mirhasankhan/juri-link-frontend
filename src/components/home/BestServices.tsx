"use client";

import Container from "@/utils/Container";
import { motion } from "framer-motion";
import arrow from '../../assets/arrow.png'
import Image from "next/image";

const BestServices = () => {
  return (
    <Container>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <h1 className="text-green-400 text-xl pt-6 italic">Welcome to our</h1>
        <h1 className="text-2xl md:text-5xl font-medium text-primary pb-4">
          Best Spa Services in Bangladesh
        </h1>
        <Image className="mx-auto py-6" src={arrow} height={24} width={200} alt="sdfs"></Image>
        <p>
          If you are looking for the best relaxing spa services in Dhaka, then
          without any hesitation visit our Best Active Glow Spa in Gulshan. Our
          expert therapists make every effort to devote themselves to your
          service at all times to provide you complete satisfaction. Our
          mission is to provide a sanctuary that allows individuals to discover
          isolation and inner peace, free from the pressures and obligations of
          daily existence and offer you an appreciably refreshing experience,
          whether you are a resident of Dhaka or a domestic or foreign tourist,
          Active Glow Spa is here to help you experience is here for May you
          always have blissful serenity. Sincerely welcome
        </p>
      </motion.div>
    </Container>
  );
};

export default BestServices;
