import { baseQuery } from "./baseQuery.service";
import { createApi } from "@reduxjs/toolkit/query/react";

export const auditService = createApi({
  reducerPath: "auditService",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAudits: builder.query<
      any,
      { offset: number; limit: number; query: string; from?: string; to?: string }
    >({
      query: (params) => ({
        url: `/audits`,
        params: params,
        method: "GET",
      }),
      transformResponse: (rawData: any) => {
        if (rawData.success === true) {
          const data = rawData?.data?.messages?.map((item: any) => item.message);
          return { data, total: rawData?.data?.total_results };
        }
      },
    }),
    createAudit: builder.mutation<
      any,
      { page_name: string; old_value: string; new_value: string; type: string }
    >({
      query: (body: any) => ({
        url: "/audits",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetAuditsQuery, useCreateAuditMutation } = auditService;
