"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { TLoginValues } from "@/types/common";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [active, setActive] = useState("client");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
    console.log(data);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 p-2 via-blue-50 to-indigo-100 py-12 min-h-screen">
      <div className="text-center">
        <h1 className="text-primary text-xl font-medium"> Join Juri Link</h1>
        <p className="font-medium pb-3 text-gray-500">
          Create your account to get started
        </p>
      </div>
      <div className="w-full mb-4 flex justify-between font-medium cursor-pointer items-center bg-gray-100 p-1 md:w-2/5 xl:w-1/3 2xl:w-1/4 shadow-md mx-auto">
        <h1
          onClick={() => setActive("client")}
          className={`w-full rounded-[4px] ${
            active == "client" ? "bg-white" : "bg-transparent"
          } py-1 text-center`}
        >
          Client
        </h1>
        <h1
          onClick={() => setActive("lawyer")}
          className={`w-full rounded-[4px]  ${
            active == "lawyer" ? "bg-white" : "bg-transparent"
          } py-1 text-center`}
        >
          Lawyer
        </h1>
      </div>

      <div className="w-full md:w-2/5 xl:w-1/3 2xl:w-1/4 shadow-md mx-auto p-6 dark:text-white bg-white rounded-[4px]">
        <h1 className="text-xl font-medium ppy-2 ">
          {active == "client" ? "Client Registration" : "Lawyer Registration"}
        </h1>
        <h1 className="text-sm">
          {active == "client"
            ? "Sign up to find and hire lawyers"
            : "Join as a legal professional"}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg pt-6 bg-white"
        >
          <div className="mb-4">
            <label className="block pb-1 font-medium">Full Name</label>
            <input
              {...register("username", {
                required: "Full name is required",
              })}
              className="w-full p-2 border rounded-[4px]"
              placeholder="Enter your fullname"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block pb-1 font-medium">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full p-2 border rounded-[4px]"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block pb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-full p-2 border rounded-[4px]"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-3 w-full font-medium rounded-[4px]"
          >
            Create Account
          </button>
        </form>

        <div className="flex pt-2 justify-center">
          <h1>Already have an account?</h1>
          <Link href="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
