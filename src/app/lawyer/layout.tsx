"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.main.png";
import {
  LayoutDashboard,
  CalendarCheck,
  CircleDollarSign,
  CalendarClock,
  Crown,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, useCurrentUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";

interface NavItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    title: "Live Overview",
    path: "/lawyer/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Orders & Bookings",
    path: "/lawyer/orders",
    icon: CalendarCheck,
  },
  {
    title: "Earnings & Payouts",
    path: "/lawyer/earnings",
    icon: CircleDollarSign,
  },
  {
    title: "Availability Schedule",
    path: "/lawyer/availability",
    icon: CalendarClock,
  },
  {
    title: "Premium Access",
    path: "/lawyer/premium",
    icon: Crown,
    badge: "PRO",
  },
  {
    title: "Client Messages",
    path: "/lawyer/messages",
    icon: MessageSquare,
  },
  {
    title: "Profile & Settings",
    path: "/lawyer/settings",
    icon: Settings,
  },
];

export default function LawyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: profileData } = useProfileQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const currentUser = useAppSelector(useCurrentUser);

  const lawyerName =
    profileData?.data?.fullName || currentUser?.name || "Counselor";
  const avatarUrl =
    profileData?.data?.profileImage ||
    "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png";

  const handleSignOut = () => {
    dispatch(
      setUser({
        name: "",
        email: "",
        role: "",
        token: "",
      })
    );
    Cookies.remove("token");
    router.push("/auth/login");
  };

  // Close sidebar on mobile navigation
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col lg:flex-row antialiased">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Lawyer Dashboard Sidebar */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50
          w-[280px] bg-white border-r border-slate-200/90 shadow-xl lg:shadow-none
          flex flex-col justify-between
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:static lg:h-screen lg:sticky lg:top-0
        `}
      >
        {/* Sidebar Header Brand */}
        <div>
          <div className="h-20 px-6 border-b border-slate-100 flex items-center justify-between">
            <Link
              href="/lawyer/dashboard"
              className="flex items-center gap-3 group"
            >
              <Image
                src={logo}
                alt="Juri Link"
                width={44}
                height={44}
                className="h-16 w-16 object-contain transition-transform group-hover:scale-105"
                priority
              />
              <div className="text-primary border text-xs px-2 py-1 rounded-[5px] font-medium">               
               
                
                  <h1>Lawyer Portal</h1>
                
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-230px)]">           

            {navItems.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/lawyer/dashboard" && pathname.startsWith(item.path));
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    group flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm
                    transition-all duration-150 select-none
                    ${isActive
                      ? "bg-primary text-white font-semibold shadow-md shadow-primary/20"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      size={18}
                      className={`shrink-0 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                        }`}
                    />
                    <span className="truncate">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full  tracking-wider ${isActive
                            ? "bg-white/20 text-white"
                            : "bg-amber-100 text-amber-800"
                          }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <ChevronRight size={14} className="text-white/70" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer - Sign Out */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-medium text-xs text-rose-600 bg-rose-50/70 hover:bg-rose-100/70 transition-colors"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Top Header Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/lawyer/messages"
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-primary hover:bg-slate-100 transition-colors"
              title="Client Messages"
            >
              <MessageSquare size={19} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white" />
            </Link>

            <Link
              href="/lawyer/settings"
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-slate-200/80 bg-slate-50 hover:bg-slate-100 transition-all select-none"
            >
              <Image
                src={avatarUrl}
                alt={lawyerName}
                width={30}
                height={30}
                unoptimized
                className="w-7 h-7 rounded-full object-cover ring-2 ring-primary/20"
              />
              <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                {lawyerName.split(" ")[0]}
              </span>
            </Link>
          </div>
        </header>

        {/* Dashboard Main Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
