import Container from "@/utils/Container";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import img2 from "../../assets/expert2.jpg";
import img1 from "../../assets/expert1.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Amazing service! Highly recommend to everyone. Amazing service! Highly recommend to everyone. service! Highly recommend to everyone.",
    img: img2,
  },
  {
    id: 2,
    text: "sdfdsfsdf service! Highly recommend to everyone. Amazing service! Highly recommend to everyone. service! Highly recommend to everyone.",
    img: img1,
  },
  {
    id: 3,
    text: "Ahell hlkl hly recommend to everyone. Amazing service! Highly recommend to everyone. service! Highly recommend to everyone.",
    img: img2,
  },
  {
    id: 4,
    text: "mm[ sd5dfsd5f8] recommend to everyone. Amazing service! Highly recommend to everyone. service! Highly recommend to everyone.",
    img: img1,
  },
  {
    id: 5,
    text: "ly recommend Amazing service! High to everyone. Amazing service! Highly recommend to everyone. service! Highly recommend to everyone.",
    img: img2,
  },
  {
    id: 6,
    text: "Top-notch service with professional staff.",
    img: img1,
  },
];

const Testimonial = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getCurrentTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(testimonials[(startIndex + i) % testimonials.length]);
    }
    return result;
  };

  return (
    <div className="py-12">
      <Container>
        <h1 className="text-center text-2xl md:text-4xl text-primary font-medium pb-16">Our Testimonials</h1>
        <div className="relative ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {getCurrentTestimonials().map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="border p-4 relative rounded-xl bg-white shadow"
                >
                  <div className="flex justify-between">
                    <BiSolidQuoteAltLeft size={50} className="text-primary" />
                    <BiSolidQuoteAltRight size={50} className="text-primary" />
                  </div>
                  <p className="text-center py-6 text-sm">{item.text}</p>
                  <div className="flex justify-center gap-2 text-orange-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <div className="absolute h-24 w-24 -top-8 left-1/2 transform -translate-x-1/2 rounded-full border-[4px] border-primary overflow-hidden bg-white">
                    <img
                      className="w-full h-full object-cover"
                      src={item.img.src}
                      alt="user"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-10 gap-6">
            <button
              onClick={handlePrev}
              className="bg-primary text-white px-4 py-2 rounded shadow"
            >
              <ChevronLeft></ChevronLeft>
            </button>
            <button
              onClick={handleNext}
              className="bg-primary text-white px-4 py-2 rounded shadow"
            >
              <ChevronRight></ChevronRight>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Testimonial;
