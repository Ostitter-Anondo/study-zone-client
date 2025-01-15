import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { RiImageCircleAiLine } from "react-icons/ri";
import {
  PiChalkboardTeacherFill,
  PiPasswordBold,
  PiStudentFill,
} from "react-icons/pi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useMainContext from "../../utils/useMainContext";
import useAxios from "../../utils/useAxios";

const Signup = () => {
  const { signupMailPass, toastErr, toastSuc } = useMainContext();

  const [showPassword, setShowPassword] = useState(false);

  const axiosHook = useAxios();

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const navigate = useNavigate();

  const signupBehavior = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const role = "admin";
    if (!emailRegex.test(email)) {
      toastErr("bad email");
      return;
    }
    if (!passwordRegex.test(password)) {
      toastErr(
        `password must be >= 6 characters long, have an uppercase, a lowercase and a special character`
      );
      return;
    }

    signupMailPass(email, password)
      .then((result) => {
        const uid = result.user.uid;
        axiosHook
          .post("/newuser", { uid, email, name, photo, role })
          .then((res) => {
            res.data.acknowledged
              ? toastSuc(`registration successful`)
              : toastErr(`registration unsuccessful`);
            navigate("/login");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => toastErr(err.message));
  };

  return (
    <>
      <form
        onSubmit={signupBehavior}
        className="flex flex-col w-7/12 items-center mx-auto gap-6 my-12"
      >
        <div className="flex justify-around w-full">
          <div className="form-control">
            <label className="label cursor-pointer gap-3">
              <span className="font-semibold text-xl flex gap-1 items-center">
                <PiStudentFill /> Student
              </span>
              <input
                type="radio"
                name="role"
                value="student"
                className="radio checked:bg-red-500"
                defaultChecked
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer gap-3">
              <span className="font-semibold text-xl flex gap-1 items-center">
                <PiChalkboardTeacherFill /> Instructor
              </span>
              <input
                type="radio"
                name="role"
                value="instructor"
                className="radio checked:bg-blue-500"
              />
            </label>
          </div>
        </div>
        <label className="w-full input input-bordered flex items-center gap-2">
          <BiUserCircle />
          <input
            type="text"
            className="grow"
            placeholder="Name"
            name="name"
            required
          />
        </label>
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
          <RiImageCircleAiLine />
          <input
            type="text"
            className="grow"
            placeholder="Photo URL"
            name="photo"
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
        <p className="font-extralight text-sm self-start">
          Already have an account?{" "}
          <Link
            to="/login"
            className="btn btn-link text-accent btn-sm min-h-0 h-fit p-0"
          >
            Log in
          </Link>
        </p>
        <button
          className="btn btn-wide btn-lg btn-info btn-outline"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </>
  );
};

export default Signup;
