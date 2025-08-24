
import { JWTDecode } from "@/utils/jwt";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://juri-link-server.vercel.app/api/v1/",
    prepareHeaders: (headers) => {
      const {token} = JWTDecode()
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["users","bookings","service"],
  endpoints: () => ({}),
});
