import { useNavigate, useParams } from "react-router-dom";
import { TSkill, TUpdateSkills } from "../../../types";
import {
  useGetAllSkillQuery,
  useUpdateSkillMutation,
} from "../../../Redux/api/SkillApi/skillApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ImageUploadFunc } from "../../../utils";

const SkillUpdate = () => {
  const { id } = useParams();
  const { data: skills, isLoading } = useGetAllSkillQuery({});
  const skill: TSkill = skills?.data?.find((item: TSkill) => item._id === id);

  const { register, handleSubmit } = useForm<TUpdateSkills>();

  const [updateSkill] = useUpdateSkillMutation();
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="size-10 border-4 border-t-blue-500 border-blue-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleUpdateSkill: SubmitHandler<TUpdateSkills> = async (data) => {
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
      data.image = skill?.image;
    }

    const blogUpdateData = {
      _id: skill?._id,
      ...data,
    };

    try {
      const res = await updateSkill(blogUpdateData).unwrap();

      toast.success(res.message, { duration: 3000 });
      navigate("/admin/skill-management");
    } catch (err: any) {}
  };
  return (
    <div className="lg:max-w-xl mx-auto ">
      <h4 className="text-2xl font-semibold my-10 text-center">
        Update Your Skill
      </h4>
      <form
        onSubmit={handleSubmit(handleUpdateSkill)}
        className="shadow-md p-10 rounded-lg"
      >
        <div className="grid grid-cols-1  gap-2   mb-2 ">
          <div>
            <label className="block text-sm font-medium leading-6 ">
              Skill Name :
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                {...register("name")}
                type="text"
                defaultValue={skill?.name}
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
                {...register("image")}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillUpdate;
