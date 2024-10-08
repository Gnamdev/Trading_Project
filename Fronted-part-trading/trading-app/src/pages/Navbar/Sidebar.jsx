import { Button } from "@/components/ui/button";
import { Sheet, SheetClose } from "@/components/ui/sheet";
import {
  DashboardIcon,
  ExitIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  ActivityIcon,
  BookmarkIcon,
  CreditCardIcon,
  LandmarkIcon,
  Wallet,
  WalletIcon,
} from "lucide-react";
import React from "react";

const manu = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <DashboardIcon className="h-6 w-6" />,
  },
  {
    name: "WatchList",
    path: "/watchlist",
    icon: <BookmarkIcon className="h-6 w-6" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityIcon className="h-6 w-6" />,
  },
  {
    name: "Wallet",
    path: "/wallet",
    icon: <WalletIcon className="h-6 w-6" />,
  },
  {
    name: "Payment Details",
    path: "/payment-details",
    icon: <LandmarkIcon className="h-6 w-6" />,
  },
  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCardIcon className="h-6 w-6" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon className="h-6 w-6" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <ExitIcon className="h-6 w-6" />,
  },
];

const Sidebar = () => {
  return (
    <div className="mt-4 space-y-4">
      {manu.map((item) => (
        <div className="" key={item.name}>
          <SheetClose className="w-full">
            <Button
              variant="outline"
              className="flex items-center gap-5 py-6 w-full "
            >
              <span className="w-7">{item.icon}</span>
              <p>{item.name}</p>
            </Button>
          </SheetClose>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
