import { baseApi } from "../../api/baseApi";

const careerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (service) => ({
        url: `/service/create`,
        method: "POST",
        body: service,
      }),
      invalidatesTags: ["service"],
    }),
    experts: builder.query({
      query: (categoryId) => ({
        url: `/expert/all?categoryId=${categoryId}`,
        method: "GET",
      }),
    }),
    jobs: builder.query({
      query: () => ({
        url: `/job-post`,
        method: "GET",
      }),
    }),
    apply: builder.mutation({
      query: ({id,data}) => ({
        url: `/application/create/${id}`,
        method: "POST",
        body:{data}
      }),
    }),
  }),
});

export const {useApplyMutation, useCreateServiceMutation, useExpertsQuery, useJobsQuery } =
  careerApi;
