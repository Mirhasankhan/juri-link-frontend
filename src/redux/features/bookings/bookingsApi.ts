import { baseApi } from "../../api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: `/booking/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
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
    lawyerBookings: builder.query({
      query: () => ({
        url: `/booking/lawyer-wise`,
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    markCompleted: builder.mutation({
      query: (id) => ({
        url: `/booking/mark-completed/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const {
  useLawyerDetailsQuery,
  useLawyerBookingsQuery,
  useCreateBookingMutation,
  useMarkCompletedMutation,
  useUserBookingsQuery,
} = bookingsApi;
