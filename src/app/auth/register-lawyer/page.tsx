"use client";

import { useRegisterRequestMutation } from "@/redux/features/auth/authApi";
import { useServicesQuery } from "@/redux/features/services/services.api";
import { FormValues } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "../../../assets/logo.main.png";

const inputClass =
  "w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-[9px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

const LawyerSignUpForm = () => {
  const { data: legalServices } = useServicesQuery("");
  const [registerRequest, { isLoading }] = useRegisterRequestMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (!selectedFile) {
      setFileError("Law degree image is required");
      return;
    }
    const lawyerData = {
      role: "Lawyer",
      fullName: data.fullName,
      password: data.password,
      email: data.email,
      serviceType: data.serviceType,
      barAssociation: data.barAssociation,
      fee: data.fee,
      specialization: data.specializations,
      experience: data.yearsOfExperience,
      licenceNumber: data.licenseNumber,
    };

    const formData = new FormData();
    formData.append("licenceUrl", selectedFile);
    formData.append("bodyData", JSON.stringify(lawyerData));

    const response: any = await registerRequest(formData);
    console.log(response);
    if (response.data) {
      localStorage.setItem("verify", data.email);
      reset();
      setSelectedFile(null);
      setFileError(null);
      router.push("/auth/verify-email");
      toast.success(response.data.message);
    } else {
      toast.error(response.error.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Image
              placeholder="blur"
              src={logo}
              alt="Juri Link"
              height={48}
              width={48}
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                Lawyer Registration
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Provide your professional details to create your account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName", { required: "Full Name is required" })}
                  className={inputClass}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.fullName.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={inputClass}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Row 2: Password & License Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Password</label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  {...register("password", { required: "Password is required" })}
                  className={inputClass}
                />
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>License Number</label>
                <input
                  type="number"
                  placeholder="Bar license number"
                  {...register("licenseNumber", {
                    required: "License Number is required",
                  })}
                  className={inputClass}
                />
                {errors.licenseNumber && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.licenseNumber.message}</p>
                )}
              </div>
            </div>

            {/* Row 3: Years of Experience & Law Degree */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Years of Experience</label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  {...register("yearsOfExperience", {
                    required: "Years of Experience is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Must be at least 0" },
                  })}
                  className={inputClass}
                />
                {errors.yearsOfExperience && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.yearsOfExperience.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Law Degree Certificate</label>
                <input
                  className="w-full px-3.5 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-[9px] file:mr-3 file:py-1 file:px-3 file:rounded-[6px] file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                      setFileError(null);
                    }
                  }}
                  type="file"
                  accept="image/*"
                />
                {fileError && <p className="mt-1.5 text-xs text-red-500">{fileError}</p>}
              </div>
            </div>

            {/* Row 4: Service Type & Fee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Service Type</label>
                <select
                  {...register("serviceType", {
                    required: "Service Type is required",
                  })}
                  className={inputClass}
                >
                  <option value="">Select service type</option>
                  <option value="Online">Online</option>
                  <option value="In_Person">In Person</option>
                  <option value="Both">Online &amp; In Person</option>
                </select>
                {errors.serviceType && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.serviceType.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Consultation Fee ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 150.00"
                  {...register("fee", {
                    required: "Fee is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Fee must be positive" },
                  })}
                  className={inputClass}
                />
                {errors.fee && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.fee.message}</p>
                )}
              </div>
            </div>

            {/* Areas of Practice */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Areas of Practice
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 p-4 border border-gray-200 rounded-[9px] bg-gray-50/50">
                {legalServices?.data?.map(
                  (service: { _id: string; serviceName: string }) => (
                    <label
                      key={service._id}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded-[6px] hover:bg-white hover:shadow-sm cursor-pointer transition-all"
                    >
                      <input
                        className="w-4 h-4 rounded accent-primary shrink-0"
                        type="checkbox"
                        value={service._id}
                        {...register("specializations", {
                          validate: (value) =>
                            value.length > 0 ||
                            "At least one specialization is required",
                        })}
                      />
                      <span className="text-sm text-gray-700">{service.serviceName}</span>
                    </label>
                  )
                )}
              </div>
              {errors.specializations && (
                <p className="mt-1.5 text-xs text-red-500">{errors.specializations.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-2.5 px-4 bg-primary text-white text-sm font-medium rounded-[9px] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Creating account…" : "Create Lawyer Account"}
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
              Registering as a client instead?{" "}
              <Link href="/auth/register" className="text-primary font-medium hover:underline">
                Client Registration
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerSignUpForm;
