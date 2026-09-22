"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Users, FileText, Star, Info, Briefcase, User } from "lucide-react";

import SignOut from "../SignOut";
import { JWTDecode } from "@/utils/jwt";

interface SmallDeviceMenuProps {
  setIsOpen: (isOpen: boolean) => void;
}

const SmallDeviceMenu = ({ setIsOpen }: SmallDeviceMenuProps) => {
  const pathname = usePathname();
  const { decoded } = JWTDecode();

  const role = decoded?.role;
  const email = decoded?.email;

  // All possible links
  const allLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/lawyers", label: "Lawyers", icon: Users },
    { href: "/posts", label: "Posts", icon: FileText },
    { href: "/services", label: "Service Areas", icon: Briefcase },
    { href: "/premium", label: "Premium Access", icon: Star },
    { href: "/about-us", label: "About Us", icon: Info },
    { href: "/my-profile/manage-profile", label: "My Profile", icon: User },
  ];

  // Filter links based on role
  const filteredLinks = allLinks.filter((link) => {
    if (!role) return link.href !== "/premium" && link.href !== "/create-post" && link.href !== "/my-profile/manage-profile";
    if (role === "User") return link.href !== "/premium";
    if (role === "Lawyer")
      return link.href !== "/create-post" && link.href !== "/lawyers";
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute right-0 top-14 w-[280px] sm:w-[320px] p-3.5 bg-white text-slate-800 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.05)] border border-slate-200/90 flex flex-col gap-1 z-50"
    >
      <div className="border-b border-slate-100 pb-2.5 mb-1 px-2.5">
        <h2 className="text-sm font-bold text-slate-900">Navigation</h2>
        <p className="text-xs text-slate-500">Legal Services Portal</p>
      </div>

      <div className="flex flex-col gap-0.5">
        {filteredLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-primary" : "text-slate-400"}`} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      {!email ? (
        <div className="flex items-center gap-2 pt-2.5 mt-1 border-t border-slate-100">
          <Link
            href="/auth/login"
            onClick={() => setIsOpen(false)}
            className="flex-1 text-center text-sm font-medium text-slate-700 hover:text-primary py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            onClick={() => setIsOpen(false)}
            className="flex-1 text-center text-sm font-semibold text-white bg-primary hover:bg-primary/90 py-2 rounded-lg shadow-xs transition-colors"
          >
            Get Started
          </Link>
        </div>
      ) : (
        <div className="pt-1.5 mt-1 border-t border-slate-100" onClick={() => setIsOpen(false)}>
          <SignOut />
        </div>
      )}
    </motion.div>
  );
};

export default SmallDeviceMenu;
