'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import React from 'react';

const SmallDeviceMenu = () => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/lawyers', label: 'Find Lawyers' },
    { href: '/posts', label: 'Posts' },
    { href: '/premium', label: 'Premium' },
    { href: '/about-us', label: 'About Us' },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    // Add your actual logout logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="absolute right-4 top-16 w-60 p-5 rounded-2xl shadow-xl bg-gradient-to-br from-white/90 to-gray-100 backdrop-blur-lg border border-gray-200 flex flex-col gap-4 z-50"
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group
              ${isActive ? 'text-primary font-semibold bg-primary/10' : 'text-gray-800 hover:text-primary hover:bg-primary/5'}`}
          >
            <span
              className={`inline-block relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full 
                after:transition-all after:duration-300
                ${isActive ? 'after:bg-primary' : 'after:bg-transparent group-hover:after:bg-primary'}`}
            >
              {link.label}
            </span>
          </Link>
        );
      })}

      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-600 hover:text-white hover:bg-red-500 transition-all duration-300 font-medium"
      >
        <LogOut size={16} />
        Logout
      </button>
    </motion.div>
  );
};

export default SmallDeviceMenu;
