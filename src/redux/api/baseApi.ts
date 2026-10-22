import { JWTDecode } from "@/utils/jwt";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://api.passit.smtsigma.com/api/v1",
    prepareHeaders: (headers) => {
      const { token } = JWTDecode();

      if (token && token !== "null" && token !== "undefined") {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "users",
    "bookings",
    "service",
    "post",
    "subscription",
    "earnings",
    "availability",
  ],
  endpoints: () => ({}),
});
