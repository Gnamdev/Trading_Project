import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, ShuffleIcon, UploadIcon, WalletIcon } from "lucide-react";
import { CopyIcon, ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import TopUpForm from "./TopUpForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  depositMoney,
  getUserWallet,
  getWalletTransection,
} from "@/store/wallet/Action";
import { store } from "@/store/Store";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Wallet() {
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();
  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id");
  const razorPayId = query.get("razorpay_payment_id");

  useEffect(() => {
    if (orderId) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId: razorPayId || paymentId,
          navigate,
        })
      );
    }
  }, [orderId, razorPayId, paymentId]);

  useEffect(() => {
    handleFetchUserWallet();
  }, []);

  function handleFetchUserWallet() {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  }
  function handleFetchWalletTransection() {
    dispatch(getWalletTransection({ jwt: localStorage.getItem("jwt") }));
  }
  return (
    <div className=" flex flex-col items-center">
      <div className="pt-10 w-full lg:w-[60%] ">
        <Card>
          <CardHeader className="pb-9">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <WalletIcon size={30}></WalletIcon>
                <div>
                  <CardTitle className="text-2xl ">My Wallet</CardTitle>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-200 text-sm">
                      #{wallet.userWallet?.id}
                    </p>

                    <CopyIcon
                      size={13}
                      className="cursor-pointer hover:text-slate-300"
                    ></CopyIcon>
                  </div>
                </div>
              </div>

              <div>
                <ReloadIcon
                  onClick={handleFetchUserWallet}
                  className="w-6 h-6 cursor-pointer hover:text-green-400"
                ></ReloadIcon>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center ">
              <DollarSign></DollarSign>
              <span className="text-2xl font-semibold">
                {" "}
                {wallet.userWallet.balance}
              </span>
            </div>

            <div className="flex gap-7  mt-7">
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <UploadIcon />

                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Top Up Your Wallet</DialogTitle>
                  </DialogHeader>
                  <TopUpForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <UploadIcon />

                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Withdrawal </DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <ShuffleIcon />

                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center ">
                      Transfer To Other Wallet{" "}
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="py-5 pt-10 ">
          <div className="flex items-center gap-2 pb-5 ">
            <h1 className="text-2xl font-semibold">History</h1>
            <UpdateIcon className="h-7 w-7 cursor-pointer p-0 hover:text-gray-400" />
          </div>

          <div className="space-y-5 ">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
              <div key={i}>
                <Card className=" px-5 flex justify-between items-center p-2 ">
                  <div className="flex items-center gap-5">
                    <Avatar>
                      <AvatarFallback>
                        <ShuffleIcon className="" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <h1>Buy Asset</h1>
                      <p className="text-sm text-gray-500">2024-07-02</p>
                    </div>
                  </div>

                  <div className="">
                    <p className={"text-green-500"}>9999 USD</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
