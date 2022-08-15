import { GoalModel } from "./../../models/GoalModel.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { triggerToast } from "../toasts.slice";

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
      async onQueryStarted(goal, { dispatch, queryFulfilled }) {
        try {
          const { data: addedGoal } = await queryFulfilled;
          const patchResult = dispatch(
            goalsApi.util.updateQueryData(
              "getGoals",
              undefined,
              (draft: GoalModel[]) => {
                return [...draft, addedGoal];
              }
            )
          );
          dispatch(
            triggerToast({
              header: "Success",
              bodyText: "Goal Added successfully.",
              backgroundColor: "success",
              delay: 3000,
            })
          );
        } catch {
          dispatch(
            triggerToast({
              header: "Error",
              bodyText:
                "There was an error creating the goal. Please try again.",
              backgroundColor: "danger",
              delay: 3000,
            })
          );
        }
      },
    }),
    deleteGoal: builder.mutation<{ id: string }, string | undefined>({
      query: (id) => ({
        url: `goals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Goals"],
      onQueryStarted: async (goal, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            triggerToast({
              header: "Success",
              bodyText: "Goal Deleted successfully.",
              backgroundColor: "success",
              delay: 3000,
            })
          );
        } catch (error) {
          dispatch(
            triggerToast({
              header: "Error",
              bodyText:
                "There was an error Deleting the goal. Please try again.",
              backgroundColor: "danger",
              delay: 3000,
            })
          );
        }
      },
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
