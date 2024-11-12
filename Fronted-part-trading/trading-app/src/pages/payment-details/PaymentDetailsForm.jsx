import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addPaymentDetails } from "@/store/withdrawal/Action";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function PaymentDetailsForm() {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      bankName: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(
      addPaymentDetails({
        jwt: localStorage.getItem("jwt"),
        paymentDetails: data,
      })
    );
    console.log("--", data);
  };

  return (
    <div className="px-10 py-2 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-500 p-5"
                    placeholder="Goutam namdev"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC code</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-500 p-5"
                    placeholder="IFSC code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-500 p-5"
                    placeholder="***********45344"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Account Number</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-500 p-5"
                    placeholder="Confirm account number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-500 p-5"
                    placeholder="ex - SBI Bank"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose className="w-full">
            <Button type="submit" className="w-full py-5">
              Submit
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
}
