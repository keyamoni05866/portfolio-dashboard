import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (body) => ({
        url: "/blogs/create-blog",
        method: "POST",
        body,
      }),
      invalidatesTags: ["blogs"],
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
    updateBlog: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/blogs/update-blog/${data._id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
