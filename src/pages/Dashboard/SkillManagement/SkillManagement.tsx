import { useState } from "react";
import { useForm } from "react-hook-form";
import { Divider, Modal, Table, TableColumnsType } from "antd";
import {
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useGetAllSkillQuery,
} from "../../../Redux/api/SkillApi/skillApi";
import { ImageUploadFunc } from "../../../utils";
import { toast } from "sonner";
import { TSkill } from "../../../types";
import { Link } from "react-router-dom";

type SkillFormData = {
  name: string;
  image: string | null;
};

export type TTableData = Pick<TSkill, "name" | "image">;

const SkillManagement = () => {
  const { register, handleSubmit, reset } = useForm<SkillFormData>();
  const [modalOpen, setModalOpen] = useState(false);

  const [createSkill] = useCreateSkillMutation();
  const { data: skillData, isFetching } = useGetAllSkillQuery({});
  const [deleteSkill] = useDeleteSkillMutation();

  //   console.log(skillData?.data);
  const handleCreateSkill = async (data: SkillFormData) => {
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
      const res = await createSkill(skillData).unwrap();
      toast.success(res.message, { duration: 3000 });
      reset();
      setModalOpen(false);
    } catch (err: any) {}
  };

  //   handle delete
  const handleDelete = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteSkill(id).unwrap();
      toast.success(res.message, { duration: 3000 });
    } catch (err: any) {
      toast.error(err);
    }
  };

  //   All data Table
  const tableData = skillData?.data?.map(({ _id, name, image }: TSkill) => ({
    key: _id,
    name,
    image,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (skillImg: string) => (
        <img
          src={skillImg}
          alt="skill Image"
          className="rounded-full size-10"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Action",
      key: "x",
      render: (actionData) => {
        // console.log(actionData);
        return (
          <div>
            <Link
              to={`/admin/skillUpdate/${actionData.key}`}
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
          Add Skill
        </button>
      </div>
      <Modal
        title="Add Your Skill"
        style={{ top: 20 }}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleCreateSkill)}>
          <div className="grid grid-cols-1  gap-2   mb-2 ">
            <div>
              <label className="block text-sm font-medium leading-6 ">
                Skill Name :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  {...register("name", { required: "Name is Required" })}
                  type="text"
                  placeholder="Enter Your Skill Name"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Skill Image:
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
      <Divider style={{ borderColor: "#050c14" }}>Your Added Skills</Divider>

      <Table
        className="max-w-[700px] mx-auto my-10"
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default SkillManagement;
