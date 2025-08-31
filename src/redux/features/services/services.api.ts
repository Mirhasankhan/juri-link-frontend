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
    createPost: builder.mutation({
      query: (data) => ({
        url: `/post/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useServicesQuery,useCreatePostMutation } = serviceApi;
