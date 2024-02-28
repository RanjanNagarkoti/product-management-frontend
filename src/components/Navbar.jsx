import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

const Navbar = () => {
  const { token, setToken, user, setUser } = useContext(AuthContext);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="product.svg" className="h-8" alt="Product Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Product MS
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user.name && <p className="text-lg">Welcome {user.name} !</p>}
          {!user.name && (
            <Link
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              to="/signin"
            >
              Login <FiLogOut className="mr-2" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
