import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import client from "../network/api.js";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [errorUI, setErrorUI] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const register = async () => {
    try {
      const response = await client.post("/register", formData);

      navigate("/signin");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data;
        setErrorUI(errors);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    await register();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  required=""
                  value={formData.name}
                  onChange={handleChange}
                />
                <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errorUI.errors && errorUI.errors.name && (
                    <ul>
                      {errorUI.errors.name.map((ele, index) => (
                        <li key={index}>*{ele}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errorUI.errors && errorUI.errors.email && (
                    <ul>
                      {errorUI.errors.email.map((ele, index) => (
                        <li key={index}>*{ele}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errorUI.errors && errorUI.errors.password && (
                    <ul>
                      {errorUI.errors.password.map((ele, index) => (
                        <li key={index}>*{ele}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* confirm password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  onKeyUp={(e) =>
                    e.target.value != formData.password
                      ? setPasswordConfirmError(true)
                      : setPasswordConfirmError(false)
                  }
                />
                <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {passwordConfirmError &&
                    "Confirmation password doesnot matches!"}
                </div>
              </div>

              {/* submit button */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
