"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { TLoginValues } from "@/types/common";
import Link from "next/link";
import { useRegisterRequestMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../assets/logo.main.png";

const Register = () => {
  const router = useRouter();
  const [registerRequest, { isLoading }] = useRegisterRequestMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
    const formData = new FormData();
    const registerData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: "User",
    };
    formData.append("bodyData", JSON.stringify(formData));
    const response: any = await registerRequest(registerData);
    if (response.data) {
      localStorage.setItem("verify", data.email);
      router.push("/auth/verify-email");
      toast.success(response.data.message);
    } else {
      toast.error(response.error.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10">
          {/* Logo & Header */}
          <div className="mb-8">
            <Image
              placeholder="blur"
              src={logo}
              alt="Juri Link"
              height={48}
              width={48}
              className="mb-5"
            />
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign up to find and hire lawyers
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                {...register("fullName", {
                  required: "Full name is required",
                })}
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-[9px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-[9px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-[9px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Min. 6 characters"
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-2.5 px-4 mt-1 bg-primary text-white text-sm font-medium rounded-[9px] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-2 text-center text-sm text-gray-500">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
            <p>
              Want to register as a lawyer?{" "}
              <Link href="/auth/register-lawyer" className="text-primary font-medium hover:underline">
                Register as Lawyer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
