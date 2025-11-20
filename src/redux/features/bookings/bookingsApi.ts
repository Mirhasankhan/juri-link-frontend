import { baseApi } from "../../api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    lawyerDetails: builder.query({
      query: (id) => ({
        url: `/user/details/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    userBookings: builder.query({
      query: () => ({
        url: `/booking/user-wise`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: `/booking/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    topOwners: builder.query({
      query: () => ({
        url: `/analysis/top-owner`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    topCustomers: builder.query({
      query: () => ({
        url: `/analysis/top-customer`,
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
  useLawyerDetailsQuery,
  useTopOwnersQuery,
  useTopCustomersQuery,
  useRecentBookingQuery,
  useCancellationsQuery,
  useRevenueQuery,
  useCreateBookingMutation,
  useUserBookingsQuery,
} = bookingsApi;
