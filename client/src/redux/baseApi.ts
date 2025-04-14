import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@/config";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${config.serverUrl}`,
  prepareHeaders: (headers) => {
    // const state = getState() as RootState;
    // const accessToken = state?.userReducer?.accessToken;
    // if (accessToken) {
    //   headers.set("Authorization", `${accessToken}`);
    // }
    headers.set("Content-Type", "application/json");
    return headers;
  },
  // paramsSerializer: (params) => new URLSearchParams(params).toString(),
});
