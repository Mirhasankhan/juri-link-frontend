"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import logo from "../../assets/logo1.avif";
import Image from "next/image";
import { TLoginValues } from "@/types/common";
import Link from "next/link";
// import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  console.log(isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
    try {
      const response = await registerUser(data);

      if (response.data?.result) {
        toast.success("User Created Successfully");
        router.push("/login");
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
    <div className="bg-gradient-to-br from-purple-50 p-2 via-blue-50 to-indigo-100 py-12 min-h-screen">
      <div className="w-full md:w-2/5 2xl:w-1/4 shadow-md mx-auto p-6 dark:text-white bg-white rounded-[4px]">
        <Image src={logo} alt="" height={60} width={60}></Image>
        <h1 className="text-xl font-medium ppy-2 ">Create Account</h1>
        <p className="text-sm">
          Enter to get unlimited access to data & information
        </p>
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
            disabled={isLoading}
            type="submit"
            className="bg-primary text-white py-3 w-full font-medium rounded-[4px]"
          >
            {isLoading ? "Signing Up.." : "Create Account"}
          </button>
        </form>
        {/* <div className="flex items-center justify-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">Or, Login with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div> */}
        {/* <button
          disabled={isLoading}
          type="submit"
          className="bg-white flex items-center gap-2 justify-center border py-3 w-full rounded-[4px]"
        >
          <FcGoogle size={20} /> Sign Up With Google
        </button> */}
        <div className="flex pt-2 justify-center">
          <h1>Already have an account?</h1>
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
