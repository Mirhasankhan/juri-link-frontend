"use client";
import Container from "@/utils/Container";
import Link from "next/link";
import SubMenu from "./SubMenu";
import Image from "next/image";
import {  useState } from "react";
import DropDownMenus from "./DropDownMenus";

const Header = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="bg-white">
      <Container>
        <div className="flex justify-between items-center py-8">
          <Link
            style={{
              fontFamily: "'Satisfy', cursive",
            }}
            href="/"
            className="flex text-green-600 text-3xl font-bold items-center gap-1"
          >
            Juri.Link
          </Link>
          <SubMenu></SubMenu>
          <div className="relative flex items-center gap-2">
            <Link
              className="border border-primary text-primary px-4 py-1 rounded-[4px] font-medium"
              href="/auth/login"
            >
              Login
            </Link>
            <Link
              className="border border-primary text-white bg-primary px-4 py-1 rounded-[4px] font-medium"
              href="/auth/login"
            >
              Get Started
            </Link>
            <Image
              onClick={() => setActive(!active)}
              className="h-12 rounded-full w-12 object-cover"
              height={20}
              width={20}
              alt=""
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            ></Image>
            {active && (
              <div className="absolute right-0 top-12">
                <DropDownMenus></DropDownMenus>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
