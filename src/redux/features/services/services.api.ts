import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: `/post/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),
    services: builder.query({
      query: () => ({
        url: `/legal-service`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    posts: builder.query({
      query: () => ({
        url: `/post`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
  }),
});

export const { useServicesQuery, useCreatePostMutation, usePostsQuery } =
  serviceApi;
