"use client";

import { IFormInput } from "@/types/common";
import { useForm, SubmitHandler } from "react-hook-form";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    reset();
    console.log(data);
  };

  return (
    <div className="lg:w-2/3 mx-auto">
      <div className="bg-white rounded-md mt-6">      
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex gap-6 my-3">
            <div className="w-full">
              <label className="font-medium pb-2 block" htmlFor="">
                Old Password
              </label>
              <input
                className="input-design"
                type="password"
                placeholder="Input your old password"
                {...register("oldPassword", {
                  required: "old password is required",
                })}
              />
              {errors.oldPassword && <span className="text-red-500">{errors.oldPassword.message}</span>}
            </div>
          </div>
          <div className="w-full">
            <label className="font-medium pb-2 block" htmlFor="">
              New Password
            </label>
            <input
              className="input-design"
              type="password"
              placeholder="Input your new password"
              {...register("newPassword", {
                required: "new password is required",
              })}
            />
            {errors.newPassword && <span className="text-red-500">{errors.newPassword.message}</span>}
          </div>
          <div className="w-full mt-3">
            <label className="font-medium pb-2 block" htmlFor="">
              Confirm Password
            </label>
            <input
              className="input-design"
              type="password"
              placeholder="confirm your new password"
              {...register("confirm", {
                required: "Confirm password is required",
              })}
            />
            {errors.confirm && <span className="text-red-500">{errors.confirm.message}</span>}
          </div>

          <div className="flex gap-6 mt-6 items-center justify-start">
            <button
              type="submit"
              className="text-white bg-primary border w-full py-3 rounded-xl font-medium"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
