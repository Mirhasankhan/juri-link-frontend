"use client";
import { TRoles } from "@/types/common";
import { sidebarItems } from "@/utils/generateSidebarItems";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();


  return (
    <div className="min-h-screen ">
      {sidebarItems("User" as TRoles).map((item, index) => (
        <Link key={index} href={`/${item.path}`}>
          <div
            className={`${
              pathName === `/${item.path}`
                ? "bg-[#7869ff] bg-opacity-15 text-[#7869ff] border-r-4 border-[#7869ff]"
                : ""
            } hover:bg-[#7869ff] my-1 hover:text-[#7869ff] hover:bg-opacity-15 p-3 mx-3 rounded-[4px] font-medium flex items-center`}
          >
            {item.icon && <p className="mr-2 text-xl">{<item.icon />}</p>}
            <h1>{item.title}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;