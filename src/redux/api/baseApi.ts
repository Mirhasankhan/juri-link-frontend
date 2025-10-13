import { JWTDecode } from "@/utils/jwt";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5006/api/v1/",
    baseUrl: "https://juri-link-server.vercel.app/api/v1/",
    prepareHeaders: (headers) => {
      const { token } = JWTDecode();
      console.log(token);

      headers.set(
        "Authorization",
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDYzNDJkZDExY2E5YzkzMDIwY2IxZiIsImVtYWlsIjoibWlyaGFzYXNuLmJkNUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImZ1bGxOYW1lIjoiSm9obiBEbyIsImlhdCI6MTc2MDM2OTA2OSwiZXhwIjoxNzYxNjY1MDY5fQ.-afNk6TeCnglZj4bhHG3hcUkeRGQb9zKo_cUTj-0Ttg`
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
