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
    <div className="flex items-center gap-6 text-sm sm:text-base font-medium text-gray-600">
      {filteredLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative transition-all duration-300 hover:text-secondary 
              ${isActive ? "text-secondary font-bold" : ""}`}
          >
            <span
              className={`pb-1 inline-block relative
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full 
                after:transition-all after:duration-300
                ${
                  isActive
                    ? "after:bg-primary"
                    : "after:bg-transparent hover:after:bg-primary"
                }`}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default SubMenu;
