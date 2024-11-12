import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

export default function AssetTable({ coin, category }) {
  const navigate = useNavigate();

  return (
    <>
      <Table>
        <ScrollArea
          className={`${category == "all" ? "h-[74vh]" : "h-[82vh]"}`}
        >
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">COIN</TableHead>
              <TableHead>SYMBOL</TableHead>
              <TableHead>VOLUME</TableHead>
              <TableHead>MARKET CAP </TableHead>
              <TableHead> 24H </TableHead>
              <TableHead className="text-right"> PRICE </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {coin?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell
                  onClick={() => navigate(`/market/${item.id}/`)}
                  className="font-medium flex items-center gap-2"
                >
                  <Avatar className="-z-50 h-10 w-10">
                    <AvatarImage src={item.image}></AvatarImage>
                  </Avatar>
                  <span>{item.name}</span>
                </TableCell>
                <TableCell>{item.symbol}</TableCell>
                <TableCell>{item.total_volume}</TableCell>
                <TableCell>{item.market_cap}</TableCell>
                <TableCell>{item.price_change_percentage_24h}</TableCell>
                <TableCell className="text-right">
                  {item.current_price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ScrollArea>
      </Table>
    </>
  );
}
