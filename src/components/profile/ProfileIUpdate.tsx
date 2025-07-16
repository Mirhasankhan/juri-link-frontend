"use client";

import { useEffect } from "react";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";
import { IFormInput } from "@/types/common";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const ProfileUpdate = () => {
  const { data: profile } = useProfileQuery("");
  console.log(profile);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  useEffect(() => {
    if (profile?.result) {
      reset({
        username: profile.result.username || "",
        email: profile.result.email || "",
        phone: profile.result.phone || "",
        address: profile.result.address || "",
      });
    }
  }, [profile, reset]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await updateProfile(data);
    if (response.data) {
      toast.success("Profile details updated");
      reset();
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <div className="bg-white rounded-md mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex gap-6 my-3">
            <div className="w-full">
              <label className="font-medium pb-2 block">Full Name</label>
              <input
                className="input-design"
                type="text"
                placeholder="Input your full name"
                {...register("username")}
              />
            </div>
          </div>

          <div className="w-full">
            <label className="font-medium pb-2 block">Email</label>
            <input
              placeholder="Enter your email"
              className="input-design"
              type="email"
              readOnly
              {...register("email")}
            />
          </div>

          <div className="w-full mt-3">
            <label className="font-medium pb-2 block">Phone Number</label>
            <input
              className="input-design"
              type="text"
              placeholder="Enter your phone number"
              {...register("phone")}
            />
          </div>

          <div className="w-full mt-3">
            <label className="font-medium pb-2 block">Address</label>
            <input
              className="input-design"
              type="text"
              placeholder="Enter your address"
              {...register("address")}
            />
          </div>

          <div className="flex gap-6 mt-6 items-center justify-start">
            <button
              disabled={isLoading}
              type="submit"
              className="text-white bg-primary border w-full py-3 rounded-[4px] font-medium"
            >
              {
                isLoading ? <Loader2 className="mx-auto animate-spin"></Loader2> : "Submit"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
