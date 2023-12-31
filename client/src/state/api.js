import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_ULR }),
  reducerPath: "main",
  tagTypes: [],
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    postSignup: build.mutation({
      query: (payload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    encryptFile: build.mutation({
      query: (payload) => ({
        url: "upload/encrypt",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  usePostLoginMutation,
  usePostSignupMutation,
  useEncryptFileMutation,
} = api;
