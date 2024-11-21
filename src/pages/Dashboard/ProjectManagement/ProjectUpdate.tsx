import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllProjectQuery,
  useUpdateProjectsMutation,
} from "../../../Redux/api/ProjectApi/ProjectApi";
import { TProjects, TUpdateProject } from "../../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImageUploadFunc } from "../../../utils";
import { toast } from "sonner";

const ProjectUpdate = () => {
  const { id } = useParams();
  const { data: projects, isLoading } = useGetAllProjectQuery({});
  const project: TProjects = projects?.data?.find(
    (item: TProjects) => item._id === id
  );

  const { register, handleSubmit } = useForm<TUpdateProject>();

  const [updateProject] = useUpdateProjectsMutation();
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="size-10 border-4 border-t-blue-500 border-blue-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleUpdate: SubmitHandler<TUpdateProject> = async (data) => {
    if (data.image && data.image.length > 0) {
      try {
        const file = data.image[0] as any;
        const imageUrl = await ImageUploadFunc(file);

        data.image = imageUrl;
      } catch (error: any) {
        toast.error(error.data.message, { duration: 1000 });
      }
    } else {
      data.image = project?.image;
    }
    if (data.features && typeof data.features === "string") {
      data.features = (data.features as string)
        ?.split(",")
        .map((feature: string) => feature.trim());
    }
    if (data.technologies && typeof data.technologies === "string") {
      data.technologies = (data.technologies as string)
        ?.split(",")
        .map((technology: string) => technology.trim());
    }
    if (data.credentials && typeof data.credentials === "string") {
      data.credentials = (data.credentials as string)
        ?.split(",")
        .map((credential: string) => credential.trim());
    }
    const projectUpdateData = {
      _id: project?._id,
      ...data,
    };
    try {
      const res = await updateProject(projectUpdateData).unwrap();
      toast.success(res.message, { duration: 3000 });
      navigate("/admin/project-management");
    } catch (err: any) {}
  };
  return (
    <div className="lg:max-w-3xl mx-auto ">
      <h4 className="text-2xl font-semibold  text-center">
        Update Your Project
      </h4>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="shadow-md p-10 rounded-lg"
      >
        <div className="grid grid-cols-1 gap-2 mb-2">
          <div>
            <label className="block text-sm font-medium leading-6 ">
              Project Title :
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                {...register("title")}
                type="text"
                defaultValue={project?.title}
                className="block w-full rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
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
                {...register("image")}
                className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 "
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
                {...register("technologies")}
                type="text"
                defaultValue={project?.technologies}
                className="block w-full rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 ">
              Project Features :
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                {...register("features")}
                type="text"
                defaultValue={project?.features}
                className="block w-full rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 ">
              Github Client Link :
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                {...register("clientRepo")}
                type="text"
                defaultValue={project?.clientRepo}
                className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 ">
              Github Server Link :
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                {...register("serverRepo")}
                type="text"
                defaultValue={project?.serverRepo}
                className="block w-full rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
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
                {...register("liveLink")}
                type="text"
                defaultValue={project?.liveLink}
                className="block w-full rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 ">
              Project Credentials (optional) :
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                {...register("credentials")}
                type="text"
                defaultValue={project?.credentials}
                className="block w-full rounded-md border-0 py-1.5 pl-7  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
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
                {...register("description")}
                defaultValue={project?.description}
              ></textarea>
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

export default ProjectUpdate;
