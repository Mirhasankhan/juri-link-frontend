import Container from "@/utils/Container";
import img1 from "../../assets/benefit1.jpg";
import img2 from "../../assets/benefits2.jpg";
import experience from "../../assets/experience.png";
import discount from "../../assets/discount.png";
import { motion } from "framer-motion";

const Benefits = () => {

  return (
   <div className=" py-12">
     <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white items-center">
        {/* Left image column with motion */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex gap-6"
        >
          <img className="w-full h-[300px] md:h-[500px]" src={img2.src} alt="Benefit 2" />
          <img className="w-full h-[300px] md:h-[500px]" src={img1.src} alt="Benefit 1" />
        </motion.div>

        {/* Right text content column with motion */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-primary text-xl font-medium">Our Benefits</h3>
          <h1 className="text-2xl md:text-4xl font-semibold py-3">Why Choose Us?</h1>
          <h2 className="text-xl md:text-2xl text-primary pb-3">Book and enjoy our special treatments</h2>
          <p>
           Experience personalized care with our expert therapists, soothing ambiance, and premium treatments tailored to your needs. We focus on holistic wellness, offering relaxation and rejuvenation for your body and mind. Trust us to deliver consistent quality, professional service, and a sanctuary where your well-being comes first.
          </p>
          <div className="grid grid-cols-4 gap-6 mt-6">
            <div className="col-span-2 flex items-center gap-3 border-r">
              <div className="bg-primary p-2 md:p-4 rounded-full">
                <img className="md:h-12 md:w-12 -8 w-8" src={experience.src} alt="Experience" />
              </div>
              <h1 className="text-xl md:text-2xl font-medium">Expert & Smart Team</h1>
            </div>
            <h1 className="col-span-2 text-sm md:text-[16px]">
             Our skilled professionals bring experience and care to every service,
  ensuring you receive exceptional results every time you visit.
            </h1>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            <div className="col-span-2 flex items-center gap-3 border-r">
              <div className="bg-primary p-2 md:p-4 rounded-full">
                <img className="md:h-12 md:w-12 -8 w-8" src={discount.src} alt="Discount" />
              </div>
              <h1 className="text-xl md:text-2xl font-medium">Low Price & Friendly</h1>
            </div>
            <h1 className="col-span-2 text-sm md:text-[16px]">
             We offer affordable pricing without compromising on quality, delivered
  with a warm and welcoming attitude every step of the way.
            </h1>
          </div>
        </motion.div>
      </div>
    </Container>
   </div>
  );
};

export default Benefits;
