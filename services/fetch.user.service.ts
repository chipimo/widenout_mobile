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
    baseUrl: "http://192.168.1.134/api/endpoints/",
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
    getNotifications: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "getAllNotifications.php",
        method: "POST",
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.134/api/endpoints/",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "multipart/form-data");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    post_feed: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "postFeeds.php",
        method: "POST",
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const {
  useLoginMutation,
  useFeedsMutation,
  useProtectedMutation,
  useGetGroupsMutation,
  useGetGroupFeedsMutation,
  useLoginWithJWTMutation,
  useGetNotificationsMutation,
} = usersApi;

export const { usePost_feedMutation } = postApi;
