"use client";

import { useServicesQuery } from "@/redux/features/services/services.api";
import { MoveRight, Scale } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Banner = () => {
  const { data: legalServices } = useServicesQuery("");
  const router = useRouter();

  const handleBook = (id: string) => {
    router.push(`/lawyers?serviceId=${id}`);
  };

  return (
    <div className="relative w-full min-h-[620px] lg:min-h-[720px] xl:min-h-[780px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Video with Subtle Parallax Feel */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 scale-105 transition-transform duration-1000"
      >
        <source src="/videos/video22.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Modern Multi-Layer Gradient Overlays for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/75 to-slate-950/95 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/30 via-transparent to-transparent z-0 pointer-events-none" />

      {/* Decorative Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col items-center text-center">


        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.15] mb-6"
        >
          Find the Right{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-sky-300">
            Legal Expert
          </span>{" "}
          for Your Needs
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 font-normal"
        >
          Connect with qualified lawyers, post your legal requirements, and receive
          tailored consultation online or in person when you need it most.
        </motion.p>

        {/* Quick Service Discovery Chips */}
        {legalServices?.data && legalServices.data.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="w-full max-w-3xl mb-12"
          >
            <p className="text-xs  tracking-wider text-slate-400 font-semibold mb-3">
              Popular Practice Areas
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {legalServices.data
                .slice(0, 5)
                .map((service: { serviceName: string; _id: string }) => (
                  <button
                    key={service._id}
                    onClick={() => handleBook(service._id)}
                    className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 hover:border-teal-400/40 text-slate-100 hover:text-white text-xs sm:text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm hover:shadow-teal-500/10"
                  >
                    <Scale className="w-3.5 h-3.5 text-teal-400 transition-transform group-hover:scale-110" />
                    <span>{service.serviceName}</span>
                    <MoveRight className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
            </div>
          </motion.div>
        )}


      </div>
    </div>
  );
};

export default Banner;
