"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import {
  useProfileQuery,
  useUpdateImageMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const UpdateImage = () => {
  const { data: profile } = useProfileQuery("");
  
  const [updateImage, { isLoading }] = useUpdateImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return toast.error("Please select an image first.");

    const formData = new FormData();
    formData.append("files", selectedFile);

    const response = await updateImage(formData);
    if (response.data) {
      setSelectedFile(null)
      toast.success("Profile Image Updated");
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <h1 className="font-medium pb-3">Account Management</h1>

      <div className="border p-5">
        <div className="relative group w-full h-[300px] overflow-hidden rounded-full">
          <Image
            alt="Preview"
            src={preview || profile?.result?.profileImage}
            width={600}
            height={200}
            className="object-cover w-full h-full"
          />

          <div
            className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <FaCamera className="text-white text-3xl" />
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <button
          disabled={isLoading}
          onClick={uploadImage}
          className="bg-primary text-white font-medium rounded-[4px] text-center py-2 w-full mt-3"
        >
        {
          isLoading ? <Loader2 className="animate-spin mx-auto"></Loader2> : "  Update Photo"
        }
        </button>
      </div>
    </div>
  );
};

export default UpdateImage;
