import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import AssetTable from "../Home/AssetTable";
import StockChart from "./StockChart";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Cross1Icon, DotIcon } from "@radix-ui/react-icons";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/store/Store";
import { getCoinList, getTop50CoinList } from "@/store/coin/Action";
import "./Home.css";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getChatRealChat } from "@/store/ChatBot/Action";

export default function Home() {
  const [category, setCategory] = useState("all");
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [isBotRealease, setIsBotRealease] = useState(false);

  const { coin, chatbot } = useSelector((store) => store);
  const { loading, error, responses } = chatbot;
  const [chatHistory, setChatHistory] = useState([]);
  const handlerCategory = (value) => {
    setCategory(value);
  };

  const handlerchange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      const userMessage = { message: inputValue, sender: "user" };
      setChatHistory((prev) => [...prev, userMessage]);

      dispatch(
        getChatRealChat({
          jwt: localStorage.getItem("jwt"),
          prompt: inputValue,
        })
      );
      setInputValue("");
    }
  };

  useEffect(() => {
    if (responses.length > 0) {
      const botResponse = {
        message: responses[responses.length - 1].message,
        sender: "bot",
      };
      setChatHistory((prev) => [...prev, botResponse]);
    }
  }, [responses]);

  // To handle errors
  useEffect(() => {
    if (error) {
      const errorMessage = {
        message: "Can't fetch the response, please try again!",
        sender: "bot",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    }
  }, [error]);
  const handleBotRealease = () => {
    setIsBotRealease(!isBotRealease);
  };

  useEffect(() => {
    dispatch(getCoinList(5));
  }, []);

  useEffect(() => {
    dispatch(getTop50CoinList());
  }, [category]);

  return (
    <div className="relative">
      <div className="lg:flex">
        {/* for table  */}
        <div className="lg:w-[50%] lg:border-r z-10">
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

          {coin.loading ? (
            <div className="w-auto h-[500px] border flex items-center justify-center">
              {" "}
              <div class="loading-wave">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
              </div>
            </div>
          ) : (
            <AssetTable
              coin={category == "all" ? coin.coinList : coin.top50}
              category={category}
            />
          )}
          {/* table for coins  */}

          {/* pagination  start   pandding */}
          <div className="">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* for stock chart  */}

        {console.log("coin--", coin)}
        <div className="hidden lg:block lg:w-[50%] p-5 ">
          <StockChart coinId={coin.coinList[0]?.id} />

          <div className="flex gap-5 items-center " style={{ width: 350 }}>
            <div>
              <Avatar>
                <AvatarImage src={coin.coinList[0]?.image} />
              </Avatar>
            </div>

            <div>
              <div className="flex gap-2 items-center">
                <p>{coin.coinList[0]?.symbol}</p>
                <DotIcon className="text-gray-400 "> </DotIcon>
                <p className="text-gray-400">{coin.coinList[0]?.name}</p>
              </div>

              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">
                  {" "}
                  {coin.coinList[0]?.current_price}
                </p>

                <p className="text-red-600">
                  <span>{coin.coinList[0]?.price_change_24h}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* chat obt button  */}
      <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
        {isBotRealease && (
          <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[75vh] bg-slate-900">
            <div className="flex justify-between items-center border-b px-6 h-[12%]">
              <p>Chat Bot</p>
              <Button onClick={handleBotRealease} variant="ghost" size="icon">
                <Cross1Icon />
              </Button>
            </div>

            <div className="h-[76%] flex-col flex overflow-y-auto gap-5 py-2 scroll-container">
              {chatHistory.length === 0 && (
                <div className="self-start pb-5 px-2 py-2">
                  <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                    <p>Hi, I'm your chat Bot!</p>
                    <p>You can ask me crypto-related questions.</p>
                    <p>Like price, market cap, etc.</p>
                  </div>
                </div>
              )}

              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`self-${
                    chat.sender === "user" ? "end" : "start"
                  } pb-5 px-2 py-2`}
                >
                  <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                    <p>{chat.message}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="self-start pb-5 px-2 py-2">
                  <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                    <p>Fetching...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="h-[12%] border-t">
              <Input
                className="w-full h-full order-none outline-none"
                placeholder="Write your prompt here..."
                onChange={handlerchange}
                value={inputValue}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        )}

        <div className="relative w-[10rem] cursor-pointer group">
          <Button
            onClick={handleBotRealease}
            className="w-full h-[3rem] gap-2 items-center"
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
