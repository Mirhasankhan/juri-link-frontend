"use client";

import { FormValues } from "@/types/common";
import React from "react";
import { useForm } from "react-hook-form";

const specializations = [
  "Corporate Law",
  "Criminal Law",
  "Family Law",
  "Real Estate Law",
  "Intellectual Property Law",
  "Environmental Law",
  "Immigration Law",
  "Personal Injury Law",
  "Tax Law",
  "Employment Law",
];

const LawyerSignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);

    const file = data.lawDegreeImage?.[0];
    if (file) {
      console.log("Uploaded File:", file.name);
    }

    reset();
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
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName", { required: "Full Name is required" })}
              className="border p-2 rounded w-full"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          <div>
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
              className="border p-2 rounded w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="border p-2 rounded w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="License Number"
              {...register("licenseNumber", {
                required: "License Number is required",
              })}
              className="border p-2 rounded w-full"
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
            <input
              type="number"
              placeholder="Years of Experience"
              {...register("yearsOfExperience", {
                required: "Years of Experience is required",
                valueAsNumber: true,
                min: { value: 0, message: "Must be at least 0" },
              })}
              className="border p-2 rounded w-full"
            />
            {errors.yearsOfExperience && (
              <p className="text-red-500 text-sm">
                {errors.yearsOfExperience.message}
              </p>
            )}
          </div>
          <div>
            <select
              {...register("barAssociation", {
                required: "Bar Association is required",
              })}
              className="border p-2 rounded w-full"
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
            <select
              {...register("serviceType", {
                required: "Service Type is required",
              })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Service Type</option>
              <option value="Hourly">Hourly</option>
              <option value="Per Case">Per Case</option>
            </select>
            {errors.serviceType && (
              <p className="text-red-500 text-sm">
                {errors.serviceType.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="number"
              step="0.01"
              placeholder="Fee (per case)"
              {...register("fee", {
                required: "Fee is required",
                valueAsNumber: true,
                min: { value: 0, message: "Fee must be positive" },
              })}
              className="border p-2 rounded w-full"
            />
            {errors.fee && (
              <p className="text-red-500 text-sm">{errors.fee.message}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block mb-1">Law Degree Image</label>
          <input
            type="file"
            {...register("lawDegreeImage", {
              required: "Law Degree Image is required",
            })}
            className="border p-2 rounded w-full"
          />
          {errors.lawDegreeImage && (
            <p className="text-red-500 text-sm">
              {errors.lawDegreeImage.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-medium">Specialization(s)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {specializations.map((spec) => (
              <label key={spec} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={spec}
                  {...register("specializations", {
                    validate: (value) =>
                      value.length > 0 ||
                      "At least one specialization is required",
                  })}
                />
                <span>{spec}</span>
              </label>
            ))}
          </div>
          {errors.specializations && (
            <p className="text-red-500 text-sm">
              {errors.specializations.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary/80 text-white rounded hover:bg-primary"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LawyerSignUpForm;
