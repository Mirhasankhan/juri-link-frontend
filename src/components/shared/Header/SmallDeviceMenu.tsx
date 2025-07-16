"use client";
import Profile from "@/components/profile/Profile";
import logo from '../../../assets/logo9.png'
import Link from "next/link";
import { useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import Image from "next/image";

const SmallDeviceMenu = () => {
   const { email } = useAppSelector(useCurrentUser);
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative z-50">
      <button
        className="border p-2 text-primary border-primary rounded-md"
        onClick={() => setOpen(true)}
      >
        <RiMenu4Line size={20} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Slide-in menu */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <Image src={logo} alt="df" height={100} width={50}></Image>
          <IoClose
            size={24}
            className="text-black dark:text-white cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="flex flex-col items-start gap-6 p-6 text-black dark:text-white text-base font-medium uppercase">
          <Link className="hover:text-primary" href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link className="hover:text-primary" href="/services" onClick={() => setOpen(false)}>
            Services
          </Link>
          <Link className="hover:text-primary" href="/about-us" onClick={() => setOpen(false)}>
            About Us
          </Link>
          <Link className="hover:text-primary" href="/career" onClick={() => setOpen(false)}>
            Career
          </Link>
          <Link className="hover:text-primary" href="/contact" onClick={() => setOpen(false)}>
            Contact Us
          </Link>

          {email ? (
            <div>
              <Profile />
            </div>
          ) : (
            <Link className="hover:text-primary" href="/login" onClick={() => setOpen(false)}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallDeviceMenu;
