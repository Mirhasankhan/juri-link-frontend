"use client";
import Profile from "@/components/profile/Profile";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useCategoriesQuery } from "@/redux/features/services/services.api";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavMenu = () => {
  const [show, setShow] = useState(false);
  const { data: categories } = useCategoriesQuery("");
  const { email } = useAppSelector(useCurrentUser);

  return (
    <div className="hidden relative md:flex items-center gap-12 dark:text-black text-sm font-medium uppercase">
      <Link className="hover:text-primary p-2 rounded-lg" href="/">
        Home
      </Link>
      <Link
        onMouseEnter={() => setShow(!show)}
        className="hover:text-primary"
        href="/services"
      >
        Services
      </Link>
      <Link className="hover:text-primary" href="/about-us">
        About Us
      </Link>
      <Link className="hover:text-primary" href="/career">
        Career
      </Link>
      {email ? (
        <div>
          <Profile></Profile>
        </div>
      ) : (
        <Link className="hover:text-primary" href="/login">
          Sign In
        </Link>
      )}
      {show && (
        <div className="z-20 absolute top-12   bg-white pr-12 shadow-md border-2 border-primary rounded-xl  p-4 grid grid-cols-2 gap-6">
          {categories?.result?.map((category: any) => (
            <Link
              href={{
                pathname: "/services",
                query: {
                  category: `${category.id}`,
                },
              }}
              className="space-y-3 hover:bg-primary p-2 cursor-pointer rounded-xl hover:text-primary hover:bg-opacity-40"
              key={category.id}
            >
              <div className="flex items-center gap-1">
                <Image
                  alt=""
                  src={category.mediaUrls[0]}
                  height={20}
                  width={20}
                ></Image>
                <p>{category.categoryName}</p>
              </div>
              <h1 className="text-xs text-gray-400">{category.overview}</h1>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavMenu;

// HAIR_COLOR
//   FACE_MAKEUP
//   BLEACH_WAXING
//   HAIR_STYLING
