// components/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import lawyerImage from "../../assets/lawyer.jpg";
import Image from "next/image";
import Container from "@/utils/Container";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    company: "TechStart Inc.",
    message:
      "The legal consultation I received was exceptional. The lawyer was professional, knowledgeable, and helped me navigate complex business regulations with ease. Highly recommend this platform!",
    image: "/john.jpg",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Real Estate Developer",
    company: "Urban Properties",
    message:
      "I found the perfect lawyer for my property disputes within minutes. The platform is user-friendly, and the lawyers are highly qualified. Saved me time and money!",
    image: "/john.jpg",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Entrepreneur",
    company: "Creative Studios LLC",
    message:
      "Outstanding service! The lawyer I connected with provided clear guidance on intellectual property matters. The entire process was smooth and professional from start to finish.",
    image: "/john.jpg",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <Container>
      <section
        className="py-20"
        id="testimonials"
      >
        <div className="mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                Testimonials
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real experiences from clients who found legal solutions through
                our platform
              </p>
            </motion.div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 80,
                }}
                viewport={{ once: false }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors">
                  <Quote className="w-12 h-12" fill="currentColor" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Message */}
                <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                  &quot;{testimonial.message}&quot;
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="relative">
                    <Image
                      src={lawyerImage}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-50"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-blue-600 font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>         
        </div>
      </section>
    </Container>
  );
};

export default Testimonials;
