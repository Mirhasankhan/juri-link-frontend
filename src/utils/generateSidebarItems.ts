import { SidbarItem, TRoles, userRoles } from "@/types/common";
import { SquareChartGantt,BookmarkPlus, Settings, Calendar, CircleDollarSign, MessageCircleMore } from "lucide-react";

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
        title: "Earnings Summary",
        path: `my-profile/manage-earnings`,
        icon: CircleDollarSign,
      });
      roleMenus.push({
        title: "Availability ",
        path: `my-profile/availability`,
        icon: Calendar,
      });
      roleMenus.push({
        title: "View Reviews",
        path: `profile/favourite`,
        icon: MessageCircleMore,
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
