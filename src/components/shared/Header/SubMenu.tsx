'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SubMenu = () => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/lawyers', label: 'Find Lawyers' },
    { href: '/posts', label: 'Posts' },
    { href: '/premium', label: 'Premium' },
    { href: '/about-us', label: 'About Us' },
  ];

  return (
    <div className='flex items-center gap-6 text-sm sm:text-base font-medium text-gray-600'>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative transition-all duration-300 hover:text-primary 
              ${isActive ? 'text-primary font-bold' : ''}`}
          >
            <span
              className={`pb-1 inline-block relative
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full 
                after:transition-all after:duration-300
                ${isActive ? 'after:bg-primary' : 'after:bg-transparent hover:after:bg-primary'}`}
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
