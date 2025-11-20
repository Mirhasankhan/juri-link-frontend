import { SidbarItem, TRoles, userRoles } from "@/types/common";
import { SquareChartGantt,BookmarkPlus, Settings, Heart } from "lucide-react";

export const sidebarItems = (role: TRoles): SidbarItem[] => {
  const roleMenus: SidbarItem[] = [];

  switch (role) {
    case userRoles.USER:
      roleMenus.push({
        title: "Manage Profile",
        path: `my-profile/manage-profile`,
        icon: SquareChartGantt ,
      });    
      roleMenus.push({
        title: "Booking History",
        path: `my-profile/manage-bookings`,
        icon: BookmarkPlus,
      });
      roleMenus.push({
        title: "Favourite Lawyers",
        path: `profile/favourite`,
        icon: Heart,
      });
      roleMenus.push({
        title: "View Reviews",
        path: `profile/favourite`,
        icon: Heart,
      });
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
