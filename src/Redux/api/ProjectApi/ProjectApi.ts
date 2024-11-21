import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (body) => ({
        url: "/projects/create-project",
        method: "POST",
        body,
      }),
      invalidatesTags: ["projects"],
    }),
    getAllProject: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    updateProjects: builder.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: `/projects/update-project/${data._id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["projects"],
    }),
    deleteProject: builder.mutation({
      query: (id) => {
        return {
          url: `/projects/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectQuery,
  useUpdateProjectsMutation,
  useDeleteProjectMutation,
} = projectApi;
