import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const getAuthToken = () => {
  const userData = Cookies.get("userData");
  const token = userData ? JSON.parse(userData)?.accessToken : null;
  return token ? `Bearer ${token}` : "";
};
export const PostApi = createApi({
  reducerPath: "PostApi",
  tagTypes: ["POSTAPI"],
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
    GetPostData: builder.query({
      query: () => ({
        url: "posts?_author=true&_reactions=true&_comments=true",
        method: "GET",
      }),
      providesTags: ["POSTAPI"],
    }),
    GetCurrentUserPostData: builder.query({
      query: (params) => ({
        url: `profiles/${params?.data?.name}/posts`,
        method: "GET",
      }),
      providesTags: ["POSTAPI"],
    }),
    GetCurrentUserSinglePostData: builder.query({
      query: (id) => {
        return {
          url: `posts/${id}?_author=true&_reactions=true&_comments=true`,
          method: "GET",
        };
      },
      providesTags: ["POSTAPI"],
    }),
    AddPostData: builder.mutation({
      query: (params) => ({
        url: "posts",
        method: "post",
        body: params.data,
      }),
      invalidatesTags: ["POSTAPI"],
    }),

    EditPostData: builder.mutation({
      query: (params) => ({
        url: `posts/${params?.id}`,
        method: "put",
        body: params.data,
      }),
      invalidatesTags: ["POSTAPI"],
    }),
    // AddComment: builder.mutation({
    //   query: ({ params, id }) => ({
    //     url: `posts/${id}/comment`,
    //     method: "post",
    //     body: params,
    //   }),

    //   invalidatesTags: ["POSTAPI"],
    // }),
    AddComment: builder.mutation({
      query: (params) => {
        // console.log("AddComment Mutation Params:", params);
        return {
          url: `posts/${params?.postId}/comment`,
          method: "post",
          body: params,
        };
      },
      invalidatesTags: ["POSTAPI"],
    }),
    AddReactionsOnPost: builder.mutation({
      query: ({ id, emoji }) => ({
        url: `posts/${id}/react/${encodeURIComponent(emoji)}`,
        method: "PUT",
      }),
      invalidatesTags: ["POSTAPI"],
    }),

    DeletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["POSTAPI"],
    }),
  }),
});

export const {
  useGetPostDataQuery,
  useGetCurrentUserPostDataQuery,
  useAddReactionsOnPostMutation,
  useGetCurrentUserSinglePostDataQuery,
  useAddCommentMutation,
  useAddPostDataMutation,
  useEditPostDataMutation,
  useDeletePostMutation,
} = PostApi;
