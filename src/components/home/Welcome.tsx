"use client";
import { useRef, useState } from "react";
// import image1 from "../../assets/image1.png";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TbMassage } from "react-icons/tb";
import Container from "@/utils/Container";
import { GiEyelashes } from "react-icons/gi";

const videos = [
  "/videos/video2.mp4",
  "/videos/video4.mp4",
  "/videos/video1.mp4",
  "/videos/video3.mp4",
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const Welcome = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  console.log(isInView);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + videos.length) % videos.length);
  };

  return (
    <Container>
      <p className="text-primary font-medium text-center">EXPERTISE AREAS</p>
      <h1 className="text-primary pt-3 text-4xl font-semibold text-center">
        Allow your body, mind and soul <br /> sense a haven of tranquility.
      </h1>
      <div className="relative w-full mx-auto mt-4 h-[550px] flex items-center justify-center">
        <div className="w-full h-full relative overflow-hidden rounded-xl shadow-lg">
          <AnimatePresence custom={direction} mode="sync">
            <motion.div
              key={videos[index]}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <video controls className="w-full h-full object-cover rounded-xl">
                <source src={videos[index]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight size={28} />
        </button>
      </div>
      <div className="flex mt-6 w-3/4 mx-auto justify-between items-center">
        <div className="flex flex-col items-center">
          <TbMassage size={40} className="text-primary"/>
          <h1 className="pt-2 text-xl font-semibold">Wellness</h1>
        </div>
        <div className="flex flex-col items-center">
          <TbMassage size={40} className="text-primary"/>
          <h1 className="pt-2 text-xl font-semibold">Massage</h1>
        </div>
        <div className="flex flex-col items-center">
          <TbMassage size={40} className="text-primary"/>
          <h1 className="pt-2 text-xl font-semibold">Styling</h1>
        </div>
        <div className="flex flex-col items-center">
          <GiEyelashes size={40} className="text-primary"/>
          <h1 className="pt-2 text-xl font-semibold">Lashes</h1>
        </div>
       
      </div>

      {/* <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 70 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex gap-12 items-center justify-center">
          <img src={image1.src} alt="" />
          <div>
            <h1 className="text-primary text-xl italic">Wellness</h1>
            <h1 className="text-3xl font-medium py-4">
              Welcome To Home of <br /> Relaxe & Respite.
            </h1>
            <p>
              There’s nothing more luxurious and relaxing than a trip to the spa
              & Salon We <br /> offer a wide variety of body spa therapies to
              help you heal your body naturally. <br /> Get relaxed from
              stressed & hectic schedule.
            </p>
            <p>
              Everybody is looking for places where to relax and get more
              energy. In our <br /> wellness center silence, energy, beauty and
              vitality meet. The treatments we <br /> offer will refresh both
              your body and soul. We’ll be glad to welcome you and <br />{" "}
              recommend our facilities and services.
            </p>
          </div>
        </div>
      </motion.div> */}
    </Container>
  );
};

export default Welcome;
