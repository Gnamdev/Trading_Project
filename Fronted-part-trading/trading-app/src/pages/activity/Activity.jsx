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
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "@/store/order/Action";
import { store } from "@/store/Store";
import { calculateProfit } from "@/Utills/calculateProfit";

export default function Activity() {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);
  return (
    <div className="lg:p-15 p-5">
      <h1 className="font-bold text-3xl pb-5">Activity</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center py-5">Date & Time</TableHead>
            <TableHead className="w-[120px] py-5">Treading Pair</TableHead>
            <TableHead className="text-center">Buy Price</TableHead>
            <TableHead className="text-center">Selling Price</TableHead>
            <TableHead className="text-center"> Order Type </TableHead>
            <TableHead className="text-center"> Portfolio Loss </TableHead>
            <TableHead className="text-center"> Value </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {order.orders.map((item, index) => (
            <TableRow className="">
              <TableCell>
                <p>2024/05/31</p>
                <p className="text-gray-400">12:36:55</p>
              </TableCell>
              <TableCell className="font-medium flex items-center  gap-2">
                <Avatar className="-z-50">
                  <AvatarImage src={item.orderItem?.coin.image}></AvatarImage>
                </Avatar>
                <span>{item.orderItem?.coin.name || "-"}</span>
              </TableCell>
              <TableCell>{item.orderItem?.buyPrice || "-"}</TableCell>
              <TableCell>{item.orderItem?.sellPrice || "-"}</TableCell>
              <TableCell>{item.orderItem?.coin || "-"}</TableCell>
              <TableCell>{calculateProfit(item)}</TableCell>
              <TableCell className="">{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
