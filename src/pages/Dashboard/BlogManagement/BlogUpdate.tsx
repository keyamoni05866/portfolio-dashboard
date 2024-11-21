import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
} from "../../../Redux/api/BlogApi/BlogApi";
import { TBlogs, TUpdateBlogs } from "../../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useState } from "react";
import { ImageUploadFunc } from "../../../utils";
import { toast } from "sonner";

const BlogUpdate = () => {
  const { id } = useParams();
  const { data: blogs, isLoading } = useGetAllBlogsQuery({});
  const blog: TBlogs = blogs?.data?.find((item: TBlogs) => item._id === id);

  const { register, handleSubmit } = useForm<TUpdateBlogs>();
  const [value, setValue] = useState(blog?.description);
  const [updateBlog] = useUpdateBlogMutation();
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="size-10 border-4 border-t-blue-500 border-blue-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleUpdate: SubmitHandler<TUpdateBlogs> = async (data) => {
    if (data.image && data.image.length > 0) {
      try {
        const file = data.image[0] as any;
        const imageUrl = await ImageUploadFunc(file);

        data.image = imageUrl;
      } catch (error: any) {
        toast.error(error.data.message, { duration: 1000 });
        return;
      }
    } else {
      data.image = blog?.image;
    }

    const blogUpdateData = {
      _id: blog?._id,
      description: value || blog?.description,
      ...data,
    };
    // console.log("blog data=>", blogData);

    try {
      const res = await updateBlog(blogUpdateData).unwrap();

      toast.success(res.message, { duration: 3000 });
      navigate("/admin/blog-management");
    } catch (err: any) {}
  };
  return (
    <div className="lg:max-w-3xl mx-auto ">
      <h4 className="text-2xl font-semibold my-10 text-center">
        Update Your Blog
      </h4>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="shadow-md p-10 rounded-lg"
      >
        <div className="grid grid-cols-1  gap-2   mb-2 ">
          <div>
            <label className="block text-sm font-medium leading-6 ">
              Blog Title :
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                {...register("title")}
                type="text"
                defaultValue={blog?.title}
                placeholder="Enter Your Blog Title"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Blog Image:
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="file"
                {...register("image")}
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 "
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium leading-6 "
              htmlFor="description"
            >
              Blog Description :
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
          </div>
        </div>

        <div className=" flex">
          <button
            type="submit"
            className="w-full    mt-5    py-2   rounded-3xl font-medium text-lg uppercase text-white bg-[#051c34] hover:bg-[#050c14]"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogUpdate;
