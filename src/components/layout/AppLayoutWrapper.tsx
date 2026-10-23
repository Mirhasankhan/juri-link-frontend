"use client";

import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";
import { usePathname } from "next/navigation";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLawyerDashboard = pathname?.startsWith("/lawyer");

  if (isLawyerDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <div className="min-h-[90vh] bg-white">{children}</div>
      <Footer />
    </>
  );
}
