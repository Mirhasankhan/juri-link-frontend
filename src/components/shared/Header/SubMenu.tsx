"use client";

import { JWTDecode } from "@/utils/jwt";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SubMenu = () => {
  const { decoded } = JWTDecode();

  const role = decoded?.role;
  const pathname = usePathname();

  // Define all possible links
  const allLinks = [
    { href: "/", label: "Home" },
    { href: "/lawyers", label: "Lawyers" },
    { href: "/posts", label: "Posts" },
    { href: "/services", label: "Service Areas" },

    { href: "/premium", label: "Premium Access" },
    { href: "/about-us", label: "About Us" },
  ];

  // Filter links based on role
  const filteredLinks = allLinks.filter((link) => {
    if (!role) {
      return link.href !== "/premium" && link.href !== "/create-post";
    } else if (role === "User") {
      return link.href !== "/premium";
    } else if (role === "Lawyer") {
      return link.href !== "/create-post" && link.href !== "/lawyers";
    }
    return true;
  });

  return (
    <nav className="flex items-center gap-1">
      {filteredLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
              isActive
                ? "bg-primary/10 text-primary font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default SubMenu;
