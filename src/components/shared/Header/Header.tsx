"use client";
import Container from "@/utils/Container";
import Link from "next/link";
import SubMenu from "./SubMenu";
import Image from "next/image";
import { useState } from "react";
import DropDownMenus from "./DropDownMenus";
import SmallDeviceMenu from "./SmallDeviceMenu";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import logo from '../../../assets/logo3.png'

const Header = () => {
  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { email, role, name } = useAppSelector(useCurrentUser);

  return (
    <div className="bg-white border-b">
      <Container>
        <div className="flex justify-between items-center py-6">
          <Link
            style={{
              fontFamily: "'Satisfy', cursive",
            }}
            href="/"
            className="flex text-green-600 text-3xl font-bold items-center gap-1"
          >
            
            <Image height={60} width={60} src={logo} alt="logo"></Image>
          </Link>
          <div className="hidden md:block">
            <SubMenu></SubMenu>
          </div>
          <div className="hidden relative md:flex items-center gap-2">
            {!email ? (
              <>
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
              </>
            ) : (
              <div
                onClick={() => setActive(!active)}
                className="p-1 rounded-[8px] shadow cursor-pointer flex items-center gap-1"
              >
                <Image
                  className="h-8 rounded-full w-8 object-cover"
                  height={20}
                  width={20}
                  alt=""
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                ></Image>
                <div>
                  <h1 className="font-semibold">{name}</h1>
                  <h1 className="text-xs">{role}</h1>
                </div>
              </div>
            )}

            {active && (
              <div className="absolute right-0 top-16">
                <DropDownMenus setActive={setActive}></DropDownMenus>
              </div>
            )}
          </div>
          <div className="md:hidden relative">
            {!isOpen && (
              <Menu
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
              ></Menu>
            )}
            {isOpen && (
              <X
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              ></X>
            )}
            {isOpen && (
              <AnimatePresence>{isOpen && <SmallDeviceMenu />}</AnimatePresence>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
