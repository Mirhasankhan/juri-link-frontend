import { SidbarItem, TRoles, userRoles } from "@/types/common";
import { SquareChartGantt,BookmarkPlus, Settings } from "lucide-react";

export const sidebarItems = (role: TRoles): SidbarItem[] => {
  const roleMenus: SidbarItem[] = [];

  switch (role) {
    case userRoles.USER:
      roleMenus.push({
        title: "Manage Profile",
        path: `profile/overview`,
        icon: SquareChartGantt ,
      });    
      roleMenus.push({
        title: "My Appoinments",
        path: `profile/appoinments`,
        icon: BookmarkPlus,
      });
      // roleMenus.push({
      //   title: "Favourite Services",
      //   path: `profile/favourite`,
      //   icon: Heart,
      // });
      roleMenus.push({
        title: "Settings",
        path: `profile/settings`,
        icon: Settings,
      });

      break;
    default:
      break;
  }
  return [...roleMenus];
};
