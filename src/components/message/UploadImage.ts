import axios from "axios";

export const uploadImage = async (file: File) => {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("fileUrl", file);
  formData.append("files", file);

  try {
    const apiBase =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://api.passit.smtsigma.com/api/v1";

    const uploadUrl =
      process.env.NEXT_PUBLIC_IMAGE_UPLOAD_URL ||
      `${apiBase.replace(/\/+$/, "")}/message/generate-url`;

    const response = await axios.post(uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Image upload failed:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Upload failed");
  }
};
