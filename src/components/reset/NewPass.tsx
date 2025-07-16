"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";
import { TLoginValues } from "@/types/common";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

const NewPass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
    console.log(data);
    if (data.password !== data.confirmPassword) {
      toast.error("Password didn't match");
      return
    }
    setIsLoading(true);
    try {
      console.log(data.password);
      const response = await resetPassword({newPassword:data.password});
      console.log(response);

      if (response.data) {
        toast.success(response.data.message);
        router.push("/login");
        setIsLoading(false);
      } else if (response.error) {
        if ("data" in response.error) {
          const errorData = response.error.data as { message?: string };
          toast.error(errorData.message || "Something went wrong.");
          setIsLoading(false);
        } else {
          toast.error("Unexpected error structure.");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/3 mx-auto p-2 my-4 dark:text-white">
      <h1 className="text-xl font-medium py-2 text-center">Set New Password</h1>
      <p className="text-sm text-center">Must be atleast 8 characters long</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg pt-6 bg-white"
      >
        <div className="mb-4">
          <label className="block font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter new password"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Password is required",
            })}
            className="w-full p-2 border rounded-md"
            placeholder="Retype password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-primary text-white py-3 w-full font-medium rounded-md"
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto"></Loader>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default NewPass;
