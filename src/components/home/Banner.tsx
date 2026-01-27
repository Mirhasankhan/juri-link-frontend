"use client";

import { useServicesQuery } from "@/redux/features/services/services.api";
import { MoveRight, Scale } from "lucide-react";
import { useRouter } from "next/navigation";

const Banner = () => {
  const { data: legalServies } = useServicesQuery("");
  const router = useRouter();

  const handleBook = (id: string) => {
    router.push(`/lawyers?serviceId=${id}`);
  };

  return (
    <div className="relative w-full xl:h-[600px] 2xl:h-[900px] z-20 h-[500px] overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/video22.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-5" />

      {/* Content Container */}
      <div className="relative z-10 text-white h-full w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
            <Scale className="w-4 h-4" />
            <span className="text-sm font-medium">Trusted Legal Platform</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-center text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fade-in-up mb-6 max-w-5xl">
          Find the Right{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Legal Expert
          </span>{" "}
          <br className="hidden sm:block" />
          for Your Needs
        </h1>

        {/* Subtitle */}
        <p className="text-center mt-2 text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl leading-relaxed animate-fade-in px-4">
          Connect with qualified lawyers, post your legal requirements, and get
          expert legal assistance when you need it most.
        </p>

        {/* Search Bar (Optional - commented out originally) */}
        {/* <div className="w-full max-w-2xl mt-8 animate-fade-in-up-delay">
          <div className="relative">
            <input
              className="w-full py-4 pl-14 pr-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              type="text"
              placeholder="Search for legal services..."
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          </div>
        </div> */}

        {/* Service Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mt-8 lg:mt-10 animate-fade-in-up-delay max-w-5xl px-4">
          {legalServies?.data
            ?.slice(0, 4)
            .map((service: { serviceName: string; _id: string }) => (
              <button
                onClick={() => handleBook(service._id)}
                className="group relative bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 hover:border-white/50 flex items-center gap-2 font-semibold text-sm sm:text-base lg:text-lg px-4 sm:px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                key={service._id}
              >
                <span className="relative z-10">{service?.serviceName}</span>
                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300" />
              </button>
            ))}
        </div>

        {/* Stats or Trust Indicators */}
        <div className="hidden lg:flex items-center gap-8 mt-12 animate-fade-in-up-delay-2">
          <div className="text-center">
            <div className="text-3xl font-bold">1000+</div>
            <div className="text-sm text-gray-300 mt-1">Verified Lawyers</div>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-sm text-gray-300 mt-1">Cases Resolved</div>
          </div>
          <div className="w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl font-bold">98%</div>
            <div className="text-sm text-gray-300 mt-1">
              Client Satisfaction
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .animate-fade-in-up-delay {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        .animate-fade-in-up-delay-2 {
          animation: fadeInUp 0.8s ease-out 0.8s both;
        }
      `}</style>
    </div>
  );
};

export default Banner;
