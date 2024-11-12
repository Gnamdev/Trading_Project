import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { store } from "@/store/Store";
import { transferMoney } from "@/store/wallet/Action";
import { DialogClose } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TransferForm() {
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.walletId,
        reqData: {
          amount: formData.amount,
          purpose: formData.purpose,
        },
      })
    );
    console.log(formData);
  }
  return (
    <div className="pt-10 space-y-5 ">
      <div className="">
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          name="amount"
          onChange={handleChange}
          value={formData.amount}
          className="py-7 "
          placeholder="$99999"
        />
      </div>

      <div className="">
        <h1 className="pb-1">Wallet Id </h1>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formData.walletId}
          className="py-7 "
          placeholder="#AFFDFD"
        />
      </div>

      <div className="">
        <h1 className="pb-1">Purpose </h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className="py-7 "
          placeholder="Gift for your Friend..."
        />
      </div>

      <DialogClose className="w-full">
        <Button onClick={handleSubmit} className="w-full py-7">
          Submit
        </Button>
      </DialogClose>
    </div>
  );
}
