import { GoalModel } from "./../../models/GoalModel.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goalsApi = createApi({
  reducerPath: "goalsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_GOALS_DOMAIN}/goals-manager`,
  }),
  tagTypes: ["Goals"],
  endpoints: (builder) => ({
    getGoals: builder.query<GoalModel[], void>({
      query: () => "goals",
      providesTags: ["Goals"],
    }),
    updateGoal: builder.mutation<GoalModel, GoalModel | undefined>({
      query: (goal) => ({
        url: `goals/${goal?.id}`,
        method: "PUT",
        body: goal,
      }),
      invalidatesTags: ["Goals"],
    }),
    createGoal: builder.mutation<GoalModel, GoalModel | undefined>({
      query: (goal) => ({
        url: "goals",
        method: "POST",
        body: goal,
      }),
      invalidatesTags: ["Goals"],
    }),
    deleteGoal: builder.mutation<GoalModel, string | undefined>({
      query: (id) => ({
        url: `goals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Goals"],
    }),
    addImageData: builder.mutation<GoalModel, any | undefined>({
      query: (goal) => ({
        url: `goals/images/${goal.id}`,
        method: "POST",
        body: goal.imageData,
      }),
      invalidatesTags: ["Goals"],
    }),
    deleteImage: builder.mutation<GoalModel, any | undefined>({
      query: (goal) => ({
        url: `goals/images/${goal.id}?publicId=${goal.publicId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Goals"],
    }),
  }),
});

export const {
  useGetGoalsQuery,
  useUpdateGoalMutation,
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useAddImageDataMutation,
  useDeleteImageMutation,
} = goalsApi;
