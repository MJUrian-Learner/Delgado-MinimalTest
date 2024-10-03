"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import { LoginUser, LoginUserSchema } from "@/schemas/LoginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ActionError from "@/components/ActionError";

export default function Login() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const form = useForm<LoginUser>({
    mode: "onTouched",
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: LoginUser) => {
    console.log(data);
  };

  return (
    <div className="w-6/12">
      <h2 className="text-center uppercase text-base lg:text-lg lg:font-light font-extralight tracking-tight opacity-90">
        Welcome back, User.
      </h2>
      <h1 className="font-mono text-center lg:text-xl lg:font-bold font-semibold  tracking-wider">
        Log In to your Account
      </h1>
      <ActionError className="my-3" message={message} errors={errors} />
      <form className="w-full">
        <Button
          variant="outline"
          className="w-full font-light text-base tracking-wider flex justify-center space-x-2 mt-1"
        >
          <span>Continue with Google</span>
        </Button>
      </form>
      <Separator className="my-5" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
          <section className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      type="email"
                      id="email"
                      label="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput id="password" label="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-light text-base tracking-wider mt-4"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Continue
          </Button>
        </form>
      </Form>

      <aside className="flex flex-col gap-y-1 xs:flex-row xs:justify-between w-full mt-1 text-sm lg:text-base font-light">
        <span>
          New User?{" "}
          <Link href="/auth/register" className="link">
            <span>Register here</span>
          </Link>
        </span>
        <Link href="/auth/forgot-password" className="link">
          <span>Forgot your password?</span>
        </Link>
      </aside>
    </div>
  );
}
