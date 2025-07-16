import Image from "next/image";
import ser2 from "../../assets/servicebg2.jpeg";
import ser3 from "../../assets/servicebg3.jpeg";
import bati from "../../assets/bati.png";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Services = () => {
  return (
    <div className="mt-8">
      <div className="md:flex justify-between">
        <div className="w-full">
          <Image
            className="object-cover h-full 2xl:h-[494px] w-full"
            src={ser3}
            height={100}
            width={800}
            alt=""
          ></Image>
        </div>
        <div className="w-full text-white">
          <motion.div
            className="w-full gap-8 px-12 py-8 md:flex bg-primary"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <div className="flex flex-col text-center items-center">
              <Image src={bati} height={30} width={50} alt="sf" />
              <h1 className="text-2xl py-4 font-semibold">Hair Color</h1>
              <p>
                Transform your look with our professional hair coloring
                services, using premium products and expert techniques for
                vibrant, lasting results.
              </p>
            </div>

            <div className="flex flex-col text-center items-center">
              <Image src={bati} height={30} width={50} alt="sf" />
              <h1 className="text-2xl py-4 font-semibold">Bleach Waxing</h1>
              <p>
                Reveal smoother, brighter skin with our expert bleach waxing
                service, combining gentle bleaching and hair removal for a
                flawless finish.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="w-full gap-8 px-12 py-8 md:flex bg-primary"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <div className="flex flex-col text-center items-center">
              <Image src={bati} height={30} width={50} alt="sf" />
              <h1 className="text-2xl py-4 font-semibold">Hair Styling</h1>
              <p>
                Enhance your appearance with our expert hair styling services,
                tailored to your look using modern techniques for a polished,
                lasting finish.
              </p>
            </div>

            <div className="flex flex-col text-center items-center">
              <Image src={bati} height={30} width={50} alt="sf" />
              <h1 className="text-2xl py-4 font-semibold">Face Makeup</h1>
              <p>
                Achieve a flawless glow with our professional face makeup
                services, designed to enhance your natural beauty for any
                occasion.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="md:flex justify-between">
        <div className="md:hidden w-full">
          <Image
            className="object-cover h-full 2xl:h-[494px] w-full"
            src={ser2}
            height={100}
            width={800}
            alt=""
          ></Image>
        </div>
        <div className="w-full text-white">
          <motion.div
            className="w-full gap-8 px-12 py-8 md:flex bg-primary"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <div className="flex flex-col text-center items-center">
              <Image src={bati} height={30} width={50} alt="sf" />
              <h1 className="text-2xl py-4 font-semibold">Lashes & Brows</h1>
              <p>
                Define your look with our expert lashes and brows services,
                offering precise shaping and enhancements for a naturally
                stunning appearance.
              </p>
            </div>

            <div className="flex flex-col text-center items-center">
              <Image src={bati} height={30} width={50} alt="sf" />
              <h1 className="text-2xl py-4 font-semibold">Body Massage</h1>
              <p>
                Relax and recharge with our soothing body massage services,
                designed to relieve tension and promote overall wellness and
                balance.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="w-full gap-8 px-12 py-8 md:flex bg-primary"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <div className="flex flex-col text-center items-center">
              <Image src={bati} height={30} width={50} alt="sf" />
              <h1 className="text-2xl py-4 font-semibold">Nail Care</h1>
              <p>
                Pamper your hands and feet with our professional nail care
                services, offering meticulous grooming and stylish finishes for
                a polished look.
              </p>
            </div>

            <div className="flex flex-col text-center items-center">
              <Image src={bati} height={30} width={50} alt="sf" />
              <h1 className="text-2xl py-4 font-semibold">Facial Treatment</h1>
              <p>
                Revitalize your skin with our customized facial treatments,
                blending advanced techniques and quality products for a healthy,
                radiant glow.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="hidden md:block w-full">
          <Image
            className="object-cover h-full 2xl:h-[494px] w-full"
            src={ser2}
            height={100}
            width={800}
            alt=""
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Services;
