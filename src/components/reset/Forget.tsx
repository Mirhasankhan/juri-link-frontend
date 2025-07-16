"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { TLoginValues } from "@/types/common";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSendOtpMutation } from "@/redux/features/auth/authApi";

const ForgetPassword = ({
  setActive,
  setEmail,
}: {
  setActive: (value: string) => void;
  setEmail: (value: string) => void;
}) => {
  const [sendOpt, { isLoading }] = useSendOtpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
    try {
      const response = await sendOpt(data);

      if (response.data) {
        toast.success(response.data.message);
        setActive("verify");

        setEmail(data.email);
      } else if (response.error) {
        if ("data" in response.error) {
          const errorData = response.error.data as { message?: string };
          toast.error(errorData.message || "Something went wrong.");
        } else {
          toast.error("Unexpected error structure.");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error("An unexpected error occurred.");
    } finally {
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <h1 className="text-xl font-medium">Forget Password?</h1>
      <p>No worries, we will send you reset instructions.</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg pt-6  bg-white"
      >
        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            className="w-[430px] p-2 border rounded-md"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-primary text-white py-3 w-full font-medium rounded-md"
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin mx-auto"></LoaderCircle>
          ) : (
            "Send OTP"
          )}
        </button>
      </form>
      <Link href="/login" className="flex items-center gap-1 pt-6">
        <ArrowLeft size={15} /> Back to login
      </Link>
    </div>
  );
};

export default ForgetPassword;
