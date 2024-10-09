import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Sidebar from "../Navbar/Sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <div className="px-2 py-3 border-b bg-background bg-opacity-0 sticky top-0 left-0 right-0  flex justify-between items-center ">
      <div className="flex items-center gap-3  ">
        <Sheet>
          <SheetTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-11 w-11"
            >
              <DragHandleHorizontalIcon className="h-7 w-7 " />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 border-r-0 flex  flex-col justify-center "
          >
            <SheetHeader>
              <SheetTitle className="">
                <div className="text-2xl flex justify-center items-center gap-2 mt-10">
                  <Avatar>
                    <AvatarImage src="data:image/png;base64,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" />
                  </Avatar>
                  <div className="mt-2">
                    <span className="font-bold text-orange-700 ">Goutam</span>
                    <span>Tread</span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>

            {/* side bar  */}

            <Sidebar />
          </SheetContent>
        </Sheet>
        <p className="text-sm lg:text-base cursor-pointer">
          <span className="text-orange-700 font-bold text-2xl">Goutam</span>
          <span className="text-xl">Tead</span>
        </p>

        <div className="p-0 ml-5">
          <Button variant="outline" className="flex items-center gap-3">
            <MagnifyingGlassIcon className="" />
            <span>Search</span>
          </Button>
        </div>
      </div>

      <div className="">
        <Avatar>
          <AvatarFallback>g</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
