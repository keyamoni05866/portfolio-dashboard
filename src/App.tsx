import { Link } from "react-router-dom";
import { currentUser } from "./Redux/features/auth/authSlice";
import { useAppSelector } from "./Redux/hook";

function App() {
  const user = useAppSelector(currentUser);
  return (
    <div className="  min-h-screen flex items-center justify-center  bg-gray-100  lg:px-0 ">
      <div className="block">
        <h4 className=" text-xl lg:text-4xl font-semibold text-center uppercase">
          Welcome to your portfolio
        </h4>
        <div className="flex justify-center mt-4">
          {user ? (
            <Link
              to="/admin/dashboard"
              className="px-5      py-2   rounded-3xl font-medium text-sm uppercase text-white bg-[#051c34] hover:bg-[#050c14]"
            >
              Got to your Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-5      py-2   rounded-3xl font-medium text-sm uppercase text-white bg-[#051c34] hover:bg-[#050c14]"
            >
              Please Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
