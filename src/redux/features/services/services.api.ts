import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    services: builder.query({
      query: () => ({
        url: `/legal-service`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const { useServicesQuery } = serviceApi;
