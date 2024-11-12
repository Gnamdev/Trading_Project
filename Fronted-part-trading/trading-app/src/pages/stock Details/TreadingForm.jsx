import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAssetDetails } from "@/store/Asset/Action";
import { payOrder } from "@/store/order/Action";
import { store } from "@/store/Store";
import { getUserWallet } from "@/store/wallet/Action";
import { Avatar } from "@radix-ui/react-avatar";
import { DotIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TreadingForm() {
  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuntity] = useState(0.0);
  const { coin, wallet, asset } = useSelector((store) => store);
  const dispatch = useDispatch();

  function handleChange(e) {
    const amount = e.target.value;
    setAmount(amount);

    const volume = calculatebyCost(
      amount,
      coin.coinDetails.market_data.current_price.usd
    );

    console.log("volume ----->", volume);
    setQuntity(volume);
    console.log("quantity ----->", quantity);
  }

  function calculatebyCost(amount, price) {
    let volume = amount / price;
    let decimalPlaces = Math.max(2, price.toString().split(".")[0].length);
    return volume.toFixed(decimalPlaces);
  }

  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(
      getAssetDetails({
        coinId: coin.coinDetails?.coinById,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);

  function handleBuyCrypto() {
    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount,
        orderData: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
        },
      })
    );
  }

  return (
    <div className="space-y-10 p-5">
      <div>
        <div className="flex gap-4 items-center justify-between ">
          <Input
            className="py-7 focus:outline-none "
            placeholder="Entere Amount"
            onChange={handleChange}
            type="number"
            name="amount"
          />

          <div className="">
            <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md overflow-hidden">
              {quantity}
            </p>
          </div>
        </div>
        {wallet.userWallet?.balance <= 0 && (
          <h1
            className="text-red-500 text-center pt-4
          "
          >
            Opps..Insufficent wallet balance please add Money
          </h1>
        )}
      </div>
      <div className="flex gap-5 items-center border px-4 py-5">
        <div>
          <Avatar>
            <AvatarImage className="w-9 h-9" src={coin.coinDetails?.image} />
          </Avatar>

          <div className="flex items-center gap-2">
            <p>{coin.coinDetails?.symbol.toUpperCase()} </p>
            <DotIcon className="text-gray-400"></DotIcon>
            <p className="text-gray-500">{coin.coinDetails?.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xl font-bold">
              ${coin?.coinDetails?.market_data.current_price.usd}
            </p>
            <p className="text-red-600 ">
              <span>{222}</span>
              <span>{-0.34343434}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Order Type </p>
        <p>Market Order</p>
      </div>

      <div className="flex items-center justify-between">
        <p>{orderType == "BUY" ? "Available Case " : "Available Quntity"}</p>

        <p>
          {orderType == "BUY"
            ? "$" + wallet.userWallet?.balance
            : asset.getAssetDetails?.quntity || 0}
        </p>
      </div>

      <div>
        <Button
          onClick={handleBuyCrypto}
          className={`w-full py-6 ${
            orderType == "SELL"
              ? "bg-red-600 text-white "
              : "bg-green-600 text-white"
          } "`}
        >
          {orderType}
        </Button>
        <Button
          variant="link"
          onClick={() => setOrderType(orderType == "BUY" ? "SELL" : "BUY")}
          className="w-full mt-5 text-xl"
        >
          {orderType == "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
}
