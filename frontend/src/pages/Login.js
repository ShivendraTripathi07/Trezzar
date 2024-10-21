import React, { useContext, useState } from "react";
import loginIcons from "./../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResonse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResonse.json();
    console.log(dataApi);
    if (dataApi.success) {
      toast.success(dataApi.message);

      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    } else {
      toast.error(dataApi.error);
    }
  };
  // console.log("data login", data);
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icon" />
          </div>
          <form className="pt-6 flex flex-col gap-2">
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2 ">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password ?
              </Link>
            </div>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto  block mt-6 "
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have an account?{" "}
            <Link
              to={"/sign-up"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
