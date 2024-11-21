import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Divider,
  Modal,
  Popconfirm,
  Table,
  TableColumnsType,
} from "antd";
import {
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useGetAllSkillQuery,
  useUpdateSkillMutation,
} from "../../../Redux/api/SkillApi/skillApi";
import { ImageUploadFunc } from "../../../utils";
import { toast } from "sonner";
import { TProjects, TSkill } from "../../../types";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectQuery,
} from "../../../Redux/api/ProjectApi/ProjectApi";

export type TTableData = Pick<TProjects, "title" | "image" | "description">;

const ProjectManagement = () => {
  const { register, handleSubmit, reset } = useForm<FieldValues>();
  const [modalOpen, setModalOpen] = useState(false);

  const [createProject] = useCreateProjectMutation();
  const { data: projectData, isFetching } = useGetAllProjectQuery({});
  const [deleteProject] = useDeleteProjectMutation();

  //   console.log(skillData?.data);
  const handleCreateProject: SubmitHandler<FieldValues> = async (data) => {
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
      data.image = null;
    }

    const skillData = {
      name: data.name,
      image: data.image || null,
    };

    try {
      const res = await createProject(skillData).unwrap();
      toast.success(res.message, { duration: 3000 });
      reset();
      setModalOpen(false);
    } catch (err: any) {}
  };

  //   handle delete
  const handleDelete = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteProject(id).unwrap();
      toast.success(res.message, { duration: 3000 });
    } catch (err: any) {
      toast.error(err);
    }
  };

  //   All data Table
  const tableData = projectData?.data?.map(
    ({ _id, title, image, description }: TProjects) => ({
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
      render: (projectImg: string) => (
        <img
          src={projectImg}
          alt="Project Image"
          className="rounded-full size-10"
        />
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
    },

    {
      title: "Action",
      key: "x",
      render: (actionData) => {
        // console.log(actionData);
        return (
          <div>
            <button
              //   onClick={() => {
              //     setSelectedSkill({ _id: actionData.key, ...actionData });
              //     setEditMode(true);
              //     setModalOpen(true);
              //     setValue("name", actionData.name);
              //     setValue("image", actionData.image);
              //   }}
              className="bg-blue-600 py-1 px-3 text-sm text-white rounded-xl me-3 "
            >
              Edit
            </button>

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
          Add Project
        </button>
      </div>
      <Modal
        title="Add Your Project Information"
        style={{ top: 20 }}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleCreateProject)}>
          <div className="grid grid-cols-1 gap-2 mb-2">
            <div>
              <label className="block text-sm font-medium leading-6 ">
                Project Title :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  {...register("title", { required: "Title is Required" })}
                  type="text"
                  placeholder="Enter Your Project Title"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Project Image:
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="file"
                  {...register("image", { required: "Image is Required" })}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 "
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium leading-6 ">
                Project Technologies :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  {...register("technologies", {
                    required: "Technologies is Required",
                  })}
                  type="text"
                  placeholder="Enter Your Project Technologies using comma"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 ">
                Project Features :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  {...register("features", { required: "Feature is Required" })}
                  type="text"
                  placeholder="Enter Your Project Features using comma"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 ">
                Github Client Link :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  {...register("clientRepo", {
                    required: "Client Link is Required",
                  })}
                  type="text"
                  placeholder="Enter Your Project Title"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 ">
                Github Server Link :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  {...register("serverRepo", {
                    required: "Server Link is Required",
                  })}
                  type="text"
                  placeholder="Enter Your Project Title"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-2   mb-2 mt-2 ">
            <div>
              <label className="block text-sm font-medium leading-6 ">
                Project Live Link :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  {...register("liveLink", { required: "Feature is Required" })}
                  type="text"
                  placeholder="Enter Your Project Live Link"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 ">
                Project Credentials (optional) :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  {...register("credentials", {
                    required: "credentials is Required",
                  })}
                  type="text"
                  placeholder="Enter Your Project credentials using comma"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 mb-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                Project Description :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Describe Your Car"
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
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
      <Divider style={{ borderColor: "#050c14" }}>Your Added Projects</Divider>

      <Table
        className="max-w-[700px] mx-auto my-10"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default ProjectManagement;
