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

import React from "react";
import { useForm } from "react-hook-form";

export default function ForgetPassword() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className=" ">
      <h1 className="text-xl font-bold py-3 "> Forgot your password </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border w-full border-gray-500 p-5"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full py-5">
            Submit
          </Button>{" "}
        </form>
      </Form>
    </div>
  );
}
