"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/profile/Sidebar";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { useForm, Controller } from "react-hook-form";

const MyProfilePage = () => {
  const { data: profileData } = useProfileQuery("");
  const profile = profileData?.data;
  const [isDirty, setIsDirty] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [licencePreview, setLicencePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      profileImage: null,
      licenceUrl: "",
      licenceNumber: "",
      fee: "",
      institution: "",
      location: "",
      experience: "",
      serviceType: "Online",
    },
  });

  // Update form default values when profile fetch completes
  useEffect(() => {
    if (profile) {
      setValue("fullName", profile.fullName || "");
      setValue("licenceUrl", profile.licenceUrl || "");
      setValue("licenceNumber", profile.licenceNumber || "");
      setValue("fee", profile.fee || "");
      setValue("institution", profile.institution || "");
      setValue("location", profile.location || "");
      setValue("experience", profile.experience || "");
      setValue("serviceType", profile.serviceType || "Online");
      setLicencePreview(profile.licenceUrl || null);
    }
  }, [profile, setValue]);

  // Watch form fields to enable submit button only when changes are made
  const watchedFields = watch();

  useEffect(() => {
    if (!profile) return;

    const hasChanges =
      profile.fullName !== watchedFields.fullName ||
      profile.licenceUrl !== watchedFields.licenceUrl ||
      profile.licenceNumber !== watchedFields.licenceNumber ||
      profile.fee !== watchedFields.fee ||
      profile.institution !== watchedFields.institution ||
      profile.location !== watchedFields.location ||
      profile.experience !== watchedFields.experience ||
      profile.serviceType !== watchedFields.serviceType ||
      watchedFields.profileImage;

    setIsDirty(hasChanges);
  }, [watchedFields, profile]);

  const onSubmit = (data) => {
    console.log("Updated profile data: ", data);
    // Call your API to update the profile
  };

  // Preview handlers
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePreview(URL.createObjectURL(file));
  };

  const handleLicenceImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setLicencePreview(URL.createObjectURL(file));
  };

  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="hidden md:block md:col-span-1 border-r-2">
        <Sidebar />
      </div>
      <div className="col-span-5 md:col-span-4 w-4/5 mx-auto mt-12 sh">
        <h1 className="text-xl font-semibold pb-4">Manage profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 shadow-xl p-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                {...register("fullName", { required: true })}
                placeholder="Enter full name"
                className="input-design"
              />
              {errors.fullName && <span className="text-red-500">Full name is required</span>}
            </div>

            {/* Institution */}
            <div>
              <label className="block font-medium">Institution</label>
              <input
                {...register("institution")}
                placeholder="Enter institution"
                className="input-design"
              />
            </div>

            {/* Fee */}
            <div>
              <label className="block font-medium">Fee</label>
              <input
                type="number"
                {...register("fee", { required: true, min: 0 })}
                placeholder="Enter your fee"
                className="input-design"
              />
              {errors.fee && <span className="text-red-500">Fee is required</span>}
            </div>

            {/* Location */}
            <div>
              <label className="block font-medium">Location</label>
              <input
                {...register("location", { required: true })}
                placeholder="Enter location"
                className="input-design"
              />
              {errors.location && <span className="text-red-500">Location is required</span>}
            </div>

            {/* Experience */}
            <div>
              <label className="block font-medium">Experience (Years)</label>
              <input
                type="number"
                {...register("experience", { min: 0 })}
                placeholder="Enter experience"
                className="input-design"
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="block font-medium">Service Type</label>
              <Controller
                name="serviceType"
                control={control}
                render={({ field }) => (
                  <select {...field} className="input-design">
                    <option value="Online">Online</option>
                    <option value="In_person">In Person</option>
                    <option value="Both">Both</option>
                  </select>
                )}
              />
            </div>

            {/* Licence Number */}
            <div>
              <label className="block font-medium">Licence Number</label>
              <input
                {...register("licenceNumber", { required: true })}
                placeholder="Enter licence number"
                className="input-design"
              />
              {errors.licenceNumber && <span className="text-red-500">Licence number is required</span>}
            </div>
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-2 gap-4">
            {/* Profile Image */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed p-4 rounded cursor-pointer hover:border-blue-500 transition">
              <label className="w-full flex flex-col items-center justify-center cursor-pointer">
                <span className="text-gray-500 mb-2">Click to upload profile image</span>
                <input
                  type="file"
                  {...register("profileImage")}
                  onChange={(e) => {
                    register("profileImage").onChange(e);
                    handleProfileImageChange(e);
                  }}
                  className="hidden"
                />
                {profilePreview && (
                  <img src={profilePreview} alt="Profile Preview" className="w-32 h-32 rounded-full object-cover mt-2" />
                )}
              </label>
            </div>

            {/* Licence Image */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed p-4 rounded cursor-pointer hover:border-blue-500 transition">
              <label className="w-full flex flex-col items-center justify-center cursor-pointer">
                <span className="text-gray-500 mb-2">Click to upload licence image</span>
                <input
                  type="file"
                  {...register("licenceUrl")}
                  onChange={(e) => {
                    register("licenceUrl").onChange(e);
                    handleLicenceImageChange(e);
                  }}
                  className="hidden"
                />
                {licencePreview && (
                  <img src={licencePreview} alt="Licence Preview" className="w-32 h-20 object-contain mt-2" />
                )}
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isDirty}
            className={`px-6 py-2 rounded text-white transition ${
              isDirty ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfilePage;
