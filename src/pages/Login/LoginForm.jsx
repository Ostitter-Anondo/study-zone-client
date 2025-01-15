import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PiPasswordBold } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import useAxios from "../../utils/useAxios";
import useMainContext from "../../utils/useMainContext";

const LoginForm = () => {
  const {
    loginMailPass,
    setUserData,
    setBooked,
    toastSuc,
    toastErr,
  } = useMainContext();
  const [showPassword, setShowPassword] = useState(false);

  const axiosHook = useAxios();
  const navigate = useNavigate();

  const loginBehavior = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginMailPass(email, password)
      .then((result) => axiosHook.get(`/user/${result.user.uid}`))
      .then((user) => {
        setUserData(user.data.user);
        setBooked(user.data.booked);
        toastSuc(`User signed in successfully`);
        navigate("/");
      })
      .catch((err) => toastErr(err.message));
  };

  const googleLogin = () => {};

  return (
    <div className="my-12">
      <form
        onSubmit={loginBehavior}
        className="flex flex-col w-11/12 md:9/12 lg:w-7/12 items-center mx-auto gap-6"
      >
        <label className="w-full input input-bordered flex items-center gap-2">
          <HiOutlineMail />
          <input
            type="text"
            className="grow"
            placeholder="Email"
            name="email"
            required
          />
        </label>
        <label className="w-full input input-bordered flex items-center gap-2">
          <PiPasswordBold />
          <input
            type={showPassword ? "text" : "password"}
            className="grow"
            placeholder="Password"
            name="password"
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
            className="btn btn-circle btn-ghost btn-sm"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/login/forgotpass");
          }}
          className="btn btn-link btn-sm text-info min-h-0 h-fit p-0 self-start"
        >
          Forgot My Password
        </button>
        <p className="font-extralight text-sm self-start">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="btn btn-link text-accent btn-sm min-h-0 h-fit p-0"
          >
            Sign up
          </Link>
        </p>
        <button
          className="btn btn-wide btn-lg btn-success btn-outline"
          type="submit"
        >
          Log in
        </button>
      </form>
      <div className="flex items-center text-gray-400 gap-6 w-screen p-12">
        <hr className="flex-grow border-gray-500" />
        <p>or</p>
        <hr className="flex-grow border-gray-500" />
      </div>
      <div className="mx-auto w-fit">
        <button
          onClick={googleLogin}
          className="btn btn-lg btn-outline btn-primary"
        >
          <FaGoogle /> Log in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
