import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerRequest: builder.mutation({
      query: (userInfo) => ({
        url: "/user/request",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/user/verify",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/user/resend-otp",
        method: "POST",
        body: email,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    profile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["users", "availability"],
    }),
    sendOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: { email, otp },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: data.token,
        },
      }),
    }),
    changePassword: builder.mutation({
      query: (newPassword) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: newPassword,
      }),
    }),
    updateImage: builder.mutation({
      query: (image) => ({
        url: "/auth/upload/profileImage",
        method: "PUT",
        body: image,
      }),
      invalidatesTags: ["users"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    updateIntroVideo: builder.mutation({
      query: (file) => ({
        url: "/auth/upload/intro-video",
        method: "PUT",
        body: file,
      }),
      invalidatesTags: ["users"],
    }),
    updateprofileImage: builder.mutation({
      query: (file) => ({
        url: "/auth/upload/profileImage",
        method: "PUT",
        body: file,
      }),
      invalidatesTags: ["users"],
    }),
    allLawyers: builder.query({
      query: (params: { experience?: string | number | null; type?: string | null; specializationId?: string | null } = {}) => {
        const queryParams = new URLSearchParams();
        if (params?.experience && params.experience !== "undefined") {
          queryParams.append("experience", String(params.experience));
        }
        if (params?.type && params.type !== "undefined") {
          queryParams.append("type", String(params.type));
        }
        if (params?.specializationId && params.specializationId !== "undefined") {
          queryParams.append("specializationId", String(params.specializationId));
        }
        const qs = queryParams.toString();
        return {
          url: qs ? `/user/all?${qs}` : "/user/all",
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    lawyerDetails: builder.query({
      query: (id) => ({
        url: `/user/details/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    
  }),
});

export const {
  useSendOtpMutation,
  useRegisterRequestMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useProfileQuery,
  useUpdateImageMutation,
  useUpdateprofileImageMutation,
  useLawyerDetailsQuery,
  useUpdateIntroVideoMutation,
  useAllLawyersQuery,
  useLoginMutation,
  useUpdateProfileMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
