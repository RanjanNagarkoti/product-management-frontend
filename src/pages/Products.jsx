import React from "react";
import Sidebar from "../components/Sidebar";
import { FaPlus } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import client from "../network/api.js";
import { useQuery, QueryClient } from "react-query";
import Product from "../components/product/Product.jsx";
import Pagination from "../components/pagination/Pagination.jsx";

const Products = () => {
  const queryClient = new QueryClient();

  const { token } = useContext(AuthContext);

  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleAction, setToggleAction] = useState(false);

  const [page, setPage] = useState(1);

  const {
    isLoading,
    isError,
    error,
    data: products,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: () =>
      client.get(`/products?page=${page}`, {
        headers: {
          Authorization: token,
        },
      }),
    keepPreviousData: true,
  });

  useEffect(() => {
    queryClient.invalidateQueries("products");
  }, [page]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      client.get(`/categories/all`, {
        headers: {
          Authorization: token,
        },
      }),
  });

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
            {/* header */}
            <div className="mx-auto w-full">
              <div className="relativ mb-4 shadow-md bg-gray-800 sm:rounded-lg">
                <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="w-full md:w-1/2">
                    {/* search box */}
                    <form className="flex items-center">
                      <label for="simple-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="simple-search"
                          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Search"
                          required=""
                        />
                      </div>
                    </form>
                  </div>
                  <div className="flex flex-col items-strech justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    {/* Add product buton */}
                    <button
                      type="button"
                      className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                      <FaPlus className="h-3.5 w-3.5 mr-2 -ml-1" />
                      Add product
                    </button>

                    <div className="flex items-center w-full space-x-3 md:w-auto">
                      <div className="relative">
                        <button
                          id="actionsDropdownButton"
                          data-dropdown-toggle="actionsDropdown"
                          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          type="button"
                          onClick={() => setToggleAction(!toggleAction)}
                        >
                          <svg
                            className="-ml-1 mr-1.5 w-5 h-5"
                            fill="currentColor"
                            viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            />
                          </svg>
                          Actions
                        </button>

                        {/* Action drop down li */}
                        <div
                          id="actionsDropdown"
                          className={`z-10 bg-white divide-y divide-gray-100 rounded shadow-xl w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                            toggleAction ? "block absolute mt-2" : "hidden"
                          }`}
                        >
                          <ul
                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="actionsDropdownButton"
                          >
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Price High to Low
                              </a>
                            </li>
                          </ul>
                          <div className="py-1">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Price Low to High
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          id="filterDropdownButton"
                          data-dropdown-toggle="filterDropdown"
                          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          type="button"
                          onClick={() => setToggleFilter(!toggleFilter)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="w-4 h-4 mr-2 text-gray-400"
                            viewbox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          Filter
                          <svg
                            className="-mr-1 ml-1.5 w-5 h-5"
                            fill="currentColor"
                            viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            />
                          </svg>
                        </button>

                        {/* filter drop down list */}
                        <div
                          id="filterDropdown"
                          className={`z-10 w-48 p-3 bg-white rounded-lg shadow-xl dark:bg-gray-700 overflow-scroll ${
                            toggleFilter
                              ? "block absolute mt-2 h-screen"
                              : "hidden"
                          }`}
                        >
                          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                            Category
                          </h6>
                          <ul
                            className="space-y-2 text-sm"
                            aria-labelledby="dropdownDefault"
                          >
                            {categories.data.data.map((category) => (
                              <li className="flex items-center">
                                <input
                                  id="asus"
                                  type="checkbox"
                                  value=""
                                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                  for="asus"
                                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                >
                                  {category.title}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* table */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400 table-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    id{" "}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    quantity
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.data.data.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
              </tbody>
            </table>

            {/* navigation */}
            <Pagination meta={products.data.meta} setPage={setPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
