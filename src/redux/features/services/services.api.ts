import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: `/post/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: `/post/comment/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
    createReply: builder.mutation({
      query: (data) => ({
        url: `/post/reply/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
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
      providesTags: ["post"],
    }),
    toggleLikePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["post"],
    }),
    post: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
  }),
});

export const {
  useServicesQuery,
  useCreatePostMutation,
  useCreateCommentMutation,
  useCreateReplyMutation,
  useToggleLikePostMutation,
  usePostsQuery,
  usePostQuery,
} = serviceApi;
