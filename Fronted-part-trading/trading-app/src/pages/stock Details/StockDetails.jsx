import "./StockDetails.css";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { BookmarkFilledIcon, DotIcon } from "@radix-ui/react-icons";
import { BookmarkIcon } from "lucide-react";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TreadingForm from "./TreadingForm";
import StockChart from "../Home/StockChart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "@/store/coin/Action";
import { store } from "@/store/Store";
import { addItemToWatchlist, getUserWatchList } from "@/store/watchList/Action";
import { exitInWatchlist } from "@/Utills/exitInWatchlist";

export default function StockDetails() {
  const dispatch = useDispatch();
  const { coin, watchlist } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      fetchCoinDetails({ coinId: id, jwt: localStorage.getItem("jwt") })
    );
    dispatch(getUserWatchList(localStorage.getItem("jwt")));
  }, [id]);

  function handlToAddToWatchList() {
    dispatch(
      addItemToWatchlist({
        coinId: coin.coinDetails?.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }

  return (
    <div className="p-5 mt-5">
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <div>
            <Avatar>
              <AvatarImage
                className="w-9 h-9"
                src={coin.coinDetails?.image.large}
              />
            </Avatar>

            <div className="flex items-center gap-2">
              <p>{coin.coinDetails?.symbol.toUpperCase()} </p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-500">{coin.coinDetails?.name}</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-xl font-bold">
                ${coin.coinDetails?.market_data.current_price.usd}
              </p>
              <p className="text-red-600 ">
                <span>
                  {coin.coinDetails?.market_data.market_cap_change_24h}
                </span>
                <span>
                  -
                  {
                    coin.coinDetails?.market_data
                      .market_cap_change_percentage_24h
                  }
                  %
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 ">
          <Button onClick={handlToAddToWatchList}>
            {exitInWatchlist(watchlist.items, coin.coinDetails) ? (
              <BookmarkFilledIcon className="h-6 w-6" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </Button>

          <Dialog>
            <DialogTrigger>
              <Button className="lg">Trade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How Much Do You Want To Pay </DialogTitle>
              </DialogHeader>
              <TreadingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-14  ">
        {coin.loading ? (
          <div className="w-auto h-[400px] border flex items-center justify-center">
            {" "}
            <div class="loading-wave">
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
              <div class="loading-bar"></div>
            </div>
          </div>
        ) : (
          <StockChart coinId={id} />
        )}
      </div>
    </div>
  );
}
