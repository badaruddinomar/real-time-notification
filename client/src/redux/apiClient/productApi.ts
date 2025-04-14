import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseApi";

export const productApi = createApi({
  reducerPath: "productApi", // Unique reducerPath
  baseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ paramsObj }) => {
        return {
          url: `/products`,
          params: paramsObj,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: ({ slug }) => ({
        url: `/products/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
