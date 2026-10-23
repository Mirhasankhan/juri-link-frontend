import React from "react";
import UpdateIntroVideo from "./UpdateIntroVideo";
import UpdateProfileImage from "./UpdateProfileImage";
import UpdateLawyerDetails from "./UpdateLawyerDetails";
import ChangePasswordForm from "./ChangePasswordForm";

const LawyerProfile = () => {
  return (
    <div className="grid grid-cols-4 gap-6 p-3 lg:p-12">
      <div className="col-span-4 xl:col-span-1 space-y-6">
        <UpdateProfileImage></UpdateProfileImage>
        <UpdateIntroVideo></UpdateIntroVideo>
      </div>
      <div className="col-span-4 xl:col-span-3 space-y-6">
        <UpdateLawyerDetails></UpdateLawyerDetails>
        <ChangePasswordForm></ChangePasswordForm>
      </div>
    </div>
  );
};

export default LawyerProfile;
