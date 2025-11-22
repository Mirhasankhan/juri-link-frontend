import { baseApi } from "../../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    plans: builder.query({
      query: () => ({
        url: `/subscription-plan`,
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
  }),
});

export const { usePlansQuery } = subscriptionApi;
