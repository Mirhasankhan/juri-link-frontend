"use client";

import { useRegisterRequestMutation } from "@/redux/features/auth/authApi";
import { useServicesQuery } from "@/redux/features/services/services.api";
import { FormValues } from "@/types/common";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
    <div className="bg-gradient-to-br from-purple-50 p-2 via-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-4"
      >
        <h2 className="text-2xl font-semibold">Lawyer Sign Up</h2>
        <p className="text-gray-500">
          Provide your professional details to create your account.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-design pb-1">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName", { required: "Full Name is required" })}
              className="input-design"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <label className="label-design pb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="input-design"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-design pb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="input-design"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="label-design pb-1">License Number</label>
            <input
              type="number"
              placeholder="License Number"
              {...register("licenseNumber", {
                required: "License Number is required",
              })}
              className="input-design"
            />
            {errors.licenseNumber && (
              <p className="text-red-500 text-sm">
                {errors.licenseNumber.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-design pb-1">Years of Experience</label>
            <input
              type="number"
              placeholder="Years of Experience"
              {...register("yearsOfExperience", {
                required: "Years of Experience is required",
                valueAsNumber: true,
                min: { value: 0, message: "Must be at least 0" },
              })}
              className="input-design"
            />
            {errors.yearsOfExperience && (
              <p className="text-red-500 text-sm">
                {errors.yearsOfExperience.message}
              </p>
            )}
          </div>
          <div>
            <label className="label-design pb-1">Bar Association</label>
            <select
              {...register("barAssociation", {
                required: "Bar Association is required",
              })}
              className="input-design"
            >
              <option value="">Select Bar Association</option>
              <option value="American Bar Association">
                American Bar Association
              </option>
              <option value="State Bar">State Bar</option>
              <option value="Other">Other</option>
            </select>
            {errors.barAssociation && (
              <p className="text-red-500 text-sm">
                {errors.barAssociation.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-design pb-1">Service Type</label>
            <select
              {...register("serviceType", {
                required: "Service Type is required",
              })}
              className="input-design"
            >
              <option value="">Select Service Type</option>
              <option value="Online">Online</option>
              <option value="In_Person">In_Person</option>
              <option value="Both">Both</option>
            </select>
            {errors.serviceType && (
              <p className="text-red-500 text-sm">
                {errors.serviceType.message}
              </p>
            )}
          </div>
          <div>
            <label className="label-design pb-1">Fee (per case)</label>
            <input
              type="number"
              step="0.01"
              placeholder="Fee (per case)"
              {...register("fee", {
                required: "Fee is required",
                valueAsNumber: true,
                min: { value: 0, message: "Fee must be positive" },
              })}
              className="input-design"
            />
            {errors.fee && (
              <p className="text-red-500 text-sm">{errors.fee.message}</p>
            )}
          </div>
        </div>
        <div className="w-full">
          <label className="label-design pb-1">Law Degree Image</label>
          <input
            className="input-design"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
                setFileError(null);
              }
            }}
            type="file"
            accept="image/*"
          />
          {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
        </div>
        <div>
          <label className="block mb-2 font-medium">Specialization(s)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {legalServices?.data?.map(
              (service: { _id: string; serviceName: string }) => (
                <label
                  key={service._id}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    value={service._id}
                    {...register("specializations", {
                      validate: (value) =>
                        value.length > 0 ||
                        "At least one specialization is required",
                    })}
                  />
                  <span>{service.serviceName}</span>
                </label>
              )
            )}
          </div>
          {errors.specializations && (
            <p className="text-red-500 text-sm">
              {errors.specializations.message}
            </p>
          )}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full py-2 px-4 bg-primary/80 text-white rounded hover:bg-primary"
        >
          {isLoading ? "Signing up..." : "     Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default LawyerSignUpForm;
