import { JWTDecode } from "@/utils/jwt";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://juri-link-server.vercel.app/api/v1/",
    prepareHeaders: (headers) => {
      const { token } = JWTDecode();
      console.log(token);

      headers.set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTZmNWM5NjMxMDFlZjc2NDM5OTk5MiIsImVtYWlsIjoiam9obmRvZTJAZXhhbXBsZS5jb20iLCJyb2xlIjoiVXNlciIsImZ1bGxOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTY2MzE4MzgsImV4cCI6MTc1NzkyNzgzOH0.vd9-d1BqQQnVu4jgHS2YouTUjCdtue4fhb2Lhw6yp5A`
      );

      // if (token) {
      //   headers.set("Authorization", `${token}`);
      // }
      return headers;
    },
  }),
  tagTypes: ["users", "bookings", "service"],
  endpoints: () => ({}),
});
