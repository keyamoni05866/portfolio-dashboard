import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Divider, Modal, Table, TableColumnsType } from "antd";

import { ImageUploadFunc } from "../../../utils";
import { toast } from "sonner";
import { TBlogs } from "../../../types";
import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "../../../Redux/api/BlogApi/BlogApi";
import ReactQuill from "react-quill";
import QuilToNormalHTML from "../QuilToNormalHTML/QuilToNormalHTML";
import { Link } from "react-router-dom";
type TBlogFormValue = {
  title: string;
  image: string;
  description: string;
};

export type TTableData = Pick<TBlogs, "title" | "image" | "description">;

const BlogManagement = () => {
  const { register, handleSubmit, reset } = useForm<TBlogFormValue>();
  const [modalOpen, setModalOpen] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");

  const [createBlog] = useCreateBlogMutation();
  const { data: blogData, isFetching } = useGetAllBlogsQuery({});
  const [deleteBlog] = useDeleteBlogMutation();

  //   console.log(skillData?.data);
  const handleCreateBlog: SubmitHandler<TBlogFormValue> = async (data) => {
    // console.log(data, "value", value);

    if (descriptionValue === "") {
      toast.error("please write something in description", { duration: 3000 });
    }
    if (data.image && data.image.length > 0) {
      try {
        const file = data.image[0] as any;
        const imageUrl = await ImageUploadFunc(file);

        data.image = imageUrl;
      } catch (error: any) {
        toast.error(error.data.message, { duration: 1000 });
        return;
      }
    }

    const blogData = {
      title: data.title,
      description: descriptionValue,
      image: data.image || null,
    };
    // console.log("blog data=>", blogData);

    try {
      const res = await createBlog(blogData).unwrap();

      toast.success(res.message, { duration: 3000 });
      reset();
      setModalOpen(false);
    } catch (err: any) {}
  };

  //   handle delete
  const handleDelete = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteBlog(id).unwrap();
      toast.success(res.message, { duration: 3000 });
    } catch (err: any) {
      toast.error(err);
    }
  };

  //   All data Table
  const tableData = blogData?.data?.map(
    ({ _id, title, image, description }: TBlogs) => ({
      key: _id,
      title,
      image,
      description,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (blogImg: string) => (
        <img src={blogImg} alt="Blog Image" className="rounded-full size-10" />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (blogDescription: string) => (
        <QuilToNormalHTML description={blogDescription} />
      ),
    },

    {
      title: "Action",
      key: "x",
      render: (actionData) => {
        // console.log(actionData);
        return (
          <div>
            <Link
              to={`/admin/blogUpdate/${actionData.key}`}
              className="bg-blue-600 py-1 px-3 text-sm text-white rounded-xl me-3 "
            >
              Update
            </Link>

            <button
              onClick={() => handleDelete(actionData.key)}
              className="bg-red-600 py-1 px-3 text-sm text-white rounded-xl"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="lg:flex lg:justify-end me-10">
        <button
          className=" w-[40%] lg:w-[10%]  mt-5 py-3   rounded-3xl font-medium text-md  text-white bg-[#051c34] hover:bg-[#050c14]"
          onClick={() => setModalOpen(true)}
        >
          Add Blog
        </button>
      </div>
      <Modal
        title="Describe Your Thought"
        style={{ top: 20 }}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleCreateBlog)}>
          <div className="grid grid-cols-1  gap-2   mb-2 ">
            <div>
              <label className="block text-sm font-medium leading-6 ">
                Blog Title :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  {...register("title", { required: "Title is Required" })}
                  type="text"
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
                  {...register("image", { required: "Image is Required" })}
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
                <ReactQuill
                  theme="snow"
                  value={descriptionValue}
                  onChange={setDescriptionValue}
                />
              </div>
            </div>
          </div>

          <div className=" flex">
            <button
              type="submit"
              className="w-full    mt-5    py-2   rounded-3xl font-medium text-lg uppercase text-white bg-[#051c34] hover:bg-[#050c14]"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
      <Divider style={{ borderColor: "#050c14" }}>Your Added Blogs</Divider>

      <Table
        className="lg:max-w-[800px] w-full lg:mx-auto my-10"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        size="small"
      />
    </div>
  );
};

export default BlogManagement;
