import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { VerifiedIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AccountVarificationForm from "./AccountVarificationForm";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "@/store/Store";

export default function Profile() {
  function handleEnableTwoStepVarification() {
    console.log("two step verification");
  }

  const { auth } = useSelector((store) => store);
  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[80%]">
        <Card>
          <CardHeader className="pb-9">
            <CardTitle>Your information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lg:flex gap-32">
              <div className="space-y-7">
                <div className="flex ">
                  <p className="w-[9rem]">Email :</p>
                  <p className="text-gray-700">{auth.user?.email}</p>
                </div>

                <div className="flex ">
                  <p className="w-[9rem]">Full Name :</p>
                  <p className="text-gray-700">{auth.user?.fullName}</p>
                </div>

                <div className="flex ">
                  <p className="w-[9rem]"> Date of Birth :</p>
                  <p className="text-gray-700">25/02/2024</p>
                </div>

                <div className="flex ">
                  <p className="w-[9rem]">Nationality :</p>
                  <p className="text-gray-700">Indian</p>
                </div>
              </div>

              <div className="space-y-7 mt-3">
                <div className="flex ">
                  <p className="w-[9rem]">Address :</p>
                  <p className="text-gray-700">Indore</p>
                </div>

                <div className="flex ">
                  <p className="w-[9rem]">City :</p>
                  <p className="text-gray-700">goutam Namdev</p>
                </div>

                <div className="flex ">
                  <p className="w-[9rem]"> PostCode:</p>
                  <p className="text-gray-700">451221</p>
                </div>

                <div className="flex ">
                  <p className="w-[9rem]">Country :</p>
                  <p className="text-gray-700">India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-5">
          <div className="mt-6">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3 ">
                <CardTitle> 2 Step Verification</CardTitle>
                {true ? (
                  <Badge className="space-x-2 text-white bg-green-600">
                    <VerifiedIcon />
                    <span>Enabled</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">Disabled</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <div className="">
                <Dialog>
                  <DialogTrigger className="flex">
                    <Button>Enabled Two step Verification</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verify Your Account</DialogTitle>
                    </DialogHeader>

                    <AccountVarificationForm
                      handleSubmit={handleEnableTwoStepVarification}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
