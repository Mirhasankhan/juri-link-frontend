"use client";

import Container from "@/utils/Container";
import Link from "next/link";
import SubMenu from "./SubMenu";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import DropDownMenus from "./DropDownMenus";
import SmallDeviceMenu from "./SmallDeviceMenu";
import { Menu, X, ChevronDown } from "lucide-react";
import { FaFacebookMessenger } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import logo from "../../../assets/logo.main.png";
import { useProfileQuery } from "@/redux/features/auth/authApi";

const Header = () => {
  const { data: profileData } = useProfileQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { email, role, name } = useAppSelector(useCurrentUser);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setActive(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const avatarUrl =
    profileData?.data?.profileImage ||
    "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all">
      <Container>
        <div className="flex min-h-[80px] items-center justify-between gap-4 py-3">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Juri Link home"
            className="group flex shrink-0 items-center gap-2.5 rounded-xl transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <Image
              height={64}
              width={64}
              src={logo}
              alt="JuriLink Logo"
              className="h-16 w-16 object-contain transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <SubMenu />
          </div>

          {/* Desktop Actions */}
          <div className="hidden relative lg:flex items-center gap-3">
            {!email ? (
              <div className="flex items-center gap-2">
                <Link
                  className="text-sm font-medium text-slate-700 hover:text-primary px-3.5 py-2 rounded-[8px] hover:bg-slate-50 transition-colors"
                  href="/auth/login"
                >
                  Login
                </Link>
                <Link
                  className="text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-[9px] shadow-xs hover:shadow transition-all duration-200"
                  href="/auth/register"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2.5" ref={userMenuRef}>
                <Link
                  className="relative p-2.5 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-full transition-colors"
                  href="/messages"
                  title="Messages"
                >
                  <FaFacebookMessenger className="w-5 h-5" />
                </Link>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(!active)}
                    className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full border transition-all duration-150 select-none ${
                      active
                        ? "bg-slate-100/90 border-slate-300 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Image
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20"
                      height={32}
                      width={32}
                      alt={name || "User Avatar"}
                      src={avatarUrl}
                    />
                    <div className="text-left max-w-[120px]">
                      <p className="font-semibold text-xs text-slate-900 truncate leading-tight">
                        {name || "User"}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium capitalize truncate leading-tight">
                        {role || "Client"}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        active ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {active && (
                    <div className="absolute right-0 top-full mt-2.5 z-50">
                      <DropDownMenus setActive={setActive} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger & Panel */}
          <div className="lg:hidden relative" ref={mobileMenuRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="rounded-xl p-2.5 text-slate-700 transition-colors hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <AnimatePresence>
              {isOpen && <SmallDeviceMenu setIsOpen={setIsOpen} />}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
