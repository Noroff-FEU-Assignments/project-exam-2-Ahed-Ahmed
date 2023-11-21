import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const getAuthToken = () => {
  const userData = Cookies.get("userData");
  const token = userData ? JSON.parse(userData)?.accessToken : null;
  return token ? `Bearer ${token}` : "";
};

export const ProfileAPi = createApi({
  reducerPath: "ProfileAPi",
  tagTypes: ["ProfileAPi"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", token);
      }
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProfile: builder.query({
      query: () => ({
        url: `profiles`,
        method: "Get",
      }),

      providesTags: ["ProfileAPi"],
    }),
    getProfileByName: builder.query({
      query: (username) => ({
        url: `profiles/${username}`,
        method: "Get",
      }),

      providesTags: ["ProfileAPi"],
    }),
    getFollowedProfiles: builder.query({
      query: (name) => ({
        url: `profiles/${name}?_following=true`,
        method: "Get",
      }),

      providesTags: ["ProfileAPi"],
    }),

    updateUserProfile: builder.mutation({
      query: (params) => ({
        url: `profiles/${params?.data.name}/media`,
        method: "PUT",
        body: params.data,
      }),

      providesTags: ["ProfileAPi"],
    }),
    followProfile: builder.mutation({
      query: (username) => ({
        url: `profiles/${username}/follow`,
        method: "PUT",
      }),

      invalidatesTags: ["ProfileAPi"],
    }),
    unFollowProfile: builder.mutation({
      query: (username) => ({
        url: `profiles/${username}/unfollow`,
        method: "PUT",
      }),

      invalidatesTags: ["ProfileAPi"],
    }),
  }),
});

export const {
  useGetAllProfileQuery,
  useGetFollowedProfilesQuery,
  useUpdateUserProfileMutation,
  useGetProfileByNameQuery,
  useFollowProfileMutation,
  useUnFollowProfileMutation,
} = ProfileAPi;
