"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Users, FileText, Star, Info, LogOut } from "lucide-react";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

const SmallDeviceMenu = () => {
  const pathname = usePathname();
  const { email } = useAppSelector(useCurrentUser);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/lawyers", label: "Find Lawyers", icon: Users },
    { href: "/posts", label: "Posts", icon: FileText },
    { href: "/premium", label: "Premium", icon: Star },
    { href: "/about-us", label: "About Us", icon: Info },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute right-0 top-16 w-[320px] p-5 text-white rounded-2xl shadow-xl bg-black border border-gray-200 flex flex-col gap-4 z-50"
    >
      <div className="border-b pb-3">
        <h1>Menu</h1>
        <p>Legal Services Portal</p>
      </div>

      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-[5px] text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white hover:bg-white/10"
              }
            `}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        );
      })}

      {email ? (
        <div className="flex gap-2">
          <Link
            className="border border-primary text-primary px-4 py-1 rounded-[4px] font-medium"
            href="/auth/login"
          >
            Login
          </Link>
          <Link
            className="border border-primary text-white bg-primary px-4 py-1 rounded-[4px] font-medium"
            href="/auth/register"
          >
            Get Started
          </Link>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-[5px] border border-red-500 text-red-500 bg-red-500 bg-opacity-10 transition-all duration-300 font-medium"
        >
          <LogOut size={16} />
          Logout
        </button>
      )}
    </motion.div>
  );
};

export default SmallDeviceMenu;
