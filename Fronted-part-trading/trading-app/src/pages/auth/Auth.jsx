import React from "react";
import "./Auth.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";

export default function Auth() {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 ">
      <div className="h-screen w-screen relative authContainer ">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#030712] bg-opacity-50 flex justify-center items-center">
          <div className="bgBlure flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white px-10">
            <h1 className="text-4xl font-bold pb-9">
              {" "}
              <span className="font-bold text-yellow-600 ">Goutam</span>
              TradingHub{" "}
            </h1>
            {location.pathname == "/signup" ? (
              <section className="w-full ">
                <SignUpForm />
                <div className="flex items-center pb-9 justify-center gap-4 mt-3">
                  <span>Have already account?</span>
                  <Button varient="ghost" onClick={() => navigate("/signin")}>
                    Login
                  </Button>
                </div>
              </section>
            ) : location.pathname == "/forget-password" ? (
              <section className="w-full">
                <ForgetPassword />
                <div className="flex items-center pb-9 justify-center gap-4 mt-4">
                  <span>Back to login </span>
                  <Button varient="ghost" onClick={() => navigate("/signin")}>
                    Login
                  </Button>
                </div>
              </section>
            ) : (
              <section className="w-full">
                <SignInForm />
                <div className="flex items-center pb-9 justify-center gap-4 mt-4">
                  <span>Don't have account ?</span>
                  <Button varient="ghost" onClick={() => navigate("/signup")}>
                    Signup
                  </Button>
                </div>

                <div className="flex items-center pb-9 justify-center">
                  <Button
                    className="w-full py-5 bg-white bg-opacity-1"
                    varient="ghost"
                    onClick={() => navigate("/forget-password")}
                  >
                    Forgot Password
                  </Button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
