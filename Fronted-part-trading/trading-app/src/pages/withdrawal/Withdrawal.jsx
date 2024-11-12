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
import { store } from "@/store/Store";
import { getWidrawalHistory } from "@/store/withdrawal/Action";

export default function Withdrawal() {
  const { wallet, withdrawal } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWidrawalHistory(localStorage.getItem("jwt")));
  }, []);
  return (
    <div>
      <div className="lg:p-15 p-5">
        <h1 className="font-bold text-3xl pb-5">Withdrawal</h1>
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center py-5">Date </TableHead>
              <TableHead className="w-[120px] py-5">Method</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {withdrawal.history.map((item, index) => (
              <TableRow className="">
                <TableCell>{item.date}</TableCell>
                <TableCell className="text-left">Bank</TableCell>

                <TableCell>${item.amount}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
