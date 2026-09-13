"use client";

import { SkeletonCard } from "@/components/shared/Skeleton";
import { useServiceQuery } from "@/redux/features/services/services.api";
import Container from "@/utils/Container";
import { ChevronRight, Lightbulb, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const router = useRouter();
  const { data: service, isLoading } = useServiceQuery(serviceId);

  const { description, dyk, serviceName, serviceMedia, importance, _id } =
    service?.data?.service ?? {};

  const handleNavigate = (id: string) => {
    router.push(`/lawyers?serviceId=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Container>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-8">
          <Link
            href="/services"
            className="text-primary font-medium hover:underline"
          >
            Services
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-600 font-medium">
            {isLoading ? "Loading…" : serviceName}
          </span>
        </nav>

        {/* Hero section */}
        {isLoading ? (
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            <SkeletonCard height={380} />
            <SkeletonCard height={380} />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {/* Info card */}
            <div className="flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 rounded-[9px] bg-primary/10">
                  <Scale size={18} className="text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Practice Area
                </span>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-3 leading-snug">
                Why hire a {serviceName} lawyer?
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                {importance}
              </p>
              <button
                onClick={() => handleNavigate(_id)}
                className="mt-8 w-full py-2.5 px-4 bg-primary text-white text-sm font-medium rounded-[9px] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
              >
                Find {serviceName} Lawyers
              </button>
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 min-h-[280px]">
              <Image
                className="object-cover"
                src={serviceMedia}
                alt={serviceName ?? "Service"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        )}

        {/* Description section */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            What a{" "}
            <span className="text-primary">{serviceName}</span> lawyer can do
            for you
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Did You Know banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 mb-8 flex items-center justify-between gap-6">
          {/* Decorative circle */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
              Did You Know?
            </p>
            <p className="text-white text-sm leading-relaxed">{dyk}</p>
          </div>

          <div className="relative z-10 shrink-0 hidden sm:flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20">
            <Lightbulb size={32} className="text-white" />
          </div>
        </div>

      </Container>
    </div>
  );
};

export default ServiceDetailsPage;
