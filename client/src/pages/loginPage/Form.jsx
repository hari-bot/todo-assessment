import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const signinSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("E-mail is required"),
  password: yup.string().required("Password is required"),
});

const registerSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("E-mail required"),
  password: yup.string().required("Password required"),
  userName: yup.string().required("Name is required"),
});

const initialValuesSignin = {
  email: "",
  password: "",
};

const initialValuesRegister = {
  email: "",
  password: "",
  userName: "",
};

const Form = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [pageType, setPageType] = useState("signin");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isSignin = pageType === "signin";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    try {
      const credentials = { ...values };
      const registerResponse = await fetch(
        "https://todo-assessment-api.onrender.com/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credentials }),
        }
      );
      const registered = await registerResponse.json();
      onSubmitProps.resetForm();

      if (registered.token) {
        setCookie("userID", registered.userID);
        setCookie("AuthToken", registered.token);
        setCookie("userName", registered.userName);
        navigate("/home");
      } else {
        setError(registered.error || "Registration failed");
      }
    } catch (error) {
      setError(error.message || "Registration failed");
    }
  };

  const signin = async (values, onSubmitProps) => {
    try {
      const signInResponse = await fetch(
        "https://todo-assessment-api.onrender.com/users/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const signedIn = await signInResponse.json();
      onSubmitProps.resetForm();

      if (signedIn.token) {
        setCookie("userID", signedIn.userID);
        setCookie("AuthToken", signedIn.token);
        setCookie("userName", signedIn.userName);
        navigate("/home");
      } else {
        setError(signedIn.error || "Sign in failed");
      }
    } catch (error) {
      setError(error.message || "Sign in failed");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      if (isSignin) await signin(values, onSubmitProps);
      if (isRegister) await register(values, onSubmitProps);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={isSignin ? signinSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            {isSignin ? "Sign In" : "Register"} in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Jhon Wick"
                  value={values.userName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isSignin ? "Sign In" : "Register"}
            </button>
            <p className="text-sm font-light text-gray-500 hover:cursor-pointer">
              {isSignin
                ? "Don't have an account?"
                : "Already have an account? "}{" "}
              <button
                className="font-medium text-primary-600 hover:underline focus:outline-none"
                type="button"
                onClick={() => {
                  setPageType(isSignin ? "register" : "signin");
                  resetForm();
                }}
              >
                {isSignin ? "Register here." : "Sign In here."}
              </button>
            </p>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default Form;
