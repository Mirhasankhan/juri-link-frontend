"use client";

import { useRef, useState } from "react";
import {
  useProfileQuery,
  useUpdateprofileImageMutation,
} from "@/redux/features/auth/authApi";
import Image from "next/image";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";

const UpdateProfileImage = () => {
  const { data: profile, isLoading: profileLoading } = useProfileQuery("");
  const [updateProfileImage] = useUpdateprofileImageMutation();

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  if (profileLoading) return "Loading...";

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("files", file);

    try {
      await updateProfileImage(formData).unwrap();
      toast.success("Profile image updated")
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">  
      <div
        className="relative group w-28 h-28 rounded-full overflow-hidden 
        border-2 border-gray-300 shadow-sm cursor-pointer"
        onClick={() => fileRef.current?.click()}
      >     
        {profile?.data?.profileImage ? (
          <Image
            src={profile.data.profileImage}
            alt="Profile"
            width={112}
            height={112}
            className="w-full p-1 h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
        )}   
        <div
          className="absolute inset-0 bg-black/40 opacity-0 
          group-hover:opacity-100 transition flex items-center justify-center"
        >
          <Camera className="text-white w-8 h-8" />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {uploading && (
        <p className="text-blue-600 text-sm font-medium">Uploading...</p>
      )}
    </div>
  );
};

export default UpdateProfileImage;
