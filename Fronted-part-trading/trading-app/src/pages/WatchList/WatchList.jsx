import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";

import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "@/store/wallet/Action";
import { addItemToWatchlist, getUserWatchList } from "@/store/watchList/Action";
import { store } from "@/store/Store";
import { exitInWatchlist } from "@/Utills/exitInWatchlist";

export default function WatchList() {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.watchlist);

  // function handlerToRemove(value) {
  //   dispatch(
  //     addItemToWatchlist({
  //       coinId: value,
  //       jwt: localStorage.getItem("jwt"),
  //     })
  //   );
  // }

  function handlerToRemove(coinId) {
    dispatch(
      addItemToWatchlist({
        coinId,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }

  useEffect(() => {
    dispatch(getUserWatchList(localStorage.getItem("jwt")));
  }, [dispatch]);
  return (
    <div className="lg:p-15 p-5">
      <h1 className="font-bold text-3xl pb-5">WatchList</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] py-5">Coin</TableHead>
            <TableHead className="text-center">SYMBOLE</TableHead>
            <TableHead className="text-center">VOLUME</TableHead>
            <TableHead className="text-center">MARKET CAP </TableHead>
            <TableHead className="text-center">24 HR</TableHead>
            <TableHead className="text-center"> PRICE </TableHead>
            <TableHead className="text-center text-red-800"> Remove </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow className="">
              <TableCell className="font-medium flex items-center  overflow-hidden gap-3">
                <Avatar className="-z-50 w-14 h-14  ">
                  <AvatarImage
                    className="rounded-full"
                    src={item.image}
                  ></AvatarImage>{" "}
                </Avatar>
                <span>{item.name}</span>
              </TableCell>
              <TableCell>{item.symbol}</TableCell>
              <TableCell>{item?.total_volume}</TableCell>
              <TableCell>{item.market_cap}</TableCell>
              <TableCell>{item.price_change_percentage_24h}</TableCell>
              <TableCell className="text-right">
                ${item.current_price}.00
              </TableCell>

              <div className=" absolute mt-4 ml-3">
                <Button
                  variant="ghost"
                  className="h-10 w-10  "
                  size="icon"
                  onClick={() => handlerToRemove(item.id)}
                >
                  <BookmarkFilledIcon className="w-6 h-6 " />
                </Button>
              </div>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
