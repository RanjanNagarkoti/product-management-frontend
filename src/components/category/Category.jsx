import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useMutation } from "react-query";
import client from "../..//network/api.js";
import { FaTrashAlt } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";
import toast from "react-hot-toast";

const Category = ({ category, invalidateCategoryQueries }) => {
  const { token } = useContext(AuthContext);

  const deleteCategory = useMutation(
    (id) =>
      client.delete(`/categories/${id}`, {
        headers: {
          Authorization: token,
        },
      }),
    {
      onSuccess: () => {
        invalidateCategoryQueries();
        toast.success("Category delted successfully!");
      },
    }
  );

  return (
    <tr className="bg-white dark:bg-gray-800">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {category.id}
      </th>
      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
        {category.title}
      </td>
      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
        {category.slug}
      </td>
      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex">
          <button className="text-blue-700 mr-1" title="Edit">
            {" "}
            <LuFileEdit />{" "}
          </button>

          <button
            className="text-red-700 ml-1"
            title="Delete"
            onClick={() => deleteCategory.mutate(category.id)}
          >
            {" "}
            <FaTrashAlt />{" "}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Category;
