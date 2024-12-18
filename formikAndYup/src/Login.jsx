import React from "react";
import TextFieldComponent from "./components/TextFieldComponent";
import ButtonComponent from "./components/ButtonComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import findUserForlogin from "../database/loginLogic";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateId, updateName, updateLoggedStatus } from "./features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedStatus = useSelector((state) => state.user.data);
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await findUserForlogin(values.email, values.password);
      const successval = response.success;
      if (successval === false) {
        toast.error(response.message);
      } else {
        const id = response.id;
        const name = response.name;
        // dispatch use garera we can access the reducers
        dispatch(updateId(id));
        dispatch(updateName(name));
        console.log(loggedStatus,"before update")

        dispatch(updateLoggedStatus(true));
        // after login wla part ta run vairako chaina
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: id,
            name: name,
            loggedStatus: true,
          })
        );
        toast.success(response.message);
        navigate("/login/home");
      }
    },
  });
  return (
    <>
      <div className="flex justify-center  h-[93.5vh] bg-gray-100">
        <div className="flex rounded-2xl h-[85vh]  gap-[90px] justify-center items-center pt-[80px] pl-[100px] pb-[80px] shadow-2xl  bg-white border border-gray-200 w-[85vw] mt-6">
          <div className="flex items-center justify-center ">
            <div>
              <p className="text-3xl font-bold mb-8 text-center">Welcome</p>
              <form
                className="flex flex-col gap-4 w-[21vw] justify-center "
                onSubmit={formik.handleSubmit}
              >
                {/* email */}
                <TextFieldComponent
                  name="email"
                  placeholder="Enter your email"
                  iconName="mail"
                  value={formik.values.email}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  type="text"
                  error={formik.touched.email && formik.errors.email}
                />

                {/* password */}
                <TextFieldComponent
                  name="password"
                  placeholder="Enter your password"
                  iconName="lock"
                  type="password"
                  value={formik.values.password}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  error={formik.touched.password && formik.errors.password}
                />

                <ButtonComponent name="Log In" type="submit" />
                <p className="text-center">
                 Don't have an account?
                  <Link
                    className="font-bold"
                    to={"/"}
                  >
                    {" "}
                    SignUp!
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <img
            src="https://cdn.dribbble.com/userupload/16834943/file/original-f5c8959760f5125529fdc38731ff9a17.jpg?resize=1200x900&vertical=center"
            className="h-[85vh] w-[52vw] object-cover rounded-r-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
