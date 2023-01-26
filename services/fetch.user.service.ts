import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/configureStore";

export interface User {
  first_name: string;
  last_name: string;
}

export interface UserResponse {
  status: any;
  user: User;
  token: string;
}
export interface FeedsResponse {
  status: any;
  feeds: any;
}

export interface LoginRequest {
  username: string;
  password: string;
  token: string;
}

export interface UserTokenRequest {
  refreshtoken: string;
}

export interface getFeedsRequest {
  user_id: string;
}

export interface postFeedsRequest {
  message: string;
  tag: string;
  img: string;
  group_id: string;
}

export const usersApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://widenout.tk/api/endpoints/",
    baseUrl: "https://jw-widenout.com/api/endpoints/",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login.php",
        method: "POST",
        body: credentials,
      }),
    }),
    feeds: builder.mutation<FeedsResponse, getFeedsRequest>({
      query: (credentials) => ({
        url: "getFeeds.php",
        method: "POST",
        body: credentials,
      }),
    }),
    loginWithJWT: builder.mutation<UserResponse, UserTokenRequest>({
      query: (credentials) => ({
        url: "login_with_jwt",
        method: "POST",
        body: credentials,
      }),
    }),
    getGroups: builder.mutation<any, UserTokenRequest>({
      query: (credentials) => ({
        url: "getAllGroups.php",
        method: "POST",
        body: credentials,
      }),
    }),
    getGroupFeeds: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "getGroupPosts.php",
        method: "POST",
        body: credentials,
      }),
    }),
    getGroupMembers: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "getGroupMembers.php",
        method: "POST",
        body: credentials,
      }),
    }),
    getGroupMemberData: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "getGroupMemberData.php",
        method: "POST",
        body: credentials,
      }),
    }),
    getNotifications: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "getAllNotifications.php",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserProfile: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "getUserFeeds.php",
        method: "POST",
        body: credentials,
      }),
    }),
    getPostComment: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "getComments.php",
        method: "POST",
        body: credentials,
      }),
    }),
    postLike: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "like.php",
        method: "POST",
        body: credentials,
      }),
    }),
    post_feed: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "postFeeds.php",
        method: "POST",
        body: credentials,
      }),
    }),
    post_comment: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "addComment.php",
        method: "POST",
        body: credentials,
      }),
    }),
    update_post: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "updatePost.php",
        method: "POST",
        body: credentials,
      }),
    }),
    delete_post: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "delete.php",
        method: "POST",
        body: credentials,
      }),
    }),
    getChats: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "getChats.php",
        method: "POST",
        body: credentials,
      }),
    }),
    setChatMessage: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "setChatMessage.php",
        method: "POST",
        body: credentials,
      }),
    }),
    addFriend: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "setChatMessage.php",
        method: "POST",
        body: credentials,
      }),
    }),
    getFriends: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "getFriendsList.php",
        method: "POST",
        body: credentials,
      }),
    }),
    getPeople: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "getPeople.php",
        method: "POST",
        body: credentials,
      }),
    }),
    getPendingFriends: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "getPendingFriends.php",
        method: "POST",
        body: credentials,
      }),
    }),
    setFriend: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "setFriend.php",
        method: "POST",
        body: credentials,
      }),
    }),
    removePendingFriend: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "removePendingFriend.php",
        method: "POST",
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

// export const postApi = createApi({
//   reducerPath: "postApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://192.168.1.134/api/endpoints/",
//     prepareHeaders: (headers, { getState }) => {
//       headers.set("Content-Type", "multipart/form-data");
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     post_feed: builder.mutation<any, any>({
//       query: (credentials) => ({
//         url: "postFeeds.php",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     protected: builder.mutation<{ message: string }, void>({
//       query: () => "protected",
//     }),
//   }),
// });

export const {
  useLoginMutation,
  useFeedsMutation,
  useGetUserProfileMutation,
  useProtectedMutation,
  useGetGroupsMutation,
  useGetGroupFeedsMutation,
  useLoginWithJWTMutation,
  useGetPostCommentMutation,
  usePostLikeMutation,
  useGetNotificationsMutation,
  usePost_feedMutation,
  usePost_commentMutation,
  useUpdate_postMutation,
  useDelete_postMutation,
  useGetGroupMembersMutation,
  useGetChatsMutation,
  useGetGroupMemberDataMutation,
  useSetChatMessageMutation,
  useAddFriendMutation,
  useGetFriendsMutation,
  useGetPeopleMutation,
  useSetFriendMutation,
  useGetPendingFriendsMutation,
  useRemovePendingFriendMutation
} = usersApi;

// export const { usePost_feedMutation } = postApi;
