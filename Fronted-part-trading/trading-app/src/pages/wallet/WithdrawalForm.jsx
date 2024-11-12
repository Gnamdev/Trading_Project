import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/store/Store";
import { withdrawalRequest } from "@/store/withdrawal/Action";

export default function WithdrawalForm() {
  const [amount, setAmount] = useState("");
  const { wallet, withdrawal } = useSelector((store) => store);
  const dispatch = useDispatch();

  function handleChange(e) {
    setAmount(e.target.value);
  }
  function handleSubmit(e) {
    dispatch(withdrawalRequest({ jwt: localStorage.getItem("jwt"), amount }));
  }

  return (
    <div className="pt-10 space-y-5 ">
      <div className="flex justify-between items-center rounded-md bg-slate-900  text-xl font-bold px-5 py-4">
        <p>Available balance</p>
        <p>${wallet.userWallet.balance}</p>
      </div>

      <div className="flex flex-col items-center">
        <h1>Enter Withdrawal amount</h1>
        <div className="flex items-center justify-center">
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawalInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center "
            placeholder="$93333"
            type="numbber"
          ></Input>
        </div>
      </div>

      <div className="">
        <p className="pb-2">Transfer to </p>
        <div className="items-center gap-5 flex border px-5 py-2 rounded-md">
          <img
            // src="https://cdn-icons-png.flaticon.com/512/10436/10436288.png"
            src="	https://cdn-icons-png.freepik.com/512/2830/2830284.png?ga=GA1.1.1745154712.1708672156"
            alt=""
            className="h-8 w-8"
          />
          <div className="">
            <p className="text-xl font-bold ">
              {withdrawal.paymentDetails?.bankName || "Yesh Bank"}{" "}
            </p>
            <p className="text-xs">
              {withdrawal.paymentDetails?.accountNumber || "*********222"}
            </p>
          </div>
        </div>

        <DialogClose className="w-full">
          <Button onClick={handleSubmit} className="w-full mt-3 py-7 text-xl ">
            Withdrawal
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
