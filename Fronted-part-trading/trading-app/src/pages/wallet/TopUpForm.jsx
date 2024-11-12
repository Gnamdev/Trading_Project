import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/store/Store";
import { paymentHandler } from "@/store/wallet/Action";
export default function TopUpForm() {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();
  function handlePaymentMethodChange(value) {
    setPaymentMethod(value);
  }

  function handleChange(e) {
    setAmount(e.target.value);
  }

  function handleSubmit(event) {
    // event.prevaentDefayult();

    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount,
      })
    );
    console.log(amount, paymentMethod);
  }

  return (
    <div
      className="pt-10
  space-y-5 "
    >
      <div>
        <h1 className="pb-1"> Enter Amount</h1>
        <Input
          className="py-7 text-lg "
          placeholder="$99999"
          onChange={handleChange}
        ></Input>
      </div>

      <div>
        <h1 className="pb-1">Select Payment Method</h1>

        <RadioGroup
          onValueChange={(value) => handlePaymentMethodChange(value)}
          defaultValue="RAZORPAY"
          className="flex"
        >
          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              value="RAZORPAY"
              id="r1"
            ></RadioGroupItem>
            <Label htmlFor="r1">
              <div className="bg-white rounded-md px-5 w-32 py-2">
                <img
                  className="h-10"
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                  alt=""
                />
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              value="STRIPE"
              id="r2"
            ></RadioGroupItem>{" "}
            <Label htmlFor="r2">
              <div className="bg-white rounded-md px-5 w-32 py-2">
                <img
                  className="h-10"
                  height={10}
                  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                  alt=""
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button onClick={handleSubmit} className="w-full py-7 ">
        Submit
      </Button>
    </div>
  );
}
