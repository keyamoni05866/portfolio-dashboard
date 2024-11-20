import { baseApi } from "../../api/baseApi";

const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSkill: builder.mutation({
      query: (body) => ({
        url: "/skills/create-skill",
        method: "POST",
        body,
      }),
      invalidatesTags: ["skills"],
    }),
    getAllSkill: builder.query({
      query: () => ({
        url: "/skills",
        method: "GET",
      }),
      providesTags: ["skills"],
    }),
    updateSkill: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/skills/update-skill/${data._id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["skills"],
    }),
    deleteSkill: builder.mutation({
      query: (id) => {
        return {
          url: `/skills/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["skills"],
    }),
  }),
});

export const {
  useCreateSkillMutation,
  useGetAllSkillQuery,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
} = skillApi;
