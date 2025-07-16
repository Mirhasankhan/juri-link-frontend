"use client";
import { TRoles } from "@/types/common";
import { sidebarItems } from "@/utils/generateSidebarItems";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();


  return (
    <div className="min-h-screen">
      {sidebarItems("user" as TRoles).map((item, index) => (
        <Link key={index} href={`/${item.path}`}>
          <div
            className={`${
              pathName === `/${item.path}`
                ? "bg-primary  text-white border-r-4 border-orange-600"
                : ""
            } hover:bg-primary hover:text-white my-4 p-3 mx-3 rounded-[4px] font-medium flex items-center`}
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
