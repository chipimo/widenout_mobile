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

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserTokenRequest {
  refreshtoken: string;
}

export interface getFeedsRequest {
  uid: string;
}

export const usersApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.134/api/endpoints",
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
    feeds: builder.mutation<UserResponse, getFeedsRequest>({
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
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const {
  useLoginMutation,
  useFeedsMutation,
  useProtectedMutation,
  useLoginWithJWTMutation,
} = usersApi;
