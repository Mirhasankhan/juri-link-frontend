// components/Testimonials.tsx
'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'John Doe',
    role: 'CEO, Example Inc.',
    message: 'This service has been a game-changer for our business!',
    image: '/john.jpg', // put your image in public folder or use a link
  },
  {
    name: 'Jane Smith',
    role: 'Marketing Head, Marketify',
    message: 'Highly professional and always delivers on time!',
    image: '/jane.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100" id="testimonials">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                type: 'spring',
                stiffness: 80,
              }}
              viewport={{ once: false }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.message}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
