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
import { getUserAsset } from "@/store/Asset/Action";
import { store } from "@/store/Store";

export default function Portfolio() {
  const dispatch = useDispatch();
  const { asset } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAsset(localStorage.getItem("jwt")));
  }, []);
  return (
    <div className="lg:p-15 p-5">
      <h1 className="font-bold text-3xl pb-5">Portfolio</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ASSET</TableHead>
            <TableHead className="text-center">PRICE</TableHead>
            <TableHead className="text-center">UNIT</TableHead>
            <TableHead className="text-center">CHANGE </TableHead>
            <TableHead className="text-center">CHANGE(%)</TableHead>
            <TableHead className="text-right"> VALUE </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {asset.userAssets.map((item, index) => (
            <TableRow>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage src={item.coin.image}></AvatarImage>
                </Avatar>
                <span>{item.coin.name}</span>
              </TableCell>
              <TableCell>{item.coin.symbol.toUpperCase()}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.coin.price_change_24h}</TableCell>
              <TableCell>{item.coin.price_change_percentage_24h}</TableCell>
              <TableCell className="text-right">
                {item.coin.total_volume}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
