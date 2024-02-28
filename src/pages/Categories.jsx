import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import client from "../network/api.js";
import { useQuery, QueryClient, useMutation } from "react-query";
import Category from "../components/category/Category.jsx";
import Buttons from "../components/pagination/Buttons.jsx";
import { FaPlus } from "react-icons/fa";
import Form from "../components/category/Form.jsx";

const Categories = () => {
  const queryClient = new QueryClient();

  const { token } = useContext(AuthContext);

  const [page, setPage] = useState(1);

  const [toggleAddCategory, setToggleAddCategory] = useState(false);

  const {
    isLoading,
    isError,
    error,
    data: categories,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["categories", page],
    queryFn: () =>
      client.get(`/categories?page=${page}`, {
        headers: {
          Authorization: token,
        },
      }),
    keepPreviousData: true,
  });

  useEffect(() => {
    queryClient.invalidateQueries("categories");
  }, [page]);

  if (isLoading || isFetching) {
    return (
      <>
        <h1 className="font-xl font-medium text-slate-800 text-center mt-5">
          Loading...
        </h1>
      </>
    );
  }

  if (isError || error) {
    return (
      <>
        <h1 className="font-xl font-medium text-slate-800 text-center mt-5">
          Error
        </h1>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="relative overflow-x-auto">
            {/* Table */}

            <div className="w-full  mx-auto mb-4">
              <div className="relative overflow-hidden w-full bg-gray-800 sm:rounded-lg">
                <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                  <div>
                    <h5 className="mr-3 font-semibold text-white">
                      Categories
                    </h5>
                  </div>
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    onClick={() => setToggleAddCategory(!toggleAddCategory)}
                  >
                    <FaPlus className="h-3.5 w-3.5 mr-2 -ml-1" />
                    Add new Category
                  </button>
                </div>
              </div>
            </div>

            {/* new category form */}

            {toggleAddCategory && (
              <Form setToggleAddCategory={setToggleAddCategory} />
            )}

            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400 table-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    id{" "}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Slug
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.data.data.map((category) => (
                  <Category category={category} key={category.id} />
                ))}
              </tbody>
            </table>

            {/* pagination */}
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {`${categories.data.meta.from}-${categories.data.meta.to}`}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {`${categories.data.meta.total}`}
                </span>
              </span>
              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                {categories.data.meta.links.map((link) => (
                  <Buttons link={link} key={link.label} setPage={setPage} />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
