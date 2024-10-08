import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AssetTable from "../Home/AssetTable";
import StockChart from "./StockChart";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Cross1Icon, DotIcon } from "@radix-ui/react-icons";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [category, setCategory] = useState("all");

  const [inputValue, setInputValue] = useState("");
  const [isBotRealease, setIsBotRealease] = useState(false);

  const handlerCategory = (value) => {
    setCategory(value);
  };

  const handlerchange = (e) => {
    setInputValue(e.target.value);
  };

  const handlerKeyPress = (event) => {
    if (event.kay == "Enter") {
      console.log(inputValue);
    }

    setInputValue("");
  };

  const handleBotRealease = () => {
    setIsBotRealease(!isBotRealease);
  };

  return (
    <div className="relative">
      <div className="lg:flex">
        {/* for table  */}
        <div className="lg:w-[50%] lg:border-r ">
          <div className="p-3 flex items-center gap-4">
            {/* all button  */}
            <Button
              onClick={() => handlerCategory("all")}
              variant={category == "all" ? "default" : "outline"}
              className="rounded-full"
            >
              All
            </Button>

            <Button
              onClick={() => handlerCategory("top50")}
              variant={category == "top50" ? "default" : "outline"}
              className="rounded-full"
            >
              Top 50
            </Button>

            <Button
              onClick={() => handlerCategory("topGainer")}
              variant={category == "topGainer" ? "default" : "outline"}
              className="rounded-full"
            >
              Top Gainers
            </Button>

            <Button
              onClick={() => handlerCategory("topLosers")}
              variant={category == "topLosers" ? "default" : "outline"}
              className="rounded-full"
            >
              Top Losers
            </Button>
          </div>
          {/* table for coins  */}
          <AssetTable />
        </div>

        {/* for stock chart  */}
        <div className="hidden lg:block lg:w-[50%] p-5 ">
          <StockChart />

          <div className="flex gap-5 items-center " style={{ width: 278 }}>
            <div>
              <Avatar>
                <AvatarImage
                  src={
                    " https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
                  }
                />
              </Avatar>
            </div>

            <div>
              <div className="flex gap-2 items-center">
                <p>ETH</p>
                <DotIcon className="text-gray-400 "> </DotIcon>
                <p className="text-gray-400">Ethereum</p>
              </div>

              <div className="flex items-end gap-2">
                <p className="text-xl font-bold"> 8564</p>

                <p className="text-red-600">
                  <span>-131990565664.54545</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* chat obt button  */}

      <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
        {/* for chat space  */}

        {isBotRealease && (
          <div
            className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25] h-[75vh] bg-slate-900
    "
          >
            <div className="flex justify-between items-center border-b px-6 h-[12%]">
              <p>Chat Bot </p>
              <Button
                onClick={handleBotRealease}
                variant="ghost"
                size="icon"
                className=""
              >
                <Cross1Icon />
              </Button>
            </div>

            <div className="h-[76%] flex-col flex overflow-y-auto gap-5 py-2 scroll-container">
              <div className="self-start pb-5 px-2 py-2">
                <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                  <p>hi , goutam Namdev</p>
                  <p>you can ask crypto related any qustion </p>
                  <p>like , pprice , market cap extra ...</p>
                </div>
              </div>

              {[1, 1, 1, 1, 1].map((item, i) => (
                <div
                  key={i}
                  className={`   
            ${i % 2 == 0 ? "self-start " : "self-end"} pb-5 px-2 py-2"`}
                >
                  {i % 2 == 0 ? (
                    <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                      <p>prompt , who are you ?</p>
                    </div>
                  ) : (
                    <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                      <p>Ans hi , Goutam namdev</p>
                    </div>
                  )}

                  {/* loading pannding */}
                </div>
              ))}
            </div>
            <div className="h-[12%] border-t">
              <Input
                className="w-full h-full order-none outline-none"
                placeholder="write prompt here .."
                onChange={handlerchange}
                value={inputValue}
                onKeyPress={handlerKeyPress}
              />
            </div>
          </div>
        )}

        <div className="relative  w-[10rem] cursor-pointer group">
          <Button
            onClick={handleBotRealease}
            className="w-full h-[3rem] gap-2 items-center "
          >
            <MessageCircle
              className="fill-[#1e293b] -rotate-90 stroke-none group-hover:fill-[#1a1a1a]"
              size={30}
            />
            <span className="text-2xl">Chat Bot</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
