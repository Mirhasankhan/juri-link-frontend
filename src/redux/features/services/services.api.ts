import { baseApi } from "../../api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (service) => ({
        url: `/service/create`,
        method: "POST",
        body: service,
      }),
      invalidatesTags: ["service"],
    }),
    categories: builder.query({
      query: () => ({
        url: `/category/all`,
        method: "GET",
      }),
    }),
    services: builder.query({
      query: (id) => ({
        url: `/service/category/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    service: builder.query({
      query: (id) => ({
        url: `/service/single/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    recentBooking: builder.query({
      query: () => ({
        url: `/analysis/booking-analysis`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    cancellations: builder.query({
      query: () => ({
        url: `/analysis/cancel-rate`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    revenue: builder.query({
      query: () => ({
        url: `/analysis/total/revenue?timeframe=monthly`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useCategoriesQuery,
  useServicesQuery,
  useRecentBookingQuery,
  useCancellationsQuery,
  useRevenueQuery,
  useServiceQuery
} = bookingsApi;
