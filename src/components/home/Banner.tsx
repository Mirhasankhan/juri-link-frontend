import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import image1 from "../../assets/banner3.avif";
import image2 from "../../assets/banner4.avif";
import image3 from "../../assets/banner.avif";
import Link from "next/link";

const banners = [
  {
    id: 1,
    subHeading: "Best Place For You",
    heading: "SPA AND BEAUTY SALON",
    buttonText: "Get Appointment",
    image: `url(${image1.src})`,
    overview:
      "Step into a world of tranquility and elegance at our spa and beauty salon. We offer a wide variety of personalized treatments to help you relax, refresh, and enhance your natural beauty in a peaceful and luxurious environment.",
  },
  {
    id: 2,
    subHeading: "Luxury Spa Service",
    heading: "EXCLUSIVE CARE FOR YOUR FACE",
    buttonText: "Get Appointment",
    image: `url(${image2.src})`,
    overview:
      "Discover the ultimate facial experience with our premium skincare services. Our expert aestheticians use top-of-the-line products and techniques to cleanse, hydrate, and revitalize your skin, leaving it soft, radiant, and glowing with health.",
  },
  {
    id: 3,
    subHeading: "Revitalizing Message",
    heading: "EXPERT HAIR STYLING",
    buttonText: "Get Appointment",
    image: `url(${image3.src})`,
    overview:
      "Whether you're looking for a bold new look or a simple trim, our professional hairstylists are here to bring your vision to life. Enjoy customized styling, cutting, and hair care services that suit your personality and lifestyle perfectly.",
  },
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={banners[index].id}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute w-full h-[300px] md:h-[550px] 2xl:h-[800px] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: banners[index].image }}
        >
          <div className="text-white h-full flex flex-col gap-6 items-center justify-center w-full bg-black bg-opacity-50 p-3 md:p-6 rounded-lg text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            >
              <p
                style={{
                  fontFamily: "'Satisfy', cursive",
                }}
                className="text-primary text-xl md:text-2xl"
              >
                {banners[index].subHeading}
              </p>
              <h1 className="text-xl md:text-3xl xl:text-6xl py-3 md:py-5 font-medium text-white">
                {banners[index].heading}
              </h1>
              <h1 className="text-sm md:text-xl py-2 md:py-5 text-white">
                {banners[index].overview.match(/.{1,100}/g)?.map((chunk, i) => (
                  <span key={i}>
                    {chunk}
                    <br />
                  </span>
                ))}
              </h1>

              <Link href="/book-appointment">
                <button className="px-4 py-2 bg-primary font-medium border-primary rounded-[10px] border">
                  {banners[index].buttonText}
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Banner;
