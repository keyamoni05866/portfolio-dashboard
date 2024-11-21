import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginUserMutation } from "../../Redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { signUser } from "../../Redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const [login] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (data: LoginFormData) => {
    console.log(data);
    const toastId = toast.loading("Sign In", { duration: 1000 });
    try {
      const res = await login(data).unwrap();
      console.log(res);
      toast.success("logged In", { id: toastId, duration: 2000 });
      const userInfo = res?.data?.user;
      const token = res?.data?.token;
      dispatch(signUser({ userInfo, token }));

      if (userInfo.role === "admin") {
        navigate(`/${userInfo.role}/dashboard`);
      }
    } catch (err) {
      toast.error(
        "Something Went Wrong!! Please use valid email or provide correct password",
        { id: toastId, duration: 3000 }
      );
    }
  };
  return (
    <div className="  min-h-screen flex items-center justify-center  bg-gray-100 px-4 lg:px-0 ">
      <div className="bg-gray-200 rounded-xl w-full p-5  lg:w-[600px] lg:p-10">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="grid grid-cols-1  gap-2   mb-2 ">
            <h4 className=" text-4xl font-semibold text-center uppercase">
              Login !!!
            </h4>

            <div>
              <label className="block text-lg font-medium leading-6 ">
                Email :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium leading-6 ">
                Password :
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter Your Password"
                  className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className=" flex">
            <button
              type="submit"
              className="w-full    mt-5    py-2   rounded-3xl font-medium text-lg uppercase text-white bg-[#051c34] hover:bg-[#050c14]"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      {/* */}
    </div>
  );
};

export default Login;
